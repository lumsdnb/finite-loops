import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WebMidi, Input, NoteMessageEvent } from 'webmidi';
import { DEFAULT_SAMPLES } from './constants/samples';
import './components/pad-grid';
import { PadGrid } from './components/pad-grid';
import './components/control-panel';
import {
	AudioPlaybackManager,
	getAudioPlaybackManager,
} from './audio/AudioPlaybackManager';
import { SampleWaveform } from './components/sample-waveform';
import { SequencerEngine } from './sequencer/SequencerEngine';
import type { Step } from './sequencer/types';

@customElement('fl-404')
export class Fl404 extends LitElement {
	@state() private samples: Map<number, AudioBuffer> = new Map();
	@state() private sampleNames: Map<number, string> = new Map();
	private audioPlaybackManager: AudioPlaybackManager | undefined;
	@state() private midiInputs: Input[] = [];
	@state() private currentPadIndex = -1;
	@property({ type: Number }) bpm = 120;
	@property({ type: String }) currentMode: 'performance' | 'sequencer' = 'performance';
	@state() private currentStep = 0;

	// Sequencer state
	private sequencer: SequencerEngine | undefined;
	@state() private seqPlaying = false;
	@state() private seqRecording = false;
	@state() private seqCurrentStep = -1;
	@state() private seqSelectedSample = 0;
	@state() private seqSelectedStep: number | null = null;
	@state() private seqStepStates: Step[] = [];

	// Knob values
	@state() private knobSwing = 0;
	@state() private knobLength = 16;
	@state() private knobVol = 100;
	@state() private knobPitch = 1.0;

	// Shift key state for sample selection
	private shiftHeld = false;

	private keyMap: Record<string, number> = {
		'1': 0, '2': 1, '3': 2, '4': 3,
		q: 4, w: 5, e: 6, r: 7,
		a: 8, s: 9, d: 10, f: 11,
		z: 12, x: 13, c: 14, v: 15,
	};

	connectedCallback() {
		super.connectedCallback();
		this.initAudioPlaybackManager();
		this.initMidi();
		this.initKeyboardEvents();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('keydown', this._handleKeyDown);
		window.removeEventListener('keyup', this._handleKeyUp);
		this.sequencer?.dispose();
	}

	private _getPadGrid(): PadGrid | null {
		return this.shadowRoot?.querySelector('pad-grid') ?? null;
	}

	private initKeyboardEvents() {
		this._handleKeyDown = this._handleKeyDown.bind(this);
		this._handleKeyUp = this._handleKeyUp.bind(this);
		window.addEventListener('keydown', this._handleKeyDown);
		window.addEventListener('keyup', this._handleKeyUp);
	}

	private _handleKeyDown(e: KeyboardEvent): void {
		if (e.repeat) return;

		if (e.key === 'Shift') {
			this.shiftHeld = true;
			return;
		}

		const key = e.key.toLowerCase();
		if (!(key in this.keyMap)) return;
		e.preventDefault();
		const index = this.keyMap[key];

		if (this.currentMode === 'sequencer') {
			if (this.shiftHeld) {
				// Shift + pad key = select sample for editing
				this._handleSampleSelect(index);
			} else if (this.seqRecording && this.seqPlaying) {
				// Recording mode: pads trigger samples and record
				this._handlePadTrigger(new CustomEvent('pad-triggered', {
					detail: { index },
				}));
				this.sequencer?.recordHit(index);
				this._updateStepStates();
				this._getPadGrid()?.triggerPadDown(index);
			} else {
				// Normal sequencer: toggle/select steps
				this._handleStepInteraction(index);
			}
		} else {
			// Performance mode
			this._handlePadTrigger(new CustomEvent('pad-triggered', {
				detail: { index },
			}));
			this._getPadGrid()?.triggerPadDown(index);
		}
	}

	private _handleKeyUp(e: KeyboardEvent) {
		if (e.key === 'Shift') {
			this.shiftHeld = false;
			return;
		}

		const key = e.key.toLowerCase();
		if (key in this.keyMap) {
			e.preventDefault();
			const index = this.keyMap[key];
			this._getPadGrid()?.triggerPadUp(index);
		}
	}

	private initAudioPlaybackManager() {
		this.audioPlaybackManager = getAudioPlaybackManager();

		this.audioPlaybackManager.addEventListener(
			'playback-progress',
			this._handlePlaybackProgress,
		);
		this.audioPlaybackManager.addEventListener(
			'playback-started',
			this._handlePlaybackStarted,
		);
		this.audioPlaybackManager.addEventListener(
			'playback-ended',
			this._handlePlaybackEnded,
		);

		this.audioPlaybackManager.setPlaybackSettings(
			this.bpm,
			this.currentMode === 'sequencer',
		);

		// Initialize sequencer
		this.sequencer = new SequencerEngine(
			this.audioPlaybackManager.getAudioContext(),
		);
		this.sequencer.setBpm(this.bpm);
		this.sequencer.onTick = (step: number) => {
			this.seqCurrentStep = step;
		};
		this.sequencer.onTrigger = (padIndex: number, velocity: number, pitch: number, time: number) => {
			const buffer = this.samples.get(padIndex);
			if (buffer && this.audioPlaybackManager) {
				this.audioPlaybackManager.playAt(buffer, padIndex, pitch, time, velocity);
			}
		};

		this.loadDefaultSamples();
		this._updateStepStates();
	}

	private async loadDefaultSamples() {
		try {
			await Promise.all(
				DEFAULT_SAMPLES.map(async (sample) => {
					try {
						const response = await fetch(sample.url);
						const arrayBuffer = await response.arrayBuffer();

						if (!this.audioPlaybackManager) {
							throw new Error('AudioPlaybackManager not initialized');
						}

						const audioBuffer = await this.audioPlaybackManager
							.getAudioContext()
							.decodeAudioData(arrayBuffer);

						this.samples.set(sample.padIndex, audioBuffer);
						this.sampleNames.set(sample.padIndex, sample.name);
					} catch (err) {
						console.error(`Failed to load sample ${sample.name}:`, err);
					}
				}),
			);
		} catch (err) {
			console.error('Failed to load samples:', err);
		}
	}

	private async initMidi() {
		try {
			await WebMidi.enable();
			this.midiInputs = WebMidi.inputs;

			this.midiInputs.forEach((input) => {
				input.addListener('noteon', (e: NoteMessageEvent) => {
					const padIndex = e.note.number % 16;

					if (this.currentMode === 'sequencer' && this.seqRecording && this.seqPlaying) {
						this._handlePadTrigger(new CustomEvent('pad-triggered', {
							detail: { index: padIndex },
						}));
						this.sequencer?.recordHit(padIndex);
						this._updateStepStates();
					} else if (this.currentMode === 'sequencer') {
						this._handleStepInteraction(padIndex);
					} else {
						this._handlePadTrigger(new CustomEvent('pad-triggered', {
							detail: { index: padIndex },
						}));
					}
				});
			});
		} catch (err) {
			console.error('Failed to initialize MIDI:', err);
		}
	}

	updated(changedProperties: Map<string | number | symbol, unknown>) {
		if (changedProperties.has('bpm') || changedProperties.has('currentMode')) {
			if (this.audioPlaybackManager) {
				const isBpmSyncEnabled = this.currentMode === 'sequencer';
				this.audioPlaybackManager.updateSettings(this.bpm, isBpmSyncEnabled);
			}
			this.sequencer?.setBpm(this.bpm);
		}
	}

	// --- Sequencer helpers ---

	private _handleStepInteraction(stepIndex: number) {
		if (!this.sequencer) return;
		const pattern = this.sequencer.getPattern(this.seqSelectedSample);
		const step = pattern.steps[stepIndex];

		if (step?.active && this.seqSelectedStep !== stepIndex) {
			// Select active step for editing
			this.sequencer.selectStep(stepIndex);
			this.seqSelectedStep = stepIndex;
			// Update knobs to reflect selected step's values
			this.knobVol = Math.round(step.velocity * 100);
			this.knobPitch = step.pitch;
		} else {
			// Toggle step
			this.sequencer.toggleStep(this.seqSelectedSample, stepIndex);
			if (this.seqSelectedStep === stepIndex) {
				this.seqSelectedStep = null;
				this.sequencer.selectStep(null);
			}
		}
		this._updateStepStates();
	}

	private _handleSampleSelect(padIndex: number) {
		if (!this.sequencer) return;
		this.sequencer.setSelectedSample(padIndex);
		this.seqSelectedSample = padIndex;
		this.seqSelectedStep = null;
		this.currentPadIndex = padIndex;
		this._updateStepStates();

		// Update knobs to reflect new pattern's values
		const pattern = this.sequencer.getPattern(padIndex);
		this.knobSwing = pattern.swing;
		this.knobLength = pattern.length;
	}

	private _updateStepStates() {
		if (!this.sequencer) return;
		const pattern = this.sequencer.getPattern(this.seqSelectedSample);
		this.seqStepStates = [...pattern.steps];
	}

	// --- Transport handlers ---

	private _handleTransportPlay = () => {
		this.sequencer?.start();
		this.seqPlaying = true;
	};

	private _handleTransportStop = () => {
		this.sequencer?.stop();
		this.seqPlaying = false;
		this.seqRecording = false;
		this.seqCurrentStep = -1;
	};

	private _handleTransportRec = () => {
		this.sequencer?.toggleRecording();
		this.seqRecording = this.sequencer?.isRecording() ?? false;
	};

	private _handleTapTempo = (e: CustomEvent) => {
		this.bpm = e.detail.bpm;
	};

	// --- Knob handlers ---

	private _handleKnobSwing = (e: CustomEvent) => {
		this.knobSwing = e.detail.value;
		this.sequencer?.setPatternSwing(this.seqSelectedSample, e.detail.value);
	};

	private _handleKnobLength = (e: CustomEvent) => {
		this.knobLength = e.detail.value;
		this.sequencer?.setPatternLength(this.seqSelectedSample, e.detail.value);
	};

	private _handleKnobVol = (e: CustomEvent) => {
		this.knobVol = e.detail.value;
		if (this.sequencer && this.seqSelectedStep !== null) {
			this.sequencer.setStepVelocity(
				this.seqSelectedSample,
				this.seqSelectedStep,
				e.detail.value / 100,
			);
			this._updateStepStates();
		}
	};

	private _handleKnobPitch = (e: CustomEvent) => {
		this.knobPitch = e.detail.value;
		if (this.sequencer && this.seqSelectedStep !== null) {
			this.sequencer.setStepPitch(
				this.seqSelectedSample,
				this.seqSelectedStep,
				e.detail.value,
			);
			this._updateStepStates();
		}
	};

	static styles = css`
		* {
			box-sizing: border-box;
		}

		:host {
			display: block;
			color: var(--sp-foreground);
			font-family: system-ui, -apple-system, sans-serif;
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}

		.app-body {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			min-height: 0;
			gap: 0.75rem;
			padding: 0.75rem;
		}

		pad-grid {
			order: 1;
			flex: 1 1 0;
			min-height: 0;
			width: 100%;
		}

		.controls-shell {
			order: 2;
			width: 100%;
			min-width: 0;
			min-height: 0;
		}

		.control-stack {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			width: 100%;
		}

		.control-page {
			background: var(--sp-background);
			border-radius: 24px;
			padding: 0.75rem;
			box-shadow:
				inset 0 2px 4px rgba(255, 255, 255, 0.1),
				0 2px 4px rgba(0, 0, 0, 0.2);
			min-width: 0;
		}

		.title-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 0.75rem;
			margin-bottom: 0.75rem;
		}

		.title {
			margin: 0;
			font-size: 1.35rem;
			line-height: 1;
			font-family: 'Times New Roman', Times, serif;
			letter-spacing: 0.02em;
		}

		.compact-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5rem;
			align-items: end;
		}

		.field {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			font-size: 0.82rem;
			color: var(--sp-foreground);
			min-width: 0;
		}

		input[type='number'],
		select {
			width: 100%;
			background: #3a3a3a;
			color: #fff;
			border: 1px solid #4a4a4a;
			border-radius: 10px;
			padding: 0.45rem 0.55rem;
			font: inherit;
			min-width: 0;
		}

		.small-label {
			font-size: 0.82rem;
			color: #aaa;
			line-height: 1.35;
		}

		.sample-line {
			margin-top: 0.75rem;
			font-size: 0.9rem;
			color: #ddd;
			line-height: 1.35;
			word-break: break-word;
		}

		.control-panel-wrap {
			min-width: 0;
		}

		.control-panel-wrap control-panel {
			display: block;
			width: 100%;
		}

		@media (max-width: 1023px) {
			.controls-shell {
				height: clamp(190px, 28dvh, 280px);
				overflow-y: auto;
				scroll-snap-type: y proximity;
				-webkit-overflow-scrolling: touch;
				overscroll-behavior: contain;
			}

			.control-page {
				min-height: 100%;
				scroll-snap-align: start;
				scroll-snap-stop: normal;
			}
		}

		@media (min-width: 1024px) {
			.app-body {
				flex-direction: row;
				align-items: stretch;
				gap: 1rem;
				padding: 1rem;
			}

			.controls-shell {
				order: 1;
				width: min(34vw, 420px);
				height: 100%;
				overflow-y: auto;
				scroll-snap-type: y proximity;
				overscroll-behavior: contain;
			}

			pad-grid {
				order: 2;
				min-width: 0;
			}

			.control-page {
				min-height: 100%;
				scroll-snap-align: start;
				scroll-snap-stop: normal;
			}

			.control-stack {
				height: auto;
				overflow: visible;
			}

			.control-page {
				padding: 1rem;
			}

			.title {
				font-size: var(--xtra-big-ass-heading);
			}

			.compact-grid {
				grid-template-columns: repeat(2, minmax(0, 1fr));
			}
		}
	`;

	render() {
		const currentSampleName =
			this.currentPadIndex >= 0
				? this.sampleNames.get(this.currentPadIndex) || ''
				: '';

		const selectedSampleName = this.sampleNames.get(this.seqSelectedSample) || '';

		return html`
			<div class="app-body">
				<pad-grid
					.mode=${this.currentMode}
					.currentStep=${this.currentStep}
					.sampleNames=${this.sampleNames}
					.stepStates=${this.seqStepStates}
					.selectedStep=${this.seqSelectedStep}
					.playingStep=${this.seqCurrentStep}
					@pad-triggered=${this._handlePadTrigger}
					@step-toggled=${this._handleStepToggled}
					@step-selected=${this._handleStepSelected}
					@sample-select=${this._handleSampleSelectEvent}
				></pad-grid>

				<div class="controls-shell">
					<div class="control-stack">
						<section class="control-page">
							<div class="title-row">
								<h2 class="title">FL-404</h2>
								<div class="small-label">${this.currentMode}</div>
							</div>

							<div class="compact-grid">
								<label class="field">
									<span>BPM</span>
									<input
										type="number"
										min="60"
										max="200"
										.value=${String(this.bpm)}
										@change=${this._handleBpmChange}
									/>
								</label>

								<label class="field">
									<span>Mode</span>
									<select
										.value=${this.currentMode}
										@change=${this._handleModeChange}
									>
										<option value="performance">Performance</option>
										<option value="sequencer">Sequencer</option>
									</select>
								</label>
							</div>

							<div class="sample-line">
								${this.currentMode === 'sequencer'
									? html`Editing: ${selectedSampleName || 'None'}`
									: this.currentPadIndex >= 0
										? html`Pad ${this.currentPadIndex + 1}:
											${currentSampleName || 'Unnamed sample'}`
										: html`Tap a pad to show the loaded sample name.`
								}
							</div>
						</section>

						<section class="control-page">
							<div class="control-panel-wrap">
								<control-panel
									.currentPadIndex=${this.currentPadIndex}
									.currentSampleName=${currentSampleName}
									.bpm=${this.bpm}
									.mode=${this.currentMode}
									.playing=${this.seqPlaying}
									.recording=${this.seqRecording}
									.swing=${this.knobSwing}
									.patternLength=${this.knobLength}
									.stepVelocity=${this.knobVol}
									.stepPitch=${this.knobPitch}
									.selectedSampleName=${selectedSampleName}
									@transport-play=${this._handleTransportPlay}
									@transport-stop=${this._handleTransportStop}
									@transport-rec=${this._handleTransportRec}
									@tap-tempo=${this._handleTapTempo}
									@quant-toggle=${() => {}}
									@knob-swing=${this._handleKnobSwing}
									@knob-length=${this._handleKnobLength}
									@knob-vol=${this._handleKnobVol}
									@knob-pitch=${this._handleKnobPitch}
								></control-panel>
							</div>
						</section>
					</div>
				</div>
			</div>
		`;
	}

	private _handleBpmChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		this.bpm = Number(input.value);
	};

	private _handleModeChange = (e: Event) => {
		const select = e.target as HTMLSelectElement;
		this.currentMode = select.value as 'performance' | 'sequencer';
		if (this.currentMode === 'sequencer') {
			this._updateStepStates();
		}
	};

	private _handlePadTrigger = (e: CustomEvent) => {
		const { index } = e.detail;
		this.currentPadIndex = index;

		const buffer = this.samples.get(index);
		if (buffer && this.audioPlaybackManager) {
			this.audioPlaybackManager.play(buffer, index, 1.0);
		}
	};

	private _handleStepToggled = (e: CustomEvent) => {
		this._handleStepInteraction(e.detail.index);
	};

	private _handleStepSelected = (e: CustomEvent) => {
		this._handleStepInteraction(e.detail.index);
	};

	private _handleSampleSelectEvent = (e: CustomEvent) => {
		this._handleSampleSelect(e.detail.index);
	};

	private _handlePlaybackStarted = (event: Event) => {
		const { id: _id, padIndex: _padIndex, startTime: _startTime } = (event as CustomEvent).detail;
	};

	private _handlePlaybackProgress = (event: Event) => {
		const { padIndex, progress } = (event as CustomEvent).detail;

		const controlPanel = this.shadowRoot?.querySelector('control-panel');
		if (controlPanel) {
			const waveform = controlPanel.shadowRoot?.querySelector('sample-waveform');
			const sampleWaveform = waveform as SampleWaveform;

			if (
				sampleWaveform &&
				sampleWaveform.dataset.sampleIndex === padIndex.toString()
			) {
				sampleWaveform.playheadPosition = progress;
				sampleWaveform.requestUpdate();
			}
		}
	};

	private _handlePlaybackEnded = (_event: Event) => {
		// Cleanup handled by AudioPlaybackManager
	};
}

declare global {
	interface HTMLElementTagNameMap {
		'fl-404': Fl404;
	}
}
