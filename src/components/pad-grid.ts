// pad-grid.ts

// Import SpButton to get its type
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './drum-pad';
import { SpButton } from './sp-button'; // 👈 Import SpButton

@customElement('pad-grid')
export class PadGrid extends LitElement {
  @property({ type: String }) mode: 'performance' | 'sequencer' = 'performance';
  @property({ type: Number }) currentStep = 0;
  @property({ type: Object }) sampleNames: Map<number, string> = new Map();

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      padding: 1rem;
      background: #1a1a1a;
      border-radius: 8px;
      max-width: 800px;
      max-height: 800px;
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
    }
  `;

  // --- 👇 This helper is still needed ---
  private _getPadButton(index: number): SpButton | null {
    // Find all drum-pad elements in this component's shadow DOM
    const pads = this.shadowRoot?.querySelectorAll('drum-pad');
    if (!pads || !pads[index]) return null;

    // Find the sp-button inside the drum-pad's shadow DOM
    const spButton = pads[index].shadowRoot?.querySelector('sp-button');
    return (spButton as SpButton) || null;
  }

  // --- ❌ REMOVED _handleGlobalKeyDown and _handleGlobalKeyUp ---

  // --- 👇 ADD These Public Methods ---

  /**
   * Programmatically sets a pad's visual state to "pressed".
   * Called by the parent app.
   */
  public triggerPadDown(index: number) {
    const spButton = this._getPadButton(index);
    if (spButton) {
      spButton.active = true;
    }
  }

  /**
   * Programmatically sets a pad's visual state to "unpressed".
   * Called by the parent app.
   */
  public triggerPadUp(index: number) {
    const spButton = this._getPadButton(index);
    if (spButton) {
      spButton.active = false;
    }
  }

  // --- (Rest of your component) ---

  render() {
    // Get the keyMap from sp-app, or re-define it here just for display
    // Note: Your old code was using this.keyMap, which is now gone.
    // We'll quickly recreate it for the .keyBinding property.
    const keyMapDisplay = [
      '1', '2', '3', '4',
      'q', 'w', 'e', 'r',
      'a', 's', 'd', 'f',
      'z', 'x', 'c', 'v'
    ];

    return html`
      ${Array(16)
        .fill(0)
        .map(
          (_, index) => html`
            <drum-pad
              .index=${index}
              .keyBinding=${keyMapDisplay[index]} 
              .sampleName=${this.sampleNames.get(index) || ''}
              .active=${this.mode === 'sequencer' && index === this.currentStep}
              @pad-click=${() => this._handlePadClick(index)}
            ></drum-pad>
          `
        )}
    `;
  }

  private _handlePadClick(index: number) {
    this.dispatchEvent(
      new CustomEvent('pad-triggered', {
        detail: { index },
        bubbles: true,
        composed: true,
      })
    );
  }
}