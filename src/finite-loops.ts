import { LitElement, html, css } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import "./components/top-nav";

interface Region {
  id: string;
  name: string;
  desc: string;
  svg: string;
}

const NAV_KEYS = new Set(["Space", "ArrowLeft", "ArrowRight", "KeyA", "KeyD"]);

@customElement("finite-loops")
export class FiniteLoops extends LitElement {
  @state() private activeRegionIndex = 0;
  @state() private isDetailOpen = false;

  @query(".world-viewport") private _viewport!: HTMLElement;

  private _isNavigating = false;

  private readonly worldSvg = "/regions/full-world-desktop.svg";

  private readonly regions: Region[] = [
    {
      id: "city",
      name: "The Overpass",
      desc: "Where the high-rises meet the highway bridge.",
      svg: "/regions/city.svg",
    },
    {
      id: "record-shop",
      name: "Record Shop",
      desc: "A small corner alley placeholder.",
      svg: "/regions/record-shop.svg",
    },
    {
      id: "ancient-relic",
      name: "Artifacts",
      desc: "Various relics and tools from the past.",
      svg: "/regions/ancient-relic.svg",
    },
    {
      id: "board",
      name: "The Board",
      desc: "Artist blog posts, newspaper stands, and community news.",
      svg: "/regions/board.svg",
    },
    {
      id: "soundsystem",
      name: "The Soundwall",
      desc: "Live audio events. Collective voting on the bass boost active.",
      svg: "/regions/soundsystem.svg",
    },
  ];

  private get _activeRegion(): Region {
    return this.regions[this.activeRegionIndex];
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("keydown", this._handleKeyDown);

    document.addEventListener("selectstart", this._preventSelection);
    document.addEventListener("dragstart", this._preventSelection);
  }
  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("keydown", this._handleKeyDown);

    document.removeEventListener("selectstart", this._preventSelection);
    document.removeEventListener("dragstart", this._preventSelection);

    window.removeEventListener("popstate", this._hydrateFromHash);
    this.removeEventListener("wheel", this._handleWheel);
    this._viewport?.removeEventListener("pointerdown", this._cancelNavigating);
  }

  private _preventSelection = (event: Event) => {
    event.preventDefault();
  };

  firstUpdated() {
    this.addEventListener("wheel", this._handleWheel, { passive: false });
    this._viewport.addEventListener("pointerdown", this._cancelNavigating);
    this._hydrateFromHash();
    window.addEventListener("popstate", this._hydrateFromHash);
  }

  private _clampRegionIndex(index: number) {
    return Math.max(0, Math.min(this.regions.length - 1, index));
  }

  private _setActiveRegion(index: number) {
    const clamped = this._clampRegionIndex(index);
    this.activeRegionIndex = clamped;
    this.isDetailOpen = false;
    return clamped;
  }

  private _syncHash(index: number, mode: "push" | "replace" = "push") {
    const regionId = this.regions[index].id;
    const nextHash = `#${regionId}`;

    if (window.location.hash === nextHash) return;

    if (mode === "push") {
      window.history.pushState(null, "", nextHash);
      return;
    }

    window.history.replaceState(null, "", nextHash);
  }

  private _scrollViewportToRegion(
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) {
    if (!this._viewport) return;

    this._isNavigating = true;
    const width = this._viewport.offsetWidth;

    this._viewport.scrollTo({
      left: index * width,
      behavior,
    });
  }

  private _goToRegion(index: number, behavior: ScrollBehavior = "smooth") {
    const clamped = this._setActiveRegion(index);
    this._syncHash(clamped, "push");
    this._scrollViewportToRegion(clamped, behavior);
  }

  private _scrollToRegion(index: number, behavior: ScrollBehavior = "smooth") {
    const clamped = this._setActiveRegion(index);
    this._scrollViewportToRegion(clamped, behavior);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (NAV_KEYS.has(event.code)) {
      event.preventDefault();
    }

    switch (event.code) {
      case "Space":
        this._toggleDetail();
        break;

      case "ArrowLeft":
      case "KeyA":
        this._goToRegion(this.activeRegionIndex - 1);
        break;

      case "ArrowRight":
      case "KeyD":
        this._goToRegion(this.activeRegionIndex + 1);
        break;
    }
  };

  private _cancelNavigating = () => {
    this._isNavigating = false;
  };

  private _handleWheel = (event: WheelEvent) => {
    if (!this._viewport) return;

    event.preventDefault();
    this._isNavigating = false;

    this._viewport.scrollBy({
      left: event.deltaY,
      behavior: "auto",
    });
  };

  private _handleScroll = () => {
    if (!this._viewport) return;

    const width = this._viewport.offsetWidth;
    const nextIndex = this._clampRegionIndex(
      Math.round(this._viewport.scrollLeft / width),
    );

    if (this._isNavigating) {
      if (nextIndex === this.activeRegionIndex) {
        this._isNavigating = false;
      }
      return;
    }

    if (nextIndex === this.activeRegionIndex) return;

    this.activeRegionIndex = nextIndex;
    this.isDetailOpen = false;
    this._syncHash(nextIndex, "replace");
  };

  private _handleNavRequest = (event: CustomEvent<{ index: number }>) => {
    this._scrollToRegion(event.detail.index);
  };

  private _toggleDetail = () => {
    this.isDetailOpen = !this.isDetailOpen;
  };

  private _hydrateFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const index = this.regions.findIndex((region) => region.id === hash);
    if (index === -1) return;

    this.activeRegionIndex = index;

    requestAnimationFrame(() => {
      this._scrollToRegion(index);
    });
  };

  static styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100dvh;
      background: #e7e7e7;
      overflow: hidden;

      /* interaction UX */
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;

      touch-action: pan-x;
    }

    .world-viewport,
    .region-section,
    .nav-left,
    .nav-right {
      touch-action: manipulation;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
    }

    img,
    svg {
      -webkit-user-drag: none;
      user-drag: none;
      pointer-events: none;
    }

    .world-viewport {
      touch-action: pan-x;
    }

    /* END interaction UX */

    .app-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .detail-region {
      position: absolute;
      top: var(--lums-top-nav-height);
      padding: 1rem;
      width: 100%;
      z-index: 10;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .detail-card {
      background: white;
      padding: 2rem;
      border-radius: 2px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      width: 60vw;
      max-width: 400px;
      height: 40vh;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: translateY(30px) scale(0.95);
      opacity: 0;
      pointer-events: none;
    }

    .detail-card.active {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: auto;
    }

    .world-viewport {
      flex: 2;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      align-items: flex-end;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
      overscroll-behavior-x: contain;
      position: relative;
      z-index: 1;
    }

    .world-viewport::-webkit-scrollbar {
      display: none;
    }

    .world-stage {
      display: flex;
      height: 100%;
      width: auto;
      position: relative;
    }

    .panorama-bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      min-height: 50%;
      z-index: 0;
      pointer-events: none;
      display: flex;
      align-items: flex-end;

      transition:
        transform var(--lums-transition-lg) cubic-bezier(0.22, 1, 0.36, 1),
        filter var(--lums-transition-sm) cubic-bezier(0.22, 1, 0.36, 1);

      will-change: transform;
    }

    .panorama-bg img {
      width: 100%;
      height: auto;
      display: block;
    }

    .region-section {
      width: 100vw;
      height: 100%;
      flex-shrink: 0;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      cursor: pointer;
      z-index: 2;
    }

    .environment-layer {
      position: absolute;
      bottom: 110px;
      width: 100%;
      height: calc(100% - 110px);
      display: flex;
      justify-content: center;
      align-items: flex-end;
      pointer-events: none;
      z-index: 2;
    }

    .svg-scene {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .svg-scene img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: bottom;
      display: block;
    }

    .ground-svg {
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100.5%;
      height: 140px;
      fill: var(--ground-color);
      z-index: 5;
      pointer-events: none;
    }

    .nav-left,
    .nav-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: transparent;
      user-select: none;
      filter: drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.12))
        drop-shadow(0px -6px 4px rgba(255, 255, 255, 0.18))
        drop-shadow(3px 0px 2px rgba(0, 0, 0, 0.06))
        drop-shadow(-3px 0px 2px rgba(255, 255, 255, 0.1));
    }

    .nav-left {
      left: 0;
    }

    .nav-right {
      right: 0;
    }

    .nav-left.disabled,
    .nav-right.disabled {
      pointer-events: none;
      opacity: 0.25;
    }

    .nav-left svg,
    .nav-right svg {
      width: 48px;
      height: 48px;
      stroke: #111;
    }
  `;

  render() {
    const active = this._activeRegion;
    const panoramaScale = this.isDetailOpen ? 1.02 : 1;
    const percent = (this.activeRegionIndex / (this.regions.length - 1)) * 100;

    return html`
      <div class="app-container">
        <top-nav
          .activeName=${active.name}
          .regions=${this.regions}
          @navigate-to=${this._handleNavRequest}
        ></top-nav>

        <div class="detail-region">
          <div class="detail-card ${this.isDetailOpen ? "active" : ""}">
            <h2>${active.name}</h2>
            <p>${active.desc}</p>
          </div>
        </div>

        <div class="world-viewport" @scroll=${this._handleScroll}>
          <div class="world-stage">
            <div
              class="panorama-bg"
              style=${`
                      transform-origin: ${percent}% center;
                      transform: scale(${panoramaScale});
                    `}
            >
              <img src=${this.worldSvg} alt="World Panorama" />
            </div>

            ${this.regions.map(
              () =>
                html`<div
                  class="region-section"
                  @click=${this._toggleDetail}
                ></div>`,
            )}
          </div>
        </div>

        <div class="nav-left" @click=${this._prevRegion}>
          ${this._caretSvg(false)}
        </div>
        <div class="nav-right" @click=${this._nextRegion}>
          ${this._caretSvg(true)}
        </div>
      </div>
    `;
  }

  private _caretSvg(flipped = false) {
    return html`
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M15 18l-6-6 6-6"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform=${flipped ? "rotate(180 12 12)" : ""}
        />
      </svg>
    `;
  }

  private _nextRegion = () => {
    this._scrollToRegion(this.activeRegionIndex + 1);
  };

  private _prevRegion = () => {
    this._scrollToRegion(this.activeRegionIndex - 1);
  };
}
