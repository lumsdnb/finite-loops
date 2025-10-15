import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('release-panel')
export class ReleasePanel extends LitElement {
  static styles = css`
    .releases {
      display: flex;
      gap: 1rem;
    }
    .release img {
      width: 150px;
      height: auto;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    console.log('ReleasePanel connected');
  }

  protected render() {
    return html`
      <div class="releases">
        <div class="release">
          <img class="coverart" src="./img/cov1.png" alt="finite loops 1" />
        </div>
        <div class="release">
          <img class="coverart" src="./img/cov2.png" alt="finite loops 2" />
        </div>
        <div class="release">
          <img class="coverart" src="./img/cov3.jpg" alt="finite loops 3" />
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'release-panel': ReleasePanel;
  }
}
