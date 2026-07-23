import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './sp-button';
import './sp-knob';
import './sample-waveform';

@customElement('control-panel')
export class ControlPanel extends LitElement {
	@property({ type: Number }) currentPadIndex = -1;
	@property({ type: String }) currentSampleName = '';
	@property({ type: Number }) bpm = 120;
	@property({ type: String }) mode: 'performance' | 'sequencer' = 'performance';

	// Transport state (set by parent)
	@property({ type: Boolean }) playing = false;
	@property({ type: Boolean }) recording = false;

	// Knob values (set by parent, updated on change)
	@property({ type: Number }) swing = 0;
	@property({ type: Number }) patternLength = 16;
	@property({ type: Number }) stepVelocity = 100;
	@property({ type: Number }) stepPitch = 1.0;

	// Sequencer display info
	@property({ type: String }) selectedSampleName = '';

	// Tap tempo state
	@state() private tapTimes: number[] = [];

	static styles = css`
		:host {
			display: block;
			width: 100%;
			height: 100%;
			min-width: 0;
			color: #fff;
		}

		/* --- SECTIONS --- */
		.section-display,
		.section-transport {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
		}

		/* --- MAIN SECTION (waveform + FX) --- */
		.main {
			display: grid;
			grid-template-columns: auto 1fr auto;
			gap: 0.75rem;
			align-items: center;
			background: #2a2a2a;
			padding: 0.75rem;
			border-radius: 20px;
		}

		.fx-col {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.fx-button {
			width: 64px;
			height: 36px;
			font-size: 0.75rem;
		}

		.screen {
			background: #111;
			border-radius: 16px;
			padding: 0.5rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 0;
			gap: 0.25rem;
		}

		.sample-name {
			font-size: 0.8rem;
			text-align: center;
			word-break: break-word;
		}

		sample-waveform {
			width: 100%;
			height: 40px;
		}

		/* --- KNOBS --- */
		.knobs {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;
			background: #1a1a1a;
			padding: 0.5rem;
			border-radius: 16px;
		}

		/* --- TRANSPORT --- */
		.transport {
			display: flex;
			gap: 0.5rem;
			justify-content: center;
			background: #2a2a2a;
			padding: 0.75rem;
			border-radius: 16px;
		}

		.transport sp-button {
			min-width: 60px;
			height: 40px;
			font-size: 0.75rem;
		}

		/* --- CONTROLS ROW --- */
		.controls-row {
			display: flex;
			flex-wrap: wrap;
			gap: 0.4rem;
			justify-content: center;
			background: #2a2a2a;
			border-radius: 16px;
			padding: 0.5rem;
		}

		.controls-row sp-button {
			font-size: 0.7rem;
			min-width: 52px;
		}

		.tap-tempo {
			width: 56px;
			height: 56px;
			border-radius: 50%;
		}

		/* --- PATTERN INFO --- */
		.pattern-info {
			background: #1a1a1a;
			border-radius: 12px;
			padding: 0.5rem 0.75rem;
			font-size: 0.75rem;
			color: #aaa;
			text-align: center;
		}

		/* --- DESKTOP --- */
		@media (min-width: 1024px) {
			.main {
				grid-template-columns: 80px 1fr 80px;
				padding: 1rem;
			}

			.fx-button {
				width: 80px;
				height: 40px;
			}

			.knobs {
				justify-content: center;
				gap: 1rem;
			}

			.transport sp-button {
				min-width: 72px;
				height: 44px;
			}
		}
	`;

	private _formatPercent = (v: number) => `${v}%`;
	private _formatSteps = (v: number) => String(v);
	private _formatPitch = (v: number) => `${v.toFixed(1)}x`;

	render() {
		return html`
			<!-- SECTION 1: Display + Knobs -->
			<div class="section-display">
				<div class="main">
					<div class="fx-col">
						<sp-button class="fx-button">FX1</sp-button>
						<sp-button class="fx-button">FX2</sp-button>
						<sp-button class="fx-button">FX3</sp-button>
					</div>

					<div class="screen">
						${this.currentSampleName
							? html`
								<div class="sample-name">${this.currentSampleName}</div>
								<sample-waveform
									.sampleUrl=${`/samples/${this.currentSampleName}.wav`}
									data-sample-index=${this.currentPadIndex}
								></sample-waveform>
							`
							: html`<div class="sample-name">No sample</div>`}
					</div>

					<div class="fx-col">
						<sp-button class="fx-button">FX4</sp-button>
						<sp-button class="fx-button">FX5</sp-button>
						<sp-button class="fx-button">FX6</sp-button>
					</div>
				</div>

				<div class="knobs">
					<sp-knob
						label="SWING"
						.value=${this.swing}
						.min=${0}
						.max=${100}
						.step=${1}
						.formatValue=${this._formatPercent}
						@knob-change=${this._onSwingChange}
					></sp-knob>
					<sp-knob
						label="LENGTH"
						.value=${this.patternLength}
						.min=${1}
						.max=${16}
						.step=${1}
						.formatValue=${this._formatSteps}
						@knob-change=${this._onLengthChange}
					></sp-knob>
					<sp-knob
						label="VOL"
						.value=${this.stepVelocity}
						.min=${0}
						.max=${100}
						.step=${1}
						.formatValue=${this._formatPercent}
						@knob-change=${this._onVolChange}
					></sp-knob>
					<sp-knob
						label="PITCH"
						.value=${this.stepPitch}
						.min=${0.5}
						.max=${2.0}
						.step=${0.1}
						.formatValue=${this._formatPitch}
						@knob-change=${this._onPitchChange}
					></sp-knob>
				</div>
			</div>

			<!-- SECTION 2: Transport + Controls -->
			<div class="section-transport">
				<div class="transport">
					<sp-button
						.active=${this.playing}
						highlight="rgba(80, 200, 120, 0.7)"
						@click=${this._onPlay}
					>PLAY</sp-button>
					<sp-button
						@click=${this._onStop}
					>STOP</sp-button>
					<sp-button
						.active=${this.recording}
						highlight="rgba(255, 60, 60, 0.8)"
						@click=${this._onRec}
					>REC</sp-button>
				</div>

				<div class="controls-row">
					<sp-button @click=${this._onQuant}>QUANT</sp-button>
					<sp-button class="tap-tempo" variant="round" @click=${this._onTap}>TAP</sp-button>
				</div>

				${this.mode === 'sequencer' ? html`
					<div class="pattern-info">
						Editing: ${this.selectedSampleName || 'None'}
						&middot; ${this.patternLength} steps
					</div>
				` : ''}
			</div>
		`;
	}

	// --- Knob event handlers ---

	private _onSwingChange = (e: CustomEvent) => {
		this.dispatchEvent(new CustomEvent('knob-swing', {
			detail: { value: e.detail.value },
			bubbles: true, composed: true,
		}));
	};

	private _onLengthChange = (e: CustomEvent) => {
		this.dispatchEvent(new CustomEvent('knob-length', {
			detail: { value: e.detail.value },
			bubbles: true, composed: true,
		}));
	};

	private _onVolChange = (e: CustomEvent) => {
		this.dispatchEvent(new CustomEvent('knob-vol', {
			detail: { value: e.detail.value },
			bubbles: true, composed: true,
		}));
	};

	private _onPitchChange = (e: CustomEvent) => {
		this.dispatchEvent(new CustomEvent('knob-pitch', {
			detail: { value: e.detail.value },
			bubbles: true, composed: true,
		}));
	};

	// --- Transport handlers ---

	private _onPlay = () => {
		this.dispatchEvent(new CustomEvent('transport-play', {
			bubbles: true, composed: true,
		}));
	};

	private _onStop = () => {
		this.dispatchEvent(new CustomEvent('transport-stop', {
			bubbles: true, composed: true,
		}));
	};

	private _onRec = () => {
		this.dispatchEvent(new CustomEvent('transport-rec', {
			bubbles: true, composed: true,
		}));
	};

	private _onQuant = () => {
		this.dispatchEvent(new CustomEvent('quant-toggle', {
			bubbles: true, composed: true,
		}));
	};

	private _onTap = () => {
		const now = performance.now();
		this.tapTimes = [...this.tapTimes.filter((t) => now - t < 3000), now];

		if (this.tapTimes.length >= 3) {
			const intervals: number[] = [];
			for (let i = 1; i < this.tapTimes.length; i++) {
				intervals.push(this.tapTimes[i] - this.tapTimes[i - 1]);
			}
			const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
			const bpm = Math.round(60000 / avgMs);
			const clampedBpm = Math.max(60, Math.min(200, bpm));

			this.dispatchEvent(new CustomEvent('tap-tempo', {
				detail: { bpm: clampedBpm },
				bubbles: true, composed: true,
			}));
		}
	};
}
