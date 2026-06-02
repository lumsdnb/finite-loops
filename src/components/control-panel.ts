import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./sp-button";
import "./sample-waveform";

@customElement("control-panel")
export class ControlPanel extends LitElement {
  @property({ type: Number }) currentPadIndex = -1;
  @property({ type: String }) currentSampleName = "";
  @property({ type: Number }) bpm = 120;
  @property({ type: String }) mode: "performance" | "sequencer" = "performance";

  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
      color: #fff;
    }

    /* --- CORE LAYOUT --- */
    .panel {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* --- TOP COMPACT STRIP --- */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      background: #2a2a2a;
      padding: 0.5rem 0.75rem;
      border-radius: 16px;
      font-size: 0.8rem;
    }

    .bpm {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }

    input {
      width: 60px;
      background: #1a1a1a;
      border: 1px solid #444;
      border-radius: 6px;
      color: #fff;
      padding: 0.2rem;
    }

    /* --- MAIN SECTION --- */
    .main {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0.75rem;
      align-items: center;
      background: #2a2a2a;
      padding: 0.75rem;
      border-radius: 20px;
    }

    /* FX columns */
    .fx-col {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .fx-button {
      width: 64px;
      height: 36px;
      font-size: 0.75rem;
    }

    /* CENTER SCREEN */
    .screen {
      background: #111;
      border-radius: 16px;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
      gap: 0.25rem;
    }

    .sample-name {
      font-size: 0.8rem;
      text-align: center;
      word-break: break-word;
    }

    sample-waveform {
      width: 100%;
      height: 40px;
    }

    /* --- KNOBS --- */
    .knobs {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      background: #1a1a1a;
      padding: 0.5rem;
      border-radius: 16px;
    }

    .knob {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #222;
    }

    /* --- LOWER BUTTON GROUPS --- */
    .section {
      background: #2a2a2a;
      border-radius: 16px;
      padding: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      justify-content: center;
    }

    sp-button {
      font-size: 0.7rem;
      min-width: 52px;
    }

    .tap-tempo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    /* --- DESKTOP --- */
    @media (min-width: 1024px) {
      .panel {
        gap: 1rem;
      }

      .main {
        grid-template-columns: 80px 1fr 80px;
        padding: 1rem;
      }

      .fx-button {
        width: 80px;
        height: 40px;
      }

      .knobs {
        justify-content: center;
        gap: 1rem;
      }

      .knob {
        width: 60px;
        height: 60px;
      }

      .section {
        justify-content: space-between;
      }
    }
  `;

  render() {
    return html`
      <div class="panel">
        <!-- TOP STRIP -->
        <div class="top-bar">
          <div class="bpm">
            BPM
            <input
              type="number"
              .value=${String(this.bpm)}
              @change=${this._handleBpmChange}
            />
          </div>
          <div>${this.mode}</div>
        </div>

        <!-- MAIN CORE -->
        <div class="main">
          <div class="fx-col">
            <sp-button class="fx-button">FX1</sp-button>
            <sp-button class="fx-button">FX2</sp-button>
            <sp-button class="fx-button">FX3</sp-button>
          </div>

          <div class="screen">
            ${this.currentSampleName
              ? html`
                  <div class="sample-name">${this.currentSampleName}</div>
                  <sample-waveform
                    .sampleUrl=${`/samples/${this.currentSampleName}.wav`}
                    data-sample-index=${this.currentPadIndex}
                  ></sample-waveform>
                `
              : html`<div>No sample</div>`}
          </div>

          <div class="fx-col">
            <sp-button class="fx-button">FX4</sp-button>
            <sp-button class="fx-button">FX5</sp-button>
            <sp-button class="fx-button">FX6</sp-button>
          </div>
        </div>

        <!-- KNOBS -->
        <div class="knobs">
          <div class="knob"></div>
          <div class="knob"></div>
          <div class="knob"></div>
          <div class="knob"></div>
        </div>

        <!-- PERFORMANCE -->
        <div class="section">
          <sp-button>PATTERN</sp-button>
          <sp-button>LENGTH</sp-button>
          <sp-button>QUANT</sp-button>
          <sp-button class="tap-tempo">TAP</sp-button>
        </div>

        <!-- SAMPLING -->
        <div class="section">
          <sp-button>DEL</sp-button>
          <sp-button>REC</sp-button>
          <sp-button>RES</sp-button>
        </div>
      </div>
    `;
  }

  private _handleBpmChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const bpm = Number(input.value);

    this.dispatchEvent(
      new CustomEvent("bpm-change", {
        detail: { bpm },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
