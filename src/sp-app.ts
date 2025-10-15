import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WebMidi, Input, NoteMessageEvent } from 'webmidi';
import { DEFAULT_SAMPLES, SampleData } from './constants/samples';
import './components/pad-grid';
import './components/control-panel';
import { DrumPad } from './components/drum-pad';

@customElement('sp-app')
export class SpApp extends LitElement {
  @state() private audioContext?: AudioContext;
  @state() private samples: Map<number, AudioBuffer> = new Map();
  @state() private sampleNames: Map<number, string> = new Map();
  @state() private patterns: Map<string, boolean[]> = new Map();
  @state() private midiEnabled = false;
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

  connectedCallback() {
    super.connectedCallback();
    this.initAudio();
    this.initMidi();
    this.initKeyboardEvents();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this._handleKeyDown);
    window.removeEventListener('keyup', this._handleKeyUp);
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
      
      // Trigger sound
      this._handlePadTrigger(new CustomEvent('pad-triggered', {
        detail: { index }
      }));

      // Update visual state
      const padGrid = this.shadowRoot?.querySelector('pad-grid');
      const pads = padGrid?.shadowRoot?.querySelectorAll('drum-pad');
      if (pads) {
        const pad = Array.from(pads).find(p => p.getAttribute('index') === index.toString()) as DrumPad;
        if (pad) {
          pad.active = true;
        }
      }
    }
  }

  private _handleKeyUp(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key in this.keyMap) {
      e.preventDefault();
      const index = this.keyMap[key];
      
      const padGrid = this.shadowRoot?.querySelector('pad-grid');
      const pads = padGrid?.shadowRoot?.querySelectorAll('drum-pad');
      if (pads) {
        const pad = Array.from(pads).find(p => p.getAttribute('index') === index.toString()) as DrumPad;
        if (pad) {
          pad.active = false;
        }
      }
    }
  }

  private async initAudio() {
    try {
      this.audioContext = new AudioContext();
      console.log('Audio context initialized');
      await this.loadDefaultSamples();
    } catch (err) {
      console.error('Failed to initialize audio context:', err);
    }
  }

  private async loadDefaultSamples() {
    this.isLoading = true;
    try {
      await Promise.all(
        DEFAULT_SAMPLES.map(async (sample) => {
          try {
            const response = await fetch(sample.url);
            const arrayBuffer = await response.arrayBuffer();
            if (this.audioContext) {
              const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
              this.samples.set(sample.padIndex, audioBuffer);
              this.sampleNames.set(sample.padIndex, sample.name);
            }
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

  static styles = css`
    * {
      box-sizing: border-box;
    }
  
    :host {
      padding-top: 0.8rem;
      margin:0;
      padding:0;
      padding-top:0.8rem;
      display: block;
      background: #2a2a2a;
      color: #EEE;
      font-family: system-ui, -apple-system, sans-serif;
      border-radius: 24px;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

    .header-controls-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    }

    
    pad-grid {
    border:2px solid blue;}

    @media (min-width: 1024px) {
      pad-grid {
        border:2px solid green; 
      }
    }

    .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
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

     .app-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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
   <div class=header-controls-wrapper>
     <div class="header">
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
       <h2 class="title">FL-404</h2>
     </div>

     <control-panel .currentPadIndex=${this.currentPadIndex}
       .currentSampleName=${this.sampleNames.get(this.currentPadIndex) || '' } .bpm=${this.bpm}
       .mode=${this.currentMode} @bpm-change=${this._handleBpmChange} @mode-change=${this._handleModeChange}>
     </control-panel>
   </div>

   <pad-grid .mode=${this.currentMode} .currentStep=${this.currentStep} .sampleNames=${this.sampleNames}
     @pad-triggered=${this._handlePadTrigger}></pad-grid>
 </div>
    `;
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
    this.playSound(index);
  }

  private playSound(index: number) {
    if (!this.audioContext || !this.samples.has(index)) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.samples.get(index)!;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sp-app': SpApp;
  }
}