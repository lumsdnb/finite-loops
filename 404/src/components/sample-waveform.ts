import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, Ref } from 'lit/directives/ref.js';

@customElement('sample-waveform')
export class SampleWaveform extends LitElement {
  @property({ type: String }) sampleUrl = '';
  @property({ type: String }) waveColor = '#4d98b3ff';
  @property({ type: Number }) height = 100;
  @property({ type: Number }) playheadPosition = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 80px;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      background-color: transparent;
        border-radius: 50%;

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

  // 1. Correct type for canvas, using Lit's Ref
  private canvasRef: Ref<HTMLCanvasElement> = createRef(); 
  
  // 2. Correct type for peaks
  peaks: number[] = []; 
  
  resizeObserver: ResizeObserver | null = null;
  isLoading: boolean = false; // Initialize directly or in constructor

  constructor() {
    super();
  }

  render() {
    return html`
      <canvas height="${this.height}" ${ref(this.canvasRef)}></canvas>
      ${this.isLoading ? html`<div class="message">Loading audio...</div>` : ''}
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
    if (changed.has('sampleUrl') && this.sampleUrl) this._fetchAudio();
  }

  async _fetchAudio() {
    if (!this.sampleUrl) return;
    this.isLoading = true;
    this.requestUpdate();

    try {
      const response = await fetch(this.sampleUrl);
      const arrayBuffer = await response.arrayBuffer();
      // Using window.AudioContext directly is safe as it's the standard
      const audioContext = new AudioContext(); 
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      this.peaks = this._getPeaks(buffer.getChannelData(0), 1000);
    } catch (err) {
      console.error('Error loading audio:', err);
    } finally {
  this.isLoading = false;
  requestAnimationFrame(() => this._drawWaveform());
  this.requestUpdate();
}
  }

  // 3. Correct type for data in _getPeaks
  _getPeaks(data: Float32Array, samples: number): number[] { 
    const step = Math.floor(data.length / samples);
    const peaks = new Array<number>(samples); // Specify array type
    for (let i = 0; i < samples; i++) {
      let max = 0;
      for (let j = i * step; j < (i + 1) * step; j++) {
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

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Ensure correct width after render
  const width = this.offsetWidth || canvas.clientWidth;
  const height = this.height;

  // Resize canvas to actual pixels
  canvas.width = width;
  canvas.height = height;

  const center = height / 2;
  const step = width / this.peaks.length;

  // Draw the playhead
  if (this.playheadPosition > 0 && this.playheadPosition < 1) {
    const playheadX = this.playheadPosition * width;
    ctx.fillStyle = 'red'; // Color of the playhead
    ctx.fillRect(playheadX, 0, 2, height); // Draw a vertical line
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = this.waveColor;

  for (let i = 0; i < this.peaks.length; i++) {
    const barHeight = this.peaks[i] * height;
    ctx.fillRect(i * step, center - barHeight / 2, 1, barHeight);
  }
}

}