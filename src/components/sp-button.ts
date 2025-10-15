import { LitElement, html, css, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('sp-button')
export class SpButton extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Boolean }) active = false;
  @property({ type: String }) variant: 'square' | 'round' = 'square';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) highlight = '';

  static styles: CSSResult[] = [ css`
    :host {
      display: inline-block;
    }

    :host([hidden]) {
      display: none;
    }

    button {
      background: var(--sp-button-color, hsl(214.29deg 5.53% 53.08%));
      color: var(--sp-button-text, #333333);
      border: none;
      cursor: pointer;
      font-weight: 900;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
    transition:
        background 80ms ease,
        box-shadow 80ms ease,
        transform 80ms ease;
      box-shadow: 
        0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2)),
        inset 0 1px 3px rgba(255, 255, 255, 0.8),
        inset 0 -2px 1px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
      width: 100%;
      height: 100%;
    }

    button.square {
      border-radius: 4px;
      padding: 4px 4px;
    }

    button.round {
      border-radius: 50%;
      aspect-ratio: 1;
      padding: 0;
    }

    button.small {
      font-size: 0.8rem;
      min-width: 32px;
      min-height: 32px;
    }

    button.medium {
      font-size: 1rem;
      min-width: 48px;
      min-height: 48px;
    }

    button.large {
      font-size: 1.2rem;
      min-width: 64px;
      min-height: 64px;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 
        0 4px 8px var(--sp-button-shadow, rgba(0, 0, 0, 0.2)),
        inset 0 1px 3px rgba(255, 255, 255, 0.8),
        inset 0 -2px 3px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }

    button:active,
    button.active {
      transform: translateY(1px);
      background: linear-gradient(to bottom, 
        var(--sp-button-color, #e0e0e0) 0%, 
        #d0d0d0 100%);
      box-shadow: 
        inset 0 0 200px -5px var(--sp-button-active-glow, rgba(255, 107, 107, 0.7)),
        /* The subtle press-down shadow for depth */
        inset 0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }

    button:focus-visible {
      outline: 2px solid var(--sp-button-focus-color, #4a90e2);
      outline-offset: 2px;
      box-shadow: 
        0 0 0 4px var(--sp-button-focus-ring, rgba(74, 144, 226, 0.25)),
        0 2px 4px var(--sp-button-shadow, rgba(0, 0, 0, 0.2));
    }

    button.active {
      transition: background 0ms, box-shadow 60ms ease, transform 60ms ease;
      --sp-button-active-glow: var(--sp-button-highlight, rgba(255, 107, 107, 0.7));
    }
  `];

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.active = true;
    }
  }

  private _handleKeyUp(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.active = false;
      this.dispatchEvent(new CustomEvent('click'));
    }
  }

  render() {
    return html`
      <button
        class="${[this.variant, this.size, this.active ? 'active' : ''].filter(Boolean).join(' ')}"
        @keydown="${this._handleKeyDown}"
        @keyup="${this._handleKeyUp}"
        aria-pressed="${this.active}"
        style="${this.highlight ? `--sp-button-highlight: ${this.highlight};` : ''}"
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }

  protected _handleClick(e: MouseEvent) {
    this.dispatchEvent(new CustomEvent('sp-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  }
}