import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("top-nav")
export class TopNav extends LitElement {
  @property({ type: String }) activeName = "";
  @property({ type: Array }) regions: { id: string; name: string }[] = [];

  @state() private translateX = 0;

  @query(".nav-container") private navContainer!: HTMLElement;
  @query(".nav-links") private navLinks!: HTMLElement;

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: var(--lums-top-nav-height);
      z-index: 100;
      container-type: inline-size;
      container-name: nav-wrapper;
    }

    .nav-bar {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      background: rgba(231, 231, 231, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .nav-container {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      overflow: hidden;
      mask-image: linear-gradient(
        to right,
        transparent,
        black 15%,
        black 85%,
        transparent
      );
    }

    .nav-links {
      display: flex;
      gap: 1.2rem;
      padding: 0 1rem;
      transition: transform var(--lums-transition-lg)
        cubic-bezier(0.33, 1, 0.68, 1);
      will-change: transform;
    }

    button {
      background: none;
      border: none;
      font-size: 0.8rem;
      font-weight: 600;
      color: #999;
      cursor: pointer;
      white-space: nowrap;
      transition:
        color var(--lums-transition-md) ease,
        opacity var(--lums-transition-md) ease;
      flex-shrink: 0;
    }

    button.active {
      color: #000;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: --lums-gap-sm;
      font-weight: 800;
      font-size: 0.8rem;
      flex-shrink: 0;
      line-height: 1.1;
      cursor: pointer;
    }

    .logo img {
      width: 32px;
      height: 32px;
      display: block;
    }

    @container nav-wrapper (max-width: 600px) {
      .nav-container {
        justify-content: flex-start;
      }

      button:not(.active) {
        opacity: 0.3;
        transform: scale(0.9);
      }
    }
  `;

  protected firstUpdated() {
    this._recomputeOffset();

    const ro = new ResizeObserver(() => this._recomputeOffset());
    ro.observe(this.navContainer);
    ro.observe(this.navLinks);

    this._resizeObserver = ro;
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("activeName") || changed.has("regions")) {
      this._recomputeOffset();
    }
  }

  private _resizeObserver?: ResizeObserver;

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
  }

  render() {
    return html`
      <div class="nav-bar">
        <div class="logo">
          <img src="/favicon.svg" alt="Logo" />
          <div>
            FINITE <br />
            LOOPS
          </div>
        </div>

        <div class="nav-container">
          <nav
            class="nav-links"
            style="transform: translateX(${this.translateX}px)"
          >
            ${this.regions.map(
              (region, idx) => html`
                <button
                  class=${this.activeName === region.name ? "active" : ""}
                  @click=${() => this._dispatchNavigate(idx)}
                >
                  ${region.name}
                </button>
              `,
            )}
          </nav>
        </div>
      </div>
    `;
  }

  private _recomputeOffset() {
    if (!this.navContainer || !this.navLinks) return;

    const activeIndex = this.regions.findIndex(
      (r) => r.name === this.activeName,
    );

    if (activeIndex < 0) {
      this.translateX = 0;
      return;
    }

    const buttons = Array.from(this.navLinks.querySelectorAll("button"));
    const activeButton = buttons[activeIndex] as HTMLButtonElement | undefined;

    if (!activeButton) {
      this.translateX = 0;
      return;
    }

    const containerWidth = this.navContainer.clientWidth;
    const navWidth = this.navLinks.scrollWidth;

    const buttonCenter = activeButton.offsetLeft + activeButton.offsetWidth / 2;

    const desired = containerWidth / 2 - buttonCenter;

    const minTranslate = Math.min(0, containerWidth - navWidth);
    const maxTranslate = 0;

    this.translateX = Math.max(minTranslate, Math.min(maxTranslate, desired));
  }

  private _dispatchNavigate(index: number) {
    this.dispatchEvent(
      new CustomEvent("navigate-to", {
        detail: { index },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
