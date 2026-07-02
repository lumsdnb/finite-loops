import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import "./components/top-nav";

interface Region {
	id: string;
	name: string;
	desc: string;
}

const NAV_KEYS = new Set(["Space", "ArrowLeft", "ArrowRight", "KeyA", "KeyD"]);

@customElement("finite-loops")
export class FiniteLoops extends LitElement {
	@state() private activeRegionIndex = 0;
	@state() private isDetailOpen = false;

	@query(".world-viewport") private _viewport!: HTMLElement;

	private _isNavigating = false;

	private readonly regions: Region[] = [
		{
			id: "city",
			name: "The Overpass",
			desc: "Where the high-rises meet the highway bridge.",
		},
		{
			id: "record-shop",
			name: "Record Shop",
			desc: "A small corner alley placeholder.",
		},
		{
			id: "ancient-relic",
			name: "Artifacts",
			desc: "Various relics and tools from the past.",
		},
		{
			id: "board",
			name: "The Board",
			desc: "Artist blog posts, newspaper stands, and community news.",
		},
		{
			id: "soundsystem",
			name: "The Soundwall",
			desc: "Live audio events. Collective voting on the bass boost active.",
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

	private _renderRegionScene(id: string) {
		switch (id) {
			case "city":
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- left pillar -->
						<rect x="250" y="220" width="30" height="100"
							fill="#666" />
						<!-- right pillar -->
						<rect x="520" y="220" width="30" height="100"
							fill="#666" />
						<!-- beam -->
						<rect x="240" y="200" width="320" height="30"
							fill="#888" />
					</g>
				`;

			case "record-shop":
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- outer ring -->
						<circle cx="400" cy="200" r="80"
							fill="#222" />
						<!-- groove lines -->
						<circle cx="400" cy="200" r="60"
							fill="none" stroke="#333" stroke-width="1" />
						<circle cx="400" cy="200" r="40"
							fill="none" stroke="#333" stroke-width="1" />
						<!-- label -->
						<circle cx="400" cy="200" r="20"
							fill="#c44" />
						<!-- spindle hole -->
						<circle cx="400" cy="200" r="4"
							fill="#222" />
					</g>
				`;

			case "ancient-relic":
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- obelisk / monolith -->
						<polygon points="380,80 420,80 425,320 375,320"
							fill="#777" />
						<!-- top cap -->
						<polygon points="375,80 425,80 410,50 390,50"
							fill="#999" />
					</g>
				`;

			case "board":
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- pole -->
						<rect x="395" y="200" width="10" height="120"
							fill="#8B7355" />
						<!-- sign board -->
						<rect x="340" y="130" width="120" height="80"
							rx="4" fill="#C4A35A" />
						<!-- text lines -->
						<line x1="360" y1="155" x2="440" y2="155"
							stroke="#6B5B3A" stroke-width="3" />
						<line x1="360" y1="175" x2="430" y2="175"
							stroke="#6B5B3A" stroke-width="3" />
						<line x1="360" y1="195" x2="415" y2="195"
							stroke="#6B5B3A" stroke-width="3" />
					</g>
				`;

			case "soundsystem":
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- bottom speaker -->
						<rect x="350" y="240" width="100" height="80"
							fill="#333" rx="4" />
						<circle cx="400" cy="280" r="25"
							fill="#222" stroke="#444" stroke-width="2" />
						<!-- middle speaker -->
						<rect x="350" y="155" width="100" height="80"
							fill="#333" rx="4" />
						<circle cx="400" cy="195" r="25"
							fill="#222" stroke="#444" stroke-width="2" />
						<!-- top speaker -->
						<rect x="360" y="80" width="80" height="70"
							fill="#333" rx="4" />
						<circle cx="400" cy="115" r="20"
							fill="#222" stroke="#444" stroke-width="2" />
					</g>
				`;

			default:
				return nothing;
		}
	}

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
			scroll-snap-type: x mandatory;
			scrollbar-width: none;
			-ms-overflow-style: none;
			scroll-behavior: smooth;
			overscroll-behavior-x: contain;
			z-index: 1;
		}

		.world-viewport::-webkit-scrollbar {
			display: none;
		}

		.region-section {
			width: 100vw;
			height: 100%;
			flex-shrink: 0;
			scroll-snap-align: start;
			scroll-snap-stop: always;
			display: flex;
			cursor: pointer;
		}

		.region-scene {
			width: 100%;
			height: 100%;
			display: flex;
			transition: transform var(--lums-transition-lg, 0.6s)
				cubic-bezier(0.22, 1, 0.36, 1);
			will-change: transform;
		}

		.region-scene.zoomed {
			transform: scale(1.05);
		}

		.region-scene svg {
			width: 100%;
			height: 100%;
			pointer-events: none;
		}

		.scene-object {
			cursor: pointer;
			pointer-events: auto;
			transition: filter 0.2s ease;
		}

		.scene-object:hover {
			filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3));
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
					${this.regions.map(
						(region, i) => html`
							<div class="region-section">
								<div
									class="region-scene ${this.isDetailOpen && i === this.activeRegionIndex ? 'zoomed' : ''}"
								>
									<svg
										viewBox="0 0 800 400"
										preserveAspectRatio="xMidYMax meet"
										xmlns="http://www.w3.org/2000/svg"
									>
										${this._renderRegionScene(region.id)}
									</svg>
								</div>
							</div>
						`,
					)}
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
