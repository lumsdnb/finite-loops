import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './drum-pad';

@customElement('pad-grid')
export class PadGrid extends LitElement {
  @property({ type: String }) mode: 'performance' | 'sequencer' = 'performance';
  @property({ type: Number }) currentStep = 0;
  @property({ type: Object }) sampleNames: Map<number, string> = new Map();

  private keyMap = [
    '1', '2', '3', '4',
    'q', 'w', 'e', 'r',
    'a', 's', 'd', 'f',
    'z', 'x', 'c', 'v'
  ];

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

  render() {
    return html`
      ${Array(16)
        .fill(0)
        .map(
          (_, index) => html`
            <drum-pad
              .index=${index}
              .keyBinding=${this.keyMap[index]}
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

declare global {
  interface HTMLElementTagNameMap {
    'pad-grid': PadGrid;
  }
}