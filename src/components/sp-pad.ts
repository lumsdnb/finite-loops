import { customElement, property } from 'lit/decorators.js';
import { css, CSSResult, html } from 'lit';
import { SpButton } from './sp-button';

@customElement('sp-pad')
export class SpPad extends SpButton {
  @property({ type: String }) sampleName = '';
  @property({ type: Number }) padIndex = -1;

  static get styles(): CSSResult[] {
    // super.styles is now guaranteed to be CSSResult[]
    const baseStyles = super.styles as CSSResult[];

    const padStyles = css`
      :host {
        aspect-ratio: 1;
        display: block;
      }

      button {
        border-radius: 8px;
        padding: 0;
        margin: 4px;
      }

      button:active,
      button.active {
        box-shadow:
          0 0 20px var(--sp-button-highlight, rgba(255, 107, 107, 0.8)),
          inset 0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
      }

      .sample-name {
        font-size: 0.8em;
        word-break: break-word;
        padding: 4px;
      }
    `;

    // Concatenate the base styles array with the new style result
    return [...baseStyles, padStyles];
  }

  render() {
    return html`
      <button
        class="${this.active ? 'active' : ''}"
        style="${this.highlight ? `--sp-button-highlight: ${this.highlight};` : ''}"
        @click=${this._handleClick}
        data-pad-index="${this.padIndex}"
      >
        <div class="sample-name">${this.sampleName}</div>
      </button>
    `;
  }

  protected override _handleClick(e: MouseEvent) {
    this.dispatchEvent(new CustomEvent('pad-click', {
      detail: { 
        padIndex: this.padIndex,
        sampleName: this.sampleName,
        originalEvent: e 
      },
      bubbles: true,
      composed: true
    }));
  }
}