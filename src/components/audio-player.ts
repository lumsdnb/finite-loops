import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('audio-player')
export class AudioPlayer extends LitElement {
	@property({ type: Boolean }) open = false;
	@property({ type: String }) trackTitle = '';
	@property({ type: String }) trackSource = '';
	@property({ type: Boolean }) playing = false;

	static styles = css`
		:host {
			position: absolute;
			top: var(--lums-top-nav-height);
			left: 0;
			right: 0;
			z-index: 50;
			pointer-events: none;
		}

		.player-bar {
			height: 40px;
			background: #0a0a0a;
			border-bottom: 1px solid #2a2a2a;
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 0 1rem;
			font-family: 'Courier New', monospace;
			font-size: 0.75rem;
			color: #e0e0e0;
			transform: translateY(-100%);
			transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
			pointer-events: none;
		}

		.player-bar.open {
			transform: translateY(0);
			pointer-events: auto;
		}

		.source-tag {
			font-size: 0.6rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			padding: 2px 6px;
			border: 1px solid #00e5ff;
			color: #00e5ff;
			flex-shrink: 0;
		}

		.track-title {
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #aaa;
		}

		.controls {
			display: flex;
			gap: 4px;
			flex-shrink: 0;
		}

		.ctrl-btn {
			width: 28px;
			height: 28px;
			background: none;
			border: 1px solid #333;
			color: #e0e0e0;
			font-family: inherit;
			font-size: 0.8rem;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			transition: border-color 0.15s;
		}

		.ctrl-btn:hover {
			border-color: #00e5ff;
			color: #00e5ff;
		}
	`;

	render() {
		return html`
			<div class="player-bar ${this.open ? 'open' : ''}">
				<span class="source-tag">${this.trackSource}</span>
				<span class="track-title">${this.trackTitle}</span>
				<div class="controls">
					<button
						class="ctrl-btn"
						@click=${this._togglePlayback}
						title=${this.playing ? 'Pause' : 'Play'}
					>
						${this.playing ? '||' : '\u25B6'}
					</button>
					<button
						class="ctrl-btn"
						@click=${this._stopPlayback}
						title="Stop"
					>
						\u25A0
					</button>
				</div>
			</div>
		`;
	}

	private _togglePlayback = () => {
		this.dispatchEvent(
			new CustomEvent('toggle-playback', { bubbles: true, composed: true }),
		);
	};

	private _stopPlayback = () => {
		this.dispatchEvent(
			new CustomEvent('stop-playback', { bubbles: true, composed: true }),
		);
	};
}
