import { LitElement, html, css, svg, nothing } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import { Router } from "@lit-labs/router";
import "./components/top-nav";
import "./components/audio-player";
import { getAudioBus, type AudioTrack } from "./audio/audio-bus";
import { releases } from "./lib/releases";
import { posts } from "./lib/blog";
import fntlps1Img from "./lib/assets/fntlps1.jpg";
import fntlps2Img from "./lib/assets/fntlps2.jpg";
import fntlps3Img from "./lib/assets/fntlps3.jpg";

const coverImages: Record<string, string> = {
	fntlps1: fntlps1Img,
	fntlps2: fntlps2Img,
	fntlps3: fntlps3Img,
};

interface Region {
	id: string;
	name: string;
	desc: string;
}

interface IcecastSource {
	server_name: string;
	server_description: string;
	content_type: string;
	listeners: number;
	listener_peak: number;
	genre: string;
	title?: string;
	listenurl: string;
}

interface IcecastStatus {
	admin: string;
	host: string;
	server_id: string;
	server_start_iso8601: string;
	source?: IcecastSource | IcecastSource[];
}

const NAV_KEYS = new Set(["Space", "ArrowLeft", "ArrowRight", "KeyA", "KeyD"]);

@customElement("finite-loops")
export class FiniteLoops extends LitElement {
	@state() private activeRegionIndex = 0;
	@state() private isDetailOpen = false;
	@state() private _icecastData: IcecastStatus | null = null;
	@state() private _audioPlaying = false;
	@state() private _audioTrack: AudioTrack | null = null;
	@state() private _isPlayerOpen = false;
	@state() private _overlayItemId: string | null = null;

	@query(".world-viewport") private _viewport!: HTMLElement;

	private _isNavigating = false;
	private _viewportReady = false;
	private _audioBus = getAudioBus();
	private _pollTimer: number | undefined;

	private _router = new Router(this, [
		{
			path: "/",
			enter: async () => {
				window.history.replaceState(null, "", "/city");
				await this._router.goto("/city");
				return false;
			},
		},
		{
			path: "/:regionId",
			enter: async (params) => {
				this._applyRoute(params.regionId!, null);
				return true;
			},
		},
		{
			path: "/:regionId/:itemId",
			enter: async (params) => {
				this._applyRoute(params.regionId!, params.itemId!);
				return true;
			},
		},
	]);

	private readonly regions: Region[] = [
		{
			id: "city",
			name: "The Overpass",
			desc: "",
		},
		{
			id: "record-shop",
			name: "Record Shop",
			desc: "",
		},
		{
			id: "broadcast",
			name: "Broadcast",
			desc: "Live streams and broadcasts.",
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

		this._audioBus.addEventListener("change", this._onAudioChange);

		this._fetchIcecastStatus();
		this._pollTimer = window.setInterval(
			() => this._fetchIcecastStatus(),
			30_000,
		);
	}
	disconnectedCallback() {
		super.disconnectedCallback();

		window.removeEventListener("keydown", this._handleKeyDown);

		document.removeEventListener("selectstart", this._preventSelection);
		document.removeEventListener("dragstart", this._preventSelection);

		this.removeEventListener("wheel", this._handleWheel);
		this._viewport?.removeEventListener("pointerdown", this._cancelNavigating);

		this._audioBus.removeEventListener("change", this._onAudioChange);
		window.clearInterval(this._pollTimer);
		this._audioBus.stop();
	}

	private _preventSelection = (event: Event) => {
		event.preventDefault();
	};

	firstUpdated() {
		this.addEventListener("wheel", this._handleWheel, { passive: false });
		this._viewport.addEventListener("pointerdown", this._cancelNavigating);
		this._viewportReady = true;

		// Scroll to the region the router matched on initial load (instant, no animation)
		requestAnimationFrame(() => {
			this._scrollViewportToRegion(this.activeRegionIndex, "instant");
		});
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

	private _applyRoute(regionId: string, itemId: string | null) {
		const index = this.regions.findIndex((r) => r.id === regionId);
		if (index === -1) {
			window.history.replaceState(null, "", "/city");
			this._router.goto("/city");
			return;
		}

		const regionChanged = this.activeRegionIndex !== index;
		this.activeRegionIndex = index;
		this._overlayItemId = itemId;
		if (itemId) this.isDetailOpen = false;

		if (regionChanged && this._viewportReady) {
			requestAnimationFrame(() => {
				this._scrollViewportToRegion(index, "smooth");
			});
		}
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
		const path = "/" + this.regions[clamped].id;
		if (window.location.pathname !== path) {
			window.history.pushState(null, "", path);
			this._router.goto(path);
		}
		this._scrollViewportToRegion(clamped, behavior);
	}

	private _handleKeyDown = (event: KeyboardEvent) => {
		if (event.code === "Escape" && this._overlayItemId) {
			event.preventDefault();
			this._closeOverlay();
			return;
		}

		if (NAV_KEYS.has(event.code)) {
			event.preventDefault();
		}

		switch (event.code) {
			case "Space":
				this._toggleDetail();
				break;

			case "ArrowLeft":
			case "KeyA":
				if (!this._overlayItemId) this._goToRegion(this.activeRegionIndex - 1);
				break;

			case "ArrowRight":
			case "KeyD":
				if (!this._overlayItemId) this._goToRegion(this.activeRegionIndex + 1);
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
		this._overlayItemId = null;

		const newPath = "/" + this.regions[nextIndex].id;
		if (window.location.pathname !== newPath) {
			window.history.replaceState(null, "", newPath);
		}
	};

	private _handleNavRequest = (event: CustomEvent<{ index: number }>) => {
		this._goToRegion(event.detail.index);
	};

	private _toggleDetail = () => {
		this.isDetailOpen = !this.isDetailOpen;
	};

	private async _fetchIcecastStatus() {
		try {
			const res = await fetch(
				"https://radio.finiteloops.net/status-json.xsl",
			);
			const json = await res.json();
			this._icecastData = json.icestats as IcecastStatus;
		} catch {
			// keep previous data on failure
		}
	}

	private _toggleRadio(url: string, title: string) {
		if (this._audioBus.playing && this._audioBus.track?.url === url) {
			this._audioBus.stop();
			return;
		}

		this._audioBus.play({
			id: 'radio',
			title,
			source: 'Radio',
			url,
			isStream: true,
		});
	}

	private _onAudioChange = () => {
		this._audioPlaying = this._audioBus.playing;
		this._audioTrack = this._audioBus.track;
		if (!this._audioBus.playing) {
			this._isPlayerOpen = false;
		}
	};

	private _handleLogoClick = () => {
		if (this._audioPlaying) {
			this._isPlayerOpen = !this._isPlayerOpen;
		}
	};

	private _closeOverlay = () => {
		const regionId = this.regions[this.activeRegionIndex].id;
		const path = "/" + regionId;
		this._overlayItemId = null;
		window.history.pushState(null, "", path);
		this._router.goto(path);
	};

	private _handleTogglePlayback = () => {
		this._audioBus.togglePause();
	};

	private _handleStopPlayback = () => {
		this._audioBus.stop();
	};

	private _formatUptime(iso: string): string {
		const diff = Date.now() - new Date(iso).getTime();
		const hours = Math.floor(diff / 3_600_000);
		const mins = Math.floor((diff % 3_600_000) / 60_000);
		if (hours > 0) return `${hours}h ${mins}m`;
		return `${mins}m`;
	}

	private _getSources(): IcecastSource[] {
		if (!this._icecastData?.source) return [];
		return Array.isArray(this._icecastData.source)
			? this._icecastData.source
			: [this._icecastData.source];
	}

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

			case "broadcast": {
				const isLive = this._getSources().length > 0;
				return svg`
					<line x1="0" y1="320" x2="800" y2="320"
						stroke="#555" stroke-width="2" />
					<g class="scene-object"
						@click=${this._toggleDetail}>
						<!-- station building -->
						<rect x="320" y="240" width="160" height="80"
							fill="#444" rx="2" />
						<rect x="330" y="250" width="30" height="20"
							fill="#222" rx="1" />
						<rect x="370" y="250" width="30" height="20"
							fill="#222" rx="1" />
						<!-- door -->
						<rect x="385" y="285" width="30" height="35"
							fill="#222" rx="1" />
						<!-- antenna mast -->
						<line x1="400" y1="240" x2="400" y2="60"
							stroke="#666" stroke-width="4" />
						<!-- cross-bars -->
						<line x1="388" y1="200" x2="412" y2="200"
							stroke="#666" stroke-width="2" />
						<line x1="391" y1="160" x2="409" y2="160"
							stroke="#666" stroke-width="2" />
						<line x1="394" y1="120" x2="406" y2="120"
							stroke="#666" stroke-width="2" />
						<!-- antenna tip -->
						<polygon points="396,60 404,60 400,48"
							fill="#888" />
						<!-- signal arcs -->
						<path class="signal-arc ${isLive ? 'live' : ''}"
							d="M 416,48 A 20,20 0 0,1 416,28"
							fill="none" stroke="#00e5ff" stroke-width="2"
							opacity="0.6" />
						<path class="signal-arc ${isLive ? 'live' : ''}"
							d="M 424,52 A 32,32 0 0,1 424,20"
							fill="none" stroke="#00e5ff" stroke-width="2"
							opacity="0.4" />
						<path class="signal-arc ${isLive ? 'live' : ''}"
							d="M 432,56 A 44,44 0 0,1 432,12"
							fill="none" stroke="#00e5ff" stroke-width="2"
							opacity="0.2" />
					</g>
				`;
			}

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
			inset: 0;
			top: var(--lums-top-nav-height);
			z-index: 10;
			pointer-events: none;
			display: flex;
			align-items: flex-start;
			justify-content: center;
			padding: 1rem;
			background: rgba(0, 0, 0, 0);
			transition: background 0.3s ease;
		}

		.detail-region.open {
			pointer-events: auto;
			background: rgba(0, 0, 0, 0.5);
		}

		.detail-card {
			background: #0a0a0a;
			border: 2px solid #2a2a2a;
			padding: 0;
			width: 90vw;
			max-width: 600px;
			max-height: 75vh;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
			transform: translateY(30px) scale(0.95);
			opacity: 0;
			pointer-events: none;
			position: relative;
			font-family: 'Courier New', monospace;
			color: #e0e0e0;
		}

		.detail-card.active {
			transform: translateY(0) scale(1);
			opacity: 1;
			pointer-events: auto;
		}

		.detail-close {
			position: absolute;
			top: 8px;
			right: 12px;
			background: none;
			border: none;
			color: #888;
			font-size: 1.5rem;
			cursor: pointer;
			z-index: 2;
			line-height: 1;
			font-family: inherit;
		}

		.detail-close:hover {
			color: #00e5ff;
		}

		.detail-content {
			overflow-y: auto;
			padding: 1.5rem;
			scrollbar-width: thin;
			scrollbar-color: #333 transparent;
		}

		/* --- Scene shared --- */

		.scene-header {
			margin-bottom: 1.25rem;
			border-bottom: 3px solid #2a2a2a;
			padding-bottom: 0.75rem;
		}

		.scene-header h2 {
			font-size: 1.4rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin: 0;
			font-family: inherit;
			font-weight: 700;
		}

		.scene-sub {
			font-size: 0.75rem;
			color: #888;
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}

		.scene-body {
			font-size: 0.85rem;
			color: #aaa;
			line-height: 1.6;
			margin: 1rem 0;
		}

		/* --- Record Shop --- */

		.release-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 12px;
			margin-bottom: 1rem;
		}

		.release-card {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 10px;
			cursor: pointer;
			text-align: center;
			transition: border-color 0.15s;
			font-family: inherit;
			color: inherit;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 6px;
		}

		.release-card:hover {
			border-color: #00e5ff;
		}

		.release-cover {
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
		}


		.release-title {
			font-size: 0.8rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.release-meta {
			font-size: 0.7rem;
			color: #666;
		}

		.track-list {
			margin-bottom: 0.75rem;
		}

		.track-row {
			display: flex;
			gap: 10px;
			padding: 4px 0;
			font-size: 0.8rem;
			border-bottom: 1px solid #1a1a1a;
		}

		.track-num {
			color: #555;
			min-width: 20px;
		}

		.track-name {
			flex: 1;
		}

		.track-dur {
			color: #666;
		}

		.release-contributors {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
			margin-bottom: 0.75rem;
		}

		.contrib-tag {
			font-size: 0.65rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			padding: 2px 6px;
			border: 1px solid #00e5ff;
			color: #00e5ff;
		}

		.bandcamp-link {
			display: inline-block;
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			color: #00e5ff;
			text-decoration: none;
			border-bottom: 1px solid currentColor;
		}

		.bandcamp-link:hover {
			color: #b5ff00;
		}

		/* --- Overpass (City) --- */

		.member-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 10px;
			margin: 1rem 0;
		}

		.member-card {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;
		}

		.member-initial {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			background: #1a1a1a;
			border: 1px solid #00e5ff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.9rem;
			font-weight: 700;
			color: #00e5ff;
		}

		.member-name {
			font-size: 0.8rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			font-weight: 700;
		}

		.member-meta {
			font-size: 0.65rem;
			color: #666;
		}

		.stats-row {
			display: flex;
			justify-content: space-around;
			margin-top: 1rem;
			padding-top: 1rem;
			border-top: 1px solid #2a2a2a;
		}

		.stat {
			text-align: center;
			display: flex;
			flex-direction: column;
			gap: 2px;
		}

		.stat-num {
			font-size: 1.5rem;
			font-weight: 700;
			color: #00e5ff;
		}

		.stat-label {
			font-size: 0.65rem;
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: #666;
		}

		/* --- Artifacts --- */

		.artifact-grid {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.artifact-card {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 14px;
			display: flex;
			flex-direction: column;
			gap: 4px;
			transition: border-color 0.15s;
			color: inherit;
			text-decoration: none;
		}

		.artifact-card:hover {
			border-color: #00e5ff;
		}

		.artifact-icon {
			width: 28px;
			height: 28px;
			color: #00e5ff;
		}

		.artifact-icon svg {
			width: 100%;
			height: 100%;
		}

		.artifact-card h4 {
			font-size: 0.9rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			margin: 0;
			font-family: inherit;
			font-weight: 700;
		}

		.artifact-card p {
			font-size: 0.75rem;
			color: #888;
			margin: 0;
			line-height: 1.5;
		}

		/* --- Board --- */

		.post-stack {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}

		.post-card {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 14px;
			border-left: 3px solid #ff2d7b;
			transition: border-color 0.15s;
			text-decoration: none;
			color: inherit;
			display: block;
		}

		.post-card:hover {
			border-color: #00e5ff;
			border-left-color: #00e5ff;
		}

		.post-date {
			font-size: 0.65rem;
			color: #555;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.post-title {
			font-size: 0.9rem;
			font-weight: 700;
			text-transform: uppercase;
			margin: 4px 0;
			font-family: inherit;
		}

		.post-excerpt {
			font-size: 0.75rem;
			color: #888;
			margin: 0;
			line-height: 1.5;
		}

		.post-author {
			display: block;
			font-size: 0.65rem;
			color: #555;
			margin-top: 6px;
		}

		/* --- Broadcast --- */

		.radio-status {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 1rem;
			font-size: 0.8rem;
		}

		.status-dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: #555;
		}

		.status-dot.live {
			background: #0f0;
			animation: livePulse 1.5s ease-in-out infinite;
		}

		.status-dot.offline {
			background: #555;
		}

		@keyframes livePulse {
			0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.4); }
			50% { box-shadow: 0 0 0 6px rgba(0, 255, 0, 0); }
		}

		.status-text {
			text-transform: uppercase;
			letter-spacing: 0.1em;
			font-weight: 700;
		}

		.status-uptime {
			color: #666;
			font-size: 0.7rem;
			margin-left: auto;
		}

		.stream-card {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 14px;
			margin-bottom: 10px;
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		.stream-card-header {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.stream-mount {
			font-size: 0.9rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		.stream-type {
			font-size: 0.65rem;
			color: #666;
			text-transform: uppercase;
		}

		.stream-track {
			font-size: 0.8rem;
			color: #00e5ff;
		}

		.stream-listeners {
			font-size: 0.75rem;
			color: #888;
		}

		.radio-play-btn {
			background: none;
			border: 1px solid #00e5ff;
			color: #00e5ff;
			font-family: inherit;
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			padding: 6px 16px;
			cursor: pointer;
			align-self: flex-start;
			transition: background 0.15s, color 0.15s;
		}

		.radio-play-btn:hover {
			background: #00e5ff;
			color: #0a0a0a;
		}

		.stream-url {
			font-family: 'Courier New', monospace;
			font-size: 0.65rem;
			color: #555;
			word-break: break-all;
			user-select: text;
			-webkit-user-select: text;
		}

		.no-streams {
			font-size: 0.8rem;
			color: #666;
			margin: 0;
		}

		.server-info {
			margin-top: 1rem;
			padding-top: 0.75rem;
			border-top: 1px solid #2a2a2a;
			font-size: 0.65rem;
			color: #444;
		}

		.signal-arc {
			opacity: 0.15;
		}

		.signal-arc.live {
			animation: radioSignal 2s ease-in-out infinite;
		}

		@keyframes radioSignal {
			0%, 100% { opacity: 0.1; }
			50% { opacity: 0.7; }
		}

		/* --- Soundwall --- */

		.now-playing {
			background: #111;
			border: 1px solid #2a2a2a;
			padding: 14px;
			margin-bottom: 1rem;
		}

		.np-label {
			font-size: 0.65rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: #b5ff00;
		}

		.np-release h3 {
			font-size: 1.1rem;
			text-transform: uppercase;
			letter-spacing: 0.05em;
			margin: 4px 0 2px;
			font-family: inherit;
			font-weight: 700;
		}

		.np-meta {
			font-size: 0.7rem;
			color: #666;
		}

		.eq-bars {
			display: flex;
			align-items: flex-end;
			gap: 3px;
			height: 40px;
			margin-bottom: 1rem;
		}

		.eq-bar {
			flex: 1;
			background: #00e5ff;
			animation: eqBounce 0.8s ease-in-out infinite alternate;
			animation-delay: calc(var(--i) * 0.05s);
			min-height: 4px;
		}

		@keyframes eqBounce {
			0% { height: 15%; opacity: 0.4; }
			100% { height: 100%; opacity: 1; }
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
			transform-origin: center 80%;
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

		/* --- Full-width overlay (sub-routes) --- */

		.overlay-region {
			position: absolute;
			inset: 0;
			top: var(--lums-top-nav-height);
			z-index: 15;
			display: flex;
			align-items: stretch;
			justify-content: center;
			background: rgba(0, 0, 0, 0.85);
			animation: overlayFadeIn 0.3s ease;
		}

		@keyframes overlayFadeIn {
			from { opacity: 0; }
			to { opacity: 1; }
		}

		.overlay-panel {
			width: 100%;
			max-width: 800px;
			display: flex;
			flex-direction: column;
			position: relative;
			background: #0a0a0a;
			border-left: 1px solid #2a2a2a;
			border-right: 1px solid #2a2a2a;
			font-family: 'Courier New', monospace;
			color: #e0e0e0;
		}

		.overlay-close {
			position: absolute;
			top: 12px;
			right: 16px;
			background: none;
			border: none;
			color: #888;
			font-size: 1.5rem;
			cursor: pointer;
			z-index: 2;
			line-height: 1;
			font-family: inherit;
		}

		.overlay-close:hover {
			color: #00e5ff;
		}

		.overlay-scroll {
			overflow-y: auto;
			padding: 1.5rem;
			flex: 1;
			scrollbar-width: thin;
			scrollbar-color: #333 transparent;
		}

		.overlay-cover {
			width: 100%;
			max-width: 300px;
			aspect-ratio: 1;
			object-fit: cover;
			margin-bottom: 1rem;
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
			transition: opacity 0.3s ease;
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

		.nav-left.hidden,
		.nav-right.hidden {
			opacity: 0;
			pointer-events: none;
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
					.audioPlaying=${this._audioPlaying}
					@navigate-to=${this._handleNavRequest}
					@logo-click=${this._handleLogoClick}
				></top-nav>

				<audio-player
					.open=${this._isPlayerOpen}
					.trackTitle=${this._audioTrack?.title ?? ''}
					.trackSource=${this._audioTrack?.source ?? ''}
					.playing=${this._audioPlaying}
					@toggle-playback=${this._handleTogglePlayback}
					@stop-playback=${this._handleStopPlayback}
				></audio-player>

				<div class="detail-region ${this.isDetailOpen && !this._overlayItemId ? 'open' : ''}" @click=${this._toggleDetail}>
					<div class="detail-card ${this.isDetailOpen && !this._overlayItemId ? 'active' : ''}" @click=${(e: Event) => e.stopPropagation()}>
						<button class="detail-close" @click=${this._toggleDetail}>&times;</button>
						<div class="detail-content">
							${this._renderDetailContent(active.id)}
						</div>
					</div>
				</div>

				${this._overlayItemId
					? html`
						<div class="overlay-region" @click=${this._closeOverlay}>
							<div class="overlay-panel" @click=${(e: Event) => e.stopPropagation()}>
								<button class="overlay-close" @click=${this._closeOverlay}>&times;</button>
								<div class="overlay-scroll">
									${this._renderOverlayContent(active.id, this._overlayItemId)}
								</div>
							</div>
						</div>
					`
					: nothing}

				<div class="world-viewport" @scroll=${this._handleScroll}>
					${this.regions.map(
						(region, i) => html`
							<div class="region-section">
								<div
									class="region-scene ${this.isDetailOpen && !this._overlayItemId && i === this.activeRegionIndex ? 'zoomed' : ''}"
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

				<div class="nav-left ${this._overlayItemId ? 'hidden' : ''} ${this.activeRegionIndex === 0 ? 'disabled' : ''}" @click=${this._prevRegion}>
					${this._caretSvg(false)}
				</div>
				<div class="nav-right ${this._overlayItemId ? 'hidden' : ''} ${this.activeRegionIndex === this.regions.length - 1 ? 'disabled' : ''}" @click=${this._nextRegion}>
					${this._caretSvg(true)}
				</div>
			</div>
		`;
	}

	private _renderDetailContent(id: string) {
		switch (id) {
			case "record-shop":
				return html`
					<div class="scene-header">
						<h2>Record Shop</h2>
					</div>
					<div class="release-grid">
						${releases.map(
							(r) => html`
								<a class="release-card" href=${"/record-shop/" + r.slug}>
									<img class="release-cover" src=${coverImages[r.slug]} alt=${r.title} />
									<span class="release-title">${r.title}</span>
									<span class="release-meta">${r.tracks.length} tracks</span>
								</a>
							`,
						)}
					</div>
				`;

			case "broadcast": {
				const sources = this._getSources();
				const isLive = sources.length > 0;
				const uptime = this._icecastData?.server_start_iso8601
					? this._formatUptime(this._icecastData.server_start_iso8601)
					: null;

				return html`
					<div class="scene-header">
						<h2>Broadcast</h2>
						<span class="scene-sub">finite loops radio</span>
					</div>

					<div class="radio-status">
						<span class="status-dot ${isLive ? 'live' : 'offline'}"></span>
						<span class="status-text">${isLive ? "LIVE" : "OFFLINE"}</span>
						${uptime
							? html`<span class="status-uptime">up ${uptime}</span>`
							: nothing}
					</div>

					${isLive
						? html`
								${sources.map(
									(s) => html`
										<div class="stream-card">
											<div class="stream-card-header">
												<span class="stream-mount">${s.server_name || "stream"}</span>
												<span class="stream-type">${s.content_type}</span>
											</div>
											${s.title
												? html`<div class="stream-track">Now: ${s.title}</div>`
												: nothing}
											<div class="stream-listeners">
												${s.listeners} listener${s.listeners !== 1 ? "s" : ""}
												(peak: ${s.listener_peak})
											</div>
											<button
												class="radio-play-btn"
												@click=${() => this._toggleRadio(s.listenurl, s.server_name || 'stream')}
											>
												${this._audioTrack?.url === s.listenurl ? 'STOP' : 'PLAY'}
											</button>
											<div class="stream-url">${s.listenurl}</div>
										</div>
									`,
								)}
							`
						: html`
								<div class="stream-card">
									<p class="no-streams">No active streams</p>
								</div>
							`}

					${this._icecastData
						? html`
								<div class="server-info">
									<span>${this._icecastData.server_id}</span>
								</div>
							`
						: nothing}
				`;
			}

			case "city":
				return html`
					<div class="scene-header">
						<h2>The Overpass</h2>
						<span class="scene-sub">coming soon...</span>
					</div>
				`;

			case "ancient-relic":
				return html`
					<div class="scene-header">
						<h2>Artifacts</h2>
						<span class="scene-sub">tools from the workshop</span>
					</div>
					<div class="artifact-grid">
						<a class="artifact-card" href="/ancient-relic/sp-404">
							<div class="artifact-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="3" y="3" width="18" height="18" rx="2"/>
									<rect x="6" y="6" width="5" height="5"/>
									<rect x="13" y="6" width="5" height="5"/>
									<rect x="6" y="13" width="5" height="5"/>
									<rect x="13" y="13" width="5" height="5"/>
								</svg>
							</div>
							<h4>SP-404</h4>
							<p>16-pad beat machine. keyboard + MIDI input. load samples, sequence patterns, perform live.</p>
						</a>
						<a class="artifact-card" href="/ancient-relic/stems">
							<div class="artifact-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M9 18V5l12-2v13"/>
									<circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
								</svg>
							</div>
							<h4>Stems</h4>
							<p>split any track into isolated stems. vocals, drums, bass, other. drag and drop.</p>
						</a>
						<a class="artifact-card" href="/ancient-relic/sample-library">
							<div class="artifact-icon">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
									<path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
								</svg>
							</div>
							<h4>Sample Library</h4>
							<p>curated drum kits and one-shots. zildjian, sabian, paiste, vintage customs.</p>
						</a>
					</div>
				`;

			case "board":
				return html`
					<div class="scene-header">
						<h2>The Board</h2>
						<span class="scene-sub">community news & dispatches</span>
					</div>
					<div class="post-stack">
						${posts.map(
							(p) => html`
								<a class="post-card" href=${"/board/" + p.slug}>
									<span class="post-date">${p.date}</span>
									<h4 class="post-title">${p.title}</h4>
									<p class="post-excerpt">${p.excerpt}</p>
									<span class="post-author">-- ${p.author}</span>
								</a>
							`,
						)}
					</div>
				`;

			case "soundsystem":
				return html`
					<div class="scene-header">
						<h2>The Soundwall</h2>
						<span class="scene-sub">live audio & collective frequency</span>
					</div>
					<div class="now-playing">
						<span class="np-label">latest drop</span>
						<div class="np-release">
							<h3>${releases[0].title}</h3>
							<span class="np-meta">${releases[0].tracks.length} tracks // ${releases[0].release_date}</span>
						</div>
					</div>
					<div class="eq-bars" aria-hidden="true">
						${Array.from({ length: 16 }, (_, i) => html`<div class="eq-bar" style="--i:${i}"></div>`)}
					</div>
				`;

			default:
				return html`<p>${this._activeRegion.desc}</p>`;
		}
	}

	private _renderOverlayContent(regionId: string, itemId: string) {
		switch (regionId) {
			case "record-shop": {
				const release = releases.find((r) => r.slug === itemId);
				if (!release)
					return html`<p>Release not found.</p>`;
				return html`
					<div class="scene-header">
						<h2>${release.title}</h2>
						<span class="scene-sub">${release.release_date}</span>
					</div>
					<img class="overlay-cover" src=${coverImages[release.slug]} alt=${release.title} />
					<div class="track-list">
						${release.tracks.map(
							(t, i) => html`
								<div class="track-row">
									<span class="track-num">${String(i + 1).padStart(2, "0")}</span>
									<span class="track-name">${t.title}</span>
									<span class="track-dur">${t.duration}</span>
								</div>
							`,
						)}
					</div>
					<div class="release-contributors">
						${release.contributors.map(
							(c) => html`<span class="contrib-tag">${c}</span>`,
						)}
					</div>
					<a
						class="bandcamp-link"
						href=${release.bandcampUrl}
						target="_blank"
						rel="noopener"
					>listen on bandcamp</a>
				`;
			}

			case "board": {
				const post = posts.find((p) => p.slug === itemId);
				if (!post)
					return html`<p>Post not found.</p>`;
				return html`
					<div class="scene-header">
						<h2>${post.title}</h2>
						<span class="scene-sub">${post.date} // ${post.author}</span>
					</div>
					<div class="scene-body">
						<p>${post.excerpt}</p>
					</div>
				`;
			}

			case "ancient-relic":
				return html`
					<div class="scene-header">
						<h2>Artifacts</h2>
						<span class="scene-sub">${itemId}</span>
					</div>
					<div class="scene-body">
						<p>Loading artifact...</p>
					</div>
				`;

			default:
				return html`<p>${this._activeRegion.desc}</p>`;
		}
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
		this._goToRegion(this.activeRegionIndex + 1);
	};

	private _prevRegion = () => {
		this._goToRegion(this.activeRegionIndex - 1);
	};
}
