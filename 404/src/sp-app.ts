import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WebMidi, Input, NoteMessageEvent } from 'webmidi';
import { DEFAULT_SAMPLES } from './constants/samples';
import './components/pad-grid';
import { PadGrid } from './components/pad-grid';
import './components/control-panel';
import { AudioPlaybackManager, getAudioPlaybackManager } from './audio/AudioPlaybackManager';
import { SampleWaveform } from './components/sample-waveform';

@customElement('sp-app')
export class SpApp extends LitElement {
  @state() private samples: Map<number, AudioBuffer> = new Map();
  @state() private sampleNames: Map<number, string> = new Map();
  // @state() private patterns: Map<string, boolean[]> = new Map();
  @state() private midiEnabled = false;
  private audioPlaybackManager: AudioPlaybackManager | undefined;
  @state() private midiInputs: Input[] = [];
  @state() private isLoading = true;
  @state() private currentPadIndex = -1;
  @property({ type: Number }) bpm = 120;
  @property({ type: String }) currentMode: 'performance' | 'sequencer' = 'performance';
  @state() private currentStep = 0;

  private keyMap: Record<string, number> = {
    '1': 0, '2': 1, '3': 2, '4': 3,
    'q': 4, 'w': 5, 'e': 6, 'r': 7,
    'a': 8, 's': 9, 'd': 10, 'f': 11,
    'z': 12, 'x': 13, 'c': 14, 'v': 15
  };
  @state()
  private _backPanelVisible = false;

  connectedCallback() {
    super.connectedCallback();
    this.initAudioPlaybackManager();
    this.initMidi();
    this.initKeyboardEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
    window.removeEventListener('keyup', this._handleKeyUp);
  }

  private _getPadGrid(): PadGrid | null {
    // Note: Assumes pad-grid is in this component's shadow DOM
    return this.shadowRoot?.querySelector('pad-grid') ?? null;
  }

  private initKeyboardEvents() {
    // Bind the methods once to avoid creating new functions on every event
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleKeyUp = this._handleKeyUp.bind(this);
    window.addEventListener('keydown', this._handleKeyDown);
    window.addEventListener('keyup', this._handleKeyUp);
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.repeat) return; // Prevent key repeat
    const key = e.key.toLowerCase();
    if (key in this.keyMap) {
      e.preventDefault();
      const index = this.keyMap[key];
      
      // 1. Trigger sound (This was already correct)
      this._handlePadTrigger(new CustomEvent('pad-triggered', {
        detail: { index }
      }));

      // 2. Update visual state via public method
      //    This correctly triggers the sp-button's .active property
      this._getPadGrid()?.triggerPadDown(index);
    }
    // TODO: Add handlers for other non-pad-grid keys here
  }

  private _handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key in this.keyMap) {
      e.preventDefault();
      const index = this.keyMap[key];
      
      this._getPadGrid()?.triggerPadUp(index);
    }
  }

  private initAudioPlaybackManager() {
    this.audioPlaybackManager = getAudioPlaybackManager();
    // Listen for playback events
    this.audioPlaybackManager.addEventListener('playback-progress', this._handlePlaybackProgress);
    this.audioPlaybackManager.addEventListener('playback-started', this._handlePlaybackStarted);
    this.audioPlaybackManager.addEventListener('playback-ended', this._handlePlaybackEnded);

    this.audioPlaybackManager.setPlaybackSettings(this.bpm, this.currentMode === 'sequencer');
    console.log('AudioPlaybackManager initialized');
    this.loadDefaultSamples();
  }

  private async loadDefaultSamples() {
    this.isLoading = true;
    try {
      await Promise.all(
        DEFAULT_SAMPLES.map(async (sample) => {
          try {
            const response = await fetch(sample.url);
            const arrayBuffer = await response.arrayBuffer();
            // Decode audio data using the AudioPlaybackManager's AudioContext
            if (!this.audioPlaybackManager) throw new Error('AudioPlaybackManager not initialized');
            const audioBuffer = await this.audioPlaybackManager.getAudioContext().decodeAudioData(arrayBuffer);
            this.samples.set(sample.padIndex, audioBuffer);
            this.sampleNames.set(sample.padIndex, sample.name);
          } catch (err) {
            console.error(`Failed to load sample ${sample.name}:`, err);
          }
        })
      );
    } catch (err) {
      console.error('Failed to load samples:', err);
    }
    this.isLoading = false;
  }

  private async initMidi() {
    try {
      await WebMidi.enable();
      this.midiEnabled = true;
      this.midiInputs = WebMidi.inputs;
      console.log('MIDI enabled, available inputs:', this.midiInputs);

      this.midiInputs.forEach(input => {
        input.addListener('noteon', (e: NoteMessageEvent) => {
          const padIndex = e.note.number % 16;
          this._handlePadTrigger(new CustomEvent('pad-triggered', { 
            detail: { index: padIndex } 
          }));
        });
      });
    } catch (err) {
      console.error('Failed to initialize MIDI:', err);
    }
  }
  
  // Update BPM and sync status when properties change
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('bpm') || changedProperties.has('currentMode')) {
      if (this.audioPlaybackManager) {
        const isBpmSyncEnabled = this.currentMode === 'sequencer';
        this.audioPlaybackManager.updateSettings(this.bpm, isBpmSyncEnabled);
      }
    }
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }
  
    :host {
      /* --- MODIFIED --- */
      /* Remove chassis styling from here */
      /* The host is just a layout block now */
      display: block;
      color: var(--sp-foreground);
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      /* Removed background, border-radius, box-shadow, padding-top */
    }

    .header-controls-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      position: relative; 
      transform-origin: top;
      backface-visibility: hidden; 
      z-index: 2; 
      padding-top: 0.8rem;
      background: var(--sp-background);
      border-radius: 24px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

    @media (min-width: 1024px) {
      pad-grid {
        border:2px solid green; 
      }
    }

    .back-panel {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
      bottom: 100%; 
      
      transform: rotateX(90deg); /* Start folded flat "back" */
      transform-origin: bottom;   /* Hinge at its bottom edge (the seam) */
      transition: transform 0.2s ease;
      
      pointer-events: none;
      backface-visibility: hidden; 
      z-index: 1; 
      background: var(--sp-background-darker, #222); 
      padding: 1rem; 
      
      border-radius: 24px;
      border-radius: 24px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

    .back-panel-active {
      transform: rotateX(0deg); /* Unfold into view */
      pointer-events: all;
    }


    .app-body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      perspective: 1000px; 
    }

    .sp-unit {
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.2s ease;
      transform: rotateX(0deg);
      transform-origin: bottom;
    }

    .sp-unit-active {
      transform: rotateX(-6deg) translateY(206px);
    }

    .back-panel-button {
      align-self: flex-end;
    }


    .title {
      font-size: 2rem;
    margin: 0;
      font-family: 'Times New Roman', Times, serif;
    }


    .controls {
      margin-bottom: 1rem;
    }

    .control-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .midi-status {
      font-size: 0.9rem;
      color: #aaa;
    }

    input[type="number"], select {
      background: #3a3a3a;
      color: #fff;
      border: 1px solid #4a4a4a;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
    }

  @media (min-width: 1024px) {
    .app-body {
      flex-direction: row; 
      align-items: center;
    }

    .title {
      font-size: var(--xtra-big-ass-heading);
    }

    control-panel {
      flex: 1;
    }

    pad-grid {
      flex: 1;
    }
  }
  `;

  render() {
    return html`
    <div class="app-body">
    
      <div class="sp-unit ${this._backPanelVisible ? "sp-unit-active" : ""}">

        <div class="back-panel ${this._backPanelVisible ? " back-panel-active" : ""}">
          <div class="controls">
            <div class="control-row">
              <label>
                BPM:
                <input type="number" min="60" max="200" .value=${this.bpm} @change=${this._handleBpmChange} />
              </label>
              <select .value=${this.currentMode} @change=${this._handleModeChange}>
                <option value="performance">Performance</option>
                <option value="sequencer">Sequencer</option>
              </select>
            </div>
            <div class="midi-status">
              MIDI: ${this.midiEnabled ? 'Enabled' : 'Disabled'}
              ${this.midiEnabled
              ? html` (${this.midiInputs.length} device${this.midiInputs.length !== 1 ? 's' : ''} connected)`
              : ''}
            </div>
          </div>
        </div>

        <div class="header-controls-wrapper"> 
          <button class="back-panel-button" @click=${()=> this.toggleBackVisible()}>${this._backPanelVisible ? 'hide back' : 'show back'}</button>
          <h2 class="title">FL-404</h2>

          <control-panel .currentPadIndex=${this.currentPadIndex} .isLoading=${this.isLoading}
            .currentSampleName=${this.sampleNames.get(this.currentPadIndex) || '' } .bpm=${this.bpm}
            .mode=${this.currentMode} @bpm-change=${this._handleBpmChange} @mode-change=${this._handleModeChange}>
          </control-panel>
        </div>

      </div> 
      
      <pad-grid .mode=${this.currentMode} .currentStep=${this.currentStep} .sampleNames=${this.sampleNames}
        @pad-triggered=${this._handlePadTrigger}></pad-grid>
    </div>
    `;
  }

  toggleBackVisible() {
    this._backPanelVisible = ! this._backPanelVisible;
  }

  private _handleBpmChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.bpm = Number(input.value);
  }

  private _handleModeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.currentMode = select.value as 'performance' | 'sequencer';
  }

  private _handlePadTrigger(e: CustomEvent) {
    const { index } = e.detail;
    this.currentPadIndex = index;
    const buffer = this.samples.get(index);
    if (buffer && this.audioPlaybackManager) {
      this.audioPlaybackManager.play(buffer, index, 1.0);
    }
  }

  private _handlePlaybackStarted = (event: Event) => {
    const { id, padIndex, startTime } = (event as CustomEvent).detail;
    console.log(`Playback started: ID=${id}, Pad=${padIndex}, Time=${startTime}`);
    // Potentially update UI or track active sounds
  };

  private _handlePlaybackProgress = (event: Event) => {
    const { id, padIndex, progress, currentTime } = (event as CustomEvent).detail;
    console.log(`Playback progress: ID=${id}, Pad=${padIndex}, Progress=${progress.toFixed(2)}, current time: ${currentTime}`);

    // Find the corresponding sample-waveform component and update its playhead position
    const controlPanel = this.shadowRoot?.querySelector('control-panel');
    if (controlPanel) {
      const waveform = controlPanel.shadowRoot?.querySelector('sample-waveform');
      const sampleWaveform = waveform as SampleWaveform;
      if (sampleWaveform && sampleWaveform.dataset.sampleIndex === padIndex.toString()) {
        sampleWaveform.playheadPosition = progress; // Update the custom property
        sampleWaveform.requestUpdate(); // Trigger re-render if needed
      }
    }
  };

  private _handlePlaybackEnded = (event: Event) => {
    const { id, padIndex } = (event as CustomEvent).detail;
    console.log(`Playback ended: ID=${id}, Pad=${padIndex}`);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'sp-app': SpApp;
  }
}