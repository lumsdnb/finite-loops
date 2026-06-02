import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";

@customElement("sample-waveform")
export class SampleWaveform extends LitElement {
  @property({ type: String }) sampleUrl = "";
  @property({ type: String }) waveColor = "#4d98b3ff";
  @property({ type: Number }) height = 100;
  @property({ type: Number }) playheadPosition = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: transparent;
    }
    canvas {
      width: 100%;
      display: block;
    }
    .message {
      text-align: center;
      color: #9ca3af;
      padding: 1.5rem;
    }
  `;

  private canvasRef: Ref<HTMLCanvasElement> = createRef();
  private static audioContext = new AudioContext();

  peaks: number[] = [];
  resizeObserver: ResizeObserver | null = null;
  isLoading = false;

  // prevent race conditions when switching samples quickly
  private loadId = 0;

  render() {
    return html`
      <canvas height="${this.height}" ${ref(this.canvasRef)}></canvas>
      ${this.isLoading ? html`<div class="message">Loading audio...</div>` : ""}
    `;
  }

  firstUpdated() {
    this._fetchAudio();
    this.resizeObserver = new ResizeObserver(() => this._drawWaveform());
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  updated(changed: Map<string | number | symbol, unknown>) {
    if (changed.has("sampleUrl") && this.sampleUrl) {
      this._fetchAudio();
    }
    if (changed.has("playheadPosition")) {
      this._drawWaveform();
    }
  }

  async _fetchAudio() {
    if (!this.sampleUrl) return;

    const currentLoad = ++this.loadId;
    this.isLoading = true;
    this.requestUpdate();

    try {
      const response = await fetch(this.sampleUrl);

      if (!response.ok) {
        throw new Error(
          `Fetch failed: ${response.status} ${response.statusText}`,
        );
      }

      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("audio")) {
        console.warn(
          "Unexpected content-type:",
          contentType,
          "for",
          this.sampleUrl,
        );
      }

      const arrayBuffer = await response.arrayBuffer();

      if (!arrayBuffer || arrayBuffer.byteLength === 0) {
        throw new Error("Empty audio file");
      }

      // Safari compatibility (promise wrapper)
      const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
        SampleWaveform.audioContext.decodeAudioData(
          arrayBuffer.slice(0),
          resolve,
          reject,
        );
      });

      // ignore outdated loads
      if (currentLoad !== this.loadId) return;

      this.peaks = this._getPeaks(buffer.getChannelData(0), 1000);
    } catch (err) {
      console.error("Error loading audio:", this.sampleUrl, err);
      this.peaks = [];
    } finally {
      if (currentLoad === this.loadId) {
        this.isLoading = false;
        this.requestUpdate();
        requestAnimationFrame(() => this._drawWaveform());
      }
    }
  }

  _getPeaks(data: Float32Array, samples: number): number[] {
    const step = Math.max(1, Math.floor(data.length / samples));
    const peaks = new Array<number>(samples);

    for (let i = 0; i < samples; i++) {
      let max = 0;
      const start = i * step;
      const end = Math.min(start + step, data.length);

      for (let j = start; j < end; j++) {
        const val = Math.abs(data[j]);
        if (val > max) max = val;
      }

      peaks[i] = max;
    }

    return peaks;
  }

  _drawWaveform() {
    const canvas = this.canvasRef.value;
    if (!canvas || this.peaks.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = this.offsetWidth || canvas.clientWidth;
    const height = this.height;

    if (width === 0 || height === 0) return;

    canvas.width = width;
    canvas.height = height;

    const center = height / 2;
    const step = width / this.peaks.length;

    ctx.clearRect(0, 0, width, height);

    // waveform
    ctx.fillStyle = this.waveColor;
    for (let i = 0; i < this.peaks.length; i++) {
      const barHeight = this.peaks[i] * height;
      ctx.fillRect(i * step, center - barHeight / 2, 1, barHeight);
    }

    // playhead (draw last so it's on top)
    if (this.playheadPosition > 0 && this.playheadPosition < 1) {
      const playheadX = this.playheadPosition * width;
      ctx.fillStyle = "red";
      ctx.fillRect(playheadX, 0, 2, height);
    }
  }
}
