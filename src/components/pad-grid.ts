import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './drum-pad';
import { SpButton } from './sp-button';
import type { Step } from '../sequencer/types';

@customElement('pad-grid')
export class PadGrid extends LitElement {
	@property({ type: String }) mode: 'performance' | 'sequencer' = 'performance';
	@property({ type: Number }) currentStep = 0;
	@property({ type: Object }) sampleNames: Map<number, string> = new Map();

	// Sequencer mode props
	@property({ type: Array }) stepStates: Step[] = [];
	@property({ type: Number }) selectedStep: number | null = null;
	@property({ type: Number }) playingStep = -1;

	private longPressTimers: Map<number, ReturnType<typeof setTimeout>> = new Map();
	private readonly longPressMs = 500;

	static styles = css`
		:host {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 1rem;
			padding: 1rem;
			background: #1a1a1a;
			border-radius: 8px;
			max-width: 800px;
			max-height: 800px;
			width: 100%;
			height: auto;
			aspect-ratio: 1 / 1;
		}
	`;

	private _getPadButton(index: number): SpButton | null {
		const pads = this.shadowRoot?.querySelectorAll('drum-pad');
		if (!pads || !pads[index]) return null;
		const spButton = pads[index].shadowRoot?.querySelector('sp-button');
		return (spButton as SpButton) || null;
	}

	public triggerPadDown(index: number) {
		const spButton = this._getPadButton(index);
		if (spButton) {
			spButton.active = true;
		}
	}

	public triggerPadUp(index: number) {
		const spButton = this._getPadButton(index);
		if (spButton) {
			spButton.active = false;
		}
	}

	render() {
		const keyMapDisplay = [
			'1', '2', '3', '4',
			'q', 'w', 'e', 'r',
			'a', 's', 'd', 'f',
			'z', 'x', 'c', 'v',
		];

		const isSequencer = this.mode === 'sequencer';

		return html`
			${Array(16).fill(0).map((_, index) => {
				const step = isSequencer ? this.stepStates[index] : undefined;

				return html`
					<drum-pad
						.index=${index}
						.keyBinding=${keyMapDisplay[index]}
						.sampleName=${isSequencer ? '' : (this.sampleNames.get(index) || '')}
						.displayLabel=${isSequencer ? String(index + 1) : ''}
						.active=${!isSequencer && index === this.currentStep}
						.stepActive=${isSequencer && (step?.active ?? false)}
						.stepSelected=${isSequencer && this.selectedStep === index}
						.stepPlaying=${isSequencer && this.playingStep === index}
						@pad-click=${() => this._handlePadClick(index)}
						@pointerdown=${() => this._handlePointerDown(index)}
						@pointerup=${() => this._handlePointerUp(index)}
						@pointercancel=${() => this._handlePointerUp(index)}
					></drum-pad>
				`;
			})}
		`;
	}

	private _handlePadClick(index: number) {
		if (this.mode === 'sequencer') {
			const step = this.stepStates[index];
			if (step?.active && this.selectedStep !== index) {
				// Tap active step to select it
				this.dispatchEvent(new CustomEvent('step-selected', {
					detail: { index },
					bubbles: true,
					composed: true,
				}));
			} else {
				// Toggle step on/off
				this.dispatchEvent(new CustomEvent('step-toggled', {
					detail: { index },
					bubbles: true,
					composed: true,
				}));
			}
		} else {
			this.dispatchEvent(new CustomEvent('pad-triggered', {
				detail: { index },
				bubbles: true,
				composed: true,
			}));
		}
	}

	private _handlePointerDown(index: number) {
		if (this.mode !== 'sequencer') return;

		const timer = setTimeout(() => {
			this.longPressTimers.delete(index);
			this.dispatchEvent(new CustomEvent('sample-select', {
				detail: { index },
				bubbles: true,
				composed: true,
			}));
		}, this.longPressMs);
		this.longPressTimers.set(index, timer);
	}

	private _handlePointerUp(index: number) {
		const timer = this.longPressTimers.get(index);
		if (timer) {
			clearTimeout(timer);
			this.longPressTimers.delete(index);
		}
	}
}