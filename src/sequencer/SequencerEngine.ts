import { Pattern, createDefaultPattern } from './types';

export class SequencerEngine {
	private patterns: Map<number, Pattern> = new Map();
	private _playing = false;
	private _recording = false;
	private _currentStep = 0;
	private _selectedSample = 0;
	private _selectedStep: number | null = null;
	private _bpm = 120;

	// Scheduler state
	private audioContext: AudioContext;
	private schedulerInterval: ReturnType<typeof setInterval> | null = null;
	private nextStepTime = 0;          // AudioContext time of next step
	private readonly scheduleAheadTime = 0.1;  // How far ahead to schedule (seconds)
	private readonly lookaheadMs = 25;         // How often scheduler runs (ms)

	// Callbacks — set by fl-404 to trigger audio and update UI
	onTick: ((step: number) => void) | null = null;
	onTrigger: ((padIndex: number, velocity: number, pitch: number, time: number) => void) | null = null;

	constructor(audioContext: AudioContext) {
		this.audioContext = audioContext;
		// Initialize 16 default patterns
		for (let i = 0; i < 16; i++) {
			this.patterns.set(i, createDefaultPattern());
		}
	}

	// --- Transport ---

	start(): void {
		if (this._playing) return;
		this._playing = true;
		this._currentStep = 0;
		this.nextStepTime = this.audioContext.currentTime;
		this.schedulerInterval = setInterval(() => this.scheduler(), this.lookaheadMs);
	}

	stop(): void {
		this._playing = false;
		this._recording = false;
		if (this.schedulerInterval !== null) {
			clearInterval(this.schedulerInterval);
			this.schedulerInterval = null;
		}
		this._currentStep = 0;
		this.onTick?.(0);
	}

	toggleRecording(): void {
		this._recording = !this._recording;
	}

	isPlaying(): boolean {
		return this._playing;
	}

	isRecording(): boolean {
		return this._recording;
	}

	getCurrentStep(): number {
		return this._currentStep;
	}

	// --- BPM ---

	setBpm(bpm: number): void {
		this._bpm = Math.max(60, Math.min(200, bpm));
	}

	private get stepDuration(): number {
		return 60 / this._bpm / 4; // 16th note duration
	}

	// --- Sample selection ---

	setSelectedSample(padIndex: number): void {
		this._selectedSample = padIndex;
		this._selectedStep = null; // Clear step selection when changing sample
	}

	getSelectedSample(): number {
		return this._selectedSample;
	}

	// --- Step selection ---

	selectStep(stepIndex: number | null): void {
		this._selectedStep = stepIndex;
	}

	getSelectedStep(): number | null {
		return this._selectedStep;
	}

	// --- Pattern access ---

	getPattern(padIndex: number): Pattern {
		let pattern = this.patterns.get(padIndex);
		if (!pattern) {
			pattern = createDefaultPattern();
			this.patterns.set(padIndex, pattern);
		}
		return pattern;
	}

	// --- Step editing ---

	toggleStep(padIndex: number, stepIndex: number): void {
		const pattern = this.getPattern(padIndex);
		const step = pattern.steps[stepIndex];
		if (!step) return;
		step.active = !step.active;
	}

	setStepVelocity(padIndex: number, stepIndex: number, velocity: number): void {
		const pattern = this.getPattern(padIndex);
		const step = pattern.steps[stepIndex];
		if (!step) return;
		step.velocity = Math.max(0, Math.min(1, velocity));
	}

	setStepPitch(padIndex: number, stepIndex: number, pitch: number): void {
		const pattern = this.getPattern(padIndex);
		const step = pattern.steps[stepIndex];
		if (!step) return;
		step.pitch = Math.max(0.5, Math.min(2.0, pitch));
	}

	setPatternLength(padIndex: number, length: number): void {
		const pattern = this.getPattern(padIndex);
		pattern.length = Math.max(1, Math.min(16, Math.round(length)));
	}

	setPatternSwing(padIndex: number, swing: number): void {
		const pattern = this.getPattern(padIndex);
		pattern.swing = Math.max(0, Math.min(100, swing));
	}

	// --- Recording ---

	recordHit(padIndex: number): void {
		if (!this._recording || !this._playing) return;
		const pattern = this.getPattern(padIndex);
		const step = pattern.steps[this._currentStep];
		if (!step) return;
		step.active = true;
	}

	// --- Scheduler ---

	private scheduler(): void {
		while (this.nextStepTime < this.audioContext.currentTime + this.scheduleAheadTime) {
			this.scheduleStep(this._currentStep, this.nextStepTime);
			this.advanceStep();
		}
	}

	private scheduleStep(stepIndex: number, time: number): void {
		// Fire triggers for all patterns at this step
		for (let padIndex = 0; padIndex < 16; padIndex++) {
			const pattern = this.getPattern(padIndex);
			// Only play steps within the pattern's length
			const effectiveStep = stepIndex % pattern.length;
			const step = pattern.steps[effectiveStep];
			if (step?.active) {
				// Calculate per-pattern swing offset
				const swingOffset = effectiveStep % 2 === 1
					? (pattern.swing / 100) * this.stepDuration * 0.5
					: 0;
				this.onTrigger?.(padIndex, step.velocity, step.pitch, time + swingOffset);
			}
		}
		this.onTick?.(stepIndex);
	}

	private advanceStep(): void {
		this.nextStepTime += this.stepDuration;
		this._currentStep = (this._currentStep + 1) % 16;
	}

	// --- Cleanup ---

	dispose(): void {
		this.stop();
		this.onTick = null;
		this.onTrigger = null;
	}
}
