import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('drum-pad')
export class DrumPad extends LitElement {
  @property({ type: Number }) index = 0;
  @property({ type: Boolean }) active = false;
  @property({ type: String }) keyBinding = '';
  @property({ type: String }) sampleName = '';

  static styles = css`
    :host {
      display: block;
    }

    .pad {
      width: 100%;
      aspect-ratio: 1;
      background: #3a3a3a;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
      position: relative;
      color: #fff;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .pad:hover {
      background: #4a4a4a;
    }

    .pad.active {
      background: #5a5a5a;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
      transform: scale(0.95);
    }

    .key-binding {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 0.8em;
      opacity: 0.7;
    }

    .sample-name {
      font-size: 0.7em;
      opacity: 0.8;
      text-align: center;
      margin-top: 0.5em;
    }
  `;

  render() {
    return html`
      <sp-button
        class="pad ${this.active ? 'active' : ''}"
        @click=${this._handleClick}
      >
        <span class="key-binding">${this.keyBinding}</span>
        ${this.sampleName ? html`<span class="sample-name">${this.sampleName}</span>` : ''}
      </sp-button>
    `;
  }

  private _handleClick() {
    this.dispatchEvent(
      new CustomEvent('pad-click', {
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'drum-pad': DrumPad;
  }
}