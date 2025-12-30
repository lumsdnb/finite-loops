import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './sp-button';
import './sample-waveform';

@customElement('control-panel')
export class ControlPanel extends LitElement {
  @property({ type: Number }) currentPadIndex = -1;
  @property({ type: String }) currentSampleName = '';
  @property({ type: Number }) bpm = 120;
  @property({ type: String }) mode: 'performance' | 'sequencer' = 'performance';

  // @property({type: Boolean}) isLoading= false

  static styles = css`
    :host {
      display: block;
      background: #2a2a2a;
      padding: 2rem;
      margin-bottom: 1rem;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      
    }

    .panel-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
      justify-content: center;
    }

    .knobs {
    width: fit-content;
      display: flex;
      justify-content: space-between;
      background: #1b1b1bff;
      padding: 2rem;
      border-radius: 48px;
      margin-bottom: 1rem;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 2px 4px rgba(0,0,0,0.2);
    }

        @media (min-width: 1024px) { /* big screens */
        :host
    .knobs {
      flex-direction: column;
    }

  }

    .knob {
      width: 60px;
      height: 60px;
      background: #1a1a1a;
      border-radius: 50%;
      border: none;
      position: relative;
      cursor: pointer;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.1);
    }

    .sample-edit-controls {
      align-self: flex-end;
    }

    .knob::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 20px;
      background: #fff;
      transform-origin: bottom;
      transform: translate(-50%, -100%) rotate(0deg);
    }

    .fx-buttons {
      display:flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      width: 140px;
      flex:1;
    }
      .--left {
      align-items: flex-end;
      }


      .tap-tempo {
        border-radius: 100%;
        width: 70px;
        height: 70px;
        text-wrap-mode: wrap;
      }
    .fxr {
      display: flex;
      flex-wrap: nowrap;
    }

    .button-screen-group {
      padding: 0 2rem;
    }
    .fxc {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .lower-button-group {
    }

    .fx-button {
      width: 100%;
      max-width: 80px;
      height: 40px;
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8em;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.4),
        inset 0 2px 4px rgba(255,255,255,0.1);
      transition: all 0.1s;
    }

    .fx2 {
      margin-right: 1.5rem;
    }

    .fx5 {
      margin-left: 1.5rem;
    }

    .fx-button:active {
      transform: translateY(1px);
      box-shadow: 
        0 1px 2px rgba(0,0,0,0.4),
        inset 0 1px 2px rgba(255,255,255,0.1);
    }

    .sample-edit-label {
      flex-grow: 1;
      text-decoration: 
    }

    .screen {
      font-family: monospace;
      background: #1a1a1a;
      flex: 1;
      border-radius: 50%;
      padding: 0rem;
      aspect-ratio: 1;
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      border-radius: 50%;
    }

    .bank .button-group {
      border: transparent;
      padding: 1.2rem;
      background-color: #1a1a1a;
    }

    .sample-mode {
    margin: 0.5rem;
      border: transparent;
      background-color: #3c4a4eff;
    }
    .button-group {
      display: flex;
      gap: 1rem;
      padding: 0.4rem;
      height: 100%;
    }
      .sampling .button-group {
      padding: 1rem;}

    .pattern-sequencer-controls {
      font-size: 0.7em;}

    .sample-label {
      font-size: 0.8em;
      color: #888;
    }

    .button-row {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap:1rem;}

    .sample-name {
      font-size: 1.2em;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
      label {
            text-transform: uppercase;
}

    .record-button, .resample-button {
      border: 1px double red;
    }

    .no-sample {
      color: #666;
    }

    @media (min-width: 600px) {
      .button-row {
        flex-direction: row;
      }
    }

     @media (min-width: 1024px) {
    .panel-container {
      flex-direction: row;
      align-items: center;
    }
      .pattern-select-button  {
        width: 50%;
        text-wrap-mode: wrap;
      }

    control-panel {
      flex: 1; /* take left side */
    }

    pad-grid {
      flex: 1; /* take right side */
      margin-left: 1rem; /* optional spacing */
    }
  }
  `;
  private _sampleEditState: "off" | "start" | "end" = "off";
  private _timeBpmState: "off" | "time" | "bpm" = "off";

  render() {
  return html`
    <div class="panel-container">
      <div class="knobs">
        <button class="knob volume" title="CTRL 0"></button>
        <button class="knob" title="CTRL 1"></button>
        <button class="knob" title="CTRL 2"></button>
        <button class="knob" title="CTRL 3"></button>
      </div>

      <div class="button-screen-group fxr">
        <div class="fx-buttons --left">
          <sp-button class="fx-button fx1" title="FX1">FX1</sp-button>
          <sp-button class="fx-button fx2" title="FX2">FX2</sp-button>
          <sp-button class="fx-button fx3" title="FX3">FX3</sp-button>
        </div>

        <div class="screen">
  <span class="sample-label">Current Sample</span>
  ${this.currentSampleName
    ? html`
      <span class="sample-name">${this.currentSampleName}</span>
      <sample-waveform
        .sampleUrl=${`/samples/${this.currentSampleName}.wav`}
        .sampleName=${this.currentSampleName}
        data-sample-index=${this.currentPadIndex}
      ></sample-waveform>
    `
    : html`<span class="no-sample">No sample selected</span>`}
</div>

        <div class="fx-buttons">
          <sp-button class="fx-button fx4" title="FX4">FX4</sp-button>
          <sp-button class="fx-button fx5" title="FX5">FX5</sp-button>
          <sp-button class="fx-button fx6" title="FX6">FX6</sp-button>
        </div>
      </div>
    </div>

    <section class="lower-button-group">
      <div class="button-row fxr">
        <div class="pattern-sequencer button-group fxr">
          <sp-button class=" pattern-select-button" title="Pattern Select">PATTERN SELECT</sp-button>
          <sp-button class="length-button" title="Length">LENGTH</sp-button>
          <sp-button class="quantize-button" title="Quantize">QUANTIZE</sp-button>
        </div>

        <div class="sample-edit-controls fxc">
          <label class="sample-edit-label" for="sample-edit-buttons">Sample Edit</label>
          <div class="sample-edit button-group fxr">
            <sp-button @click=${this._handleTimeBpmClick} class="time-bpm" title="time/bpm">${this._timeBpmState}</sp-button>
            <sp-button @click=${this._handleSampleEditClick} class="start-end-toggle" title="Set Start">${this._sampleEditState}</sp-button>
          </div>
          </div>
          <sp-button class="tap-tempo" variant="round" title="Tap Tempo">TAP TEMPO</sp-button>
          </div>
          
      <div class="button-row fxr">
        <div class="sampling button-group fxr">
          <sp-button class="delete-button" title="Delete">DEL</sp-button>
          <sp-button class="record-button" title="Record">REC</sp-button>
          <sp-button class="resample-button" title="Resample">RESAMPLE</sp-button>
        </div>

        <div class="sample-mode control-group fxc">
          <label class="sample-mode-label" for="sample-mode">Sample Mode</label>
          <div class="sample-mode button-group fxr">
            <sp-button class="lofi-mode" title="">LOFI</sp-button>
            <sp-button class="stereo-mode" title="">STEREO</sp-button>
            <sp-button class="gate-mode" title="">GATE</sp-button>
            <sp-button class="loop-mode" title="">LOOP</sp-button>
            <sp-button class="reverse-mode" title="">REVERSE</sp-button>
          </div>
        </div>
      </div>

      <div class="button-row fxr">
        <div class="sampling button-group fxr">
          <sp-button class="cancel-button" title="Cancel">CANCEL</sp-button>
          <sp-button class="remain-button" title="Remain">REMAIN</sp-button>
          <sp-button class="mark-button" title="Mark">MARK</sp-button>
        </div>

        <div class="bank fxc">
          <label class="bank-label" for="bank-buttons">BANK</label>
          <div class="bank button-group fxr">
            <sp-button class="bank-button" title="bank A/F">A/F</sp-button>
            <sp-button class="bank-button" title="bank B/G">B/G</sp-button>
            <sp-button class="bank-button" title="bank C/H">C/H</sp-button>
            <sp-button class="bank-button" title="bank D/I">D/I</sp-button>
            <sp-button class="bank-button" title="bank E/J">E/J</sp-button>
          </div>
        </div>


      </div>
    </section>
  `;
}

private _handleSampleEditClick(e:Event){
  console.log("switching sample edit screen", e);
  
}

  private _handleTimeBpmClick(e: Event) {
    const input = e.target as HTMLInputElement;
    const newBpm = Number(input.value);
    this.dispatchEvent(new CustomEvent('bpm-change', {
      detail: { bpm: newBpm },
      bubbles: true,
      composed: true
    }));
  }

  // private _handleModeChange(e: Event) {
  //   const select = e.target as HTMLSelectElement;
  //   const newMode = select.value as 'performance' | 'sequencer';
  //   this.dispatchEvent(new CustomEvent('mode-change', {
  //     detail: { mode: newMode },
  //     bubbles: true,
  //     composed: true
  //   }));
  // }
}

declare global {
  interface HTMLElementTagNameMap {
    'control-panel': ControlPanel;
  }
}