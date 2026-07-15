import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('drum-pad')
export class DrumPad extends LitElement {
	@property({ type: Number }) index = 0;
	@property({ type: Boolean }) active = false;
	@property({ type: String }) keyBinding = '';
	@property({ type: String }) sampleName = '';

	// Sequencer mode step state
	@property({ type: Boolean }) stepActive = false;
	@property({ type: Boolean }) stepSelected = false;
	@property({ type: Boolean }) stepPlaying = false;
	@property({ type: String }) displayLabel = '';

	static styles = css`
		:host {
			display: block;
		}

		.pad {
			width: 100%;
			aspect-ratio: 1;
			background: #3a3a3a;
			border: 2px solid transparent;
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

		/* Performance mode: pressed */
		.pad.active {
			background: #5a5a5a;
			box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
			transform: scale(0.95);
		}

		/* Sequencer mode: step is active (has a note) */
		.pad.step-active {
			background: #4d98b3;
			box-shadow: 0 0 6px rgba(77, 152, 179, 0.4);
		}

		/* Sequencer mode: step is selected for editing */
		.pad.step-selected {
			border-color: #fff;
			box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
		}

		/* Sequencer mode: playhead is on this step */
		.pad.step-playing {
			box-shadow: 0 0 14px rgba(255, 200, 50, 0.7);
			background: #e8a630;
		}

		/* step-active + step-playing */
		.pad.step-active.step-playing {
			background: #e87830;
			box-shadow: 0 0 14px rgba(232, 120, 48, 0.8);
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
		const classes = [
			'pad',
			this.active ? 'active' : '',
			this.stepActive ? 'step-active' : '',
			this.stepSelected ? 'step-selected' : '',
			this.stepPlaying ? 'step-playing' : '',
		].filter(Boolean).join(' ');

		const label = this.displayLabel || this.sampleName;

		return html`
			<sp-button
				class=${classes}
				@click=${this._handleClick}
			>
				<span class="key-binding">${this.keyBinding}</span>
				${label ? html`<span class="sample-name">${label}</span>` : ''}
			</sp-button>
		`;
	}

	private _handleClick = () => {
		this.dispatchEvent(
			new CustomEvent('pad-click', {
				bubbles: true,
				composed: true,
			})
		);
	};
}

declare global {
	interface HTMLElementTagNameMap {
		'drum-pad': DrumPad;
	}
}