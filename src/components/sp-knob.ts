import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('sp-knob')
export class SpKnob extends LitElement {
	@property({ type: Number }) value = 0;
	@property({ type: Number }) min = 0;
	@property({ type: Number }) max = 100;
	@property({ type: Number }) step = 1;
	@property({ type: String }) label = '';
	@property({ attribute: false }) formatValue: (v: number) => string = (v) =>
		String(v);

	@state() private _dragging = false;
	private _dragStartY = 0;
	private _dragStartValue = 0;

	// Angle range: 7 o'clock (-135deg) to 5 o'clock (135deg) = 270deg total
	private readonly minAngle = -135;
	private readonly maxAngle = 135;

	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.25rem;
			touch-action: none;
			user-select: none;
			-webkit-user-select: none;
		}

		.knob-wrap {
			position: relative;
			width: 44px;
			height: 44px;
		}

		.knob {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: radial-gradient(circle at 40% 35%, #444, #1a1a1a);
			border: 2px solid #555;
			cursor: grab;
			position: relative;
		}

		.knob.dragging {
			cursor: grabbing;
			border-color: #4d98b3;
		}

		.indicator {
			position: absolute;
			width: 2px;
			height: 35%;
			background: #fff;
			left: 50%;
			top: 8%;
			transform-origin: bottom center;
			transform: translateX(-50%);
			border-radius: 1px;
		}

		.value-display {
			position: absolute;
			top: -1.4rem;
			left: 50%;
			transform: translateX(-50%);
			font-size: 0.65rem;
			color: #aaa;
			white-space: nowrap;
			opacity: 0;
			transition: opacity 0.15s;
			pointer-events: none;
		}

		.value-display.visible {
			opacity: 1;
		}

		.label {
			font-size: 0.6rem;
			color: #888;
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		@media (min-width: 1024px) {
			.knob-wrap {
				width: 60px;
				height: 60px;
			}

			.label {
				font-size: 0.7rem;
			}

			.value-display {
				font-size: 0.7rem;
			}
		}
	`;

	private get normalizedValue(): number {
		return (this.value - this.min) / (this.max - this.min);
	}

	private get angle(): number {
		return (
			this.minAngle +
			this.normalizedValue * (this.maxAngle - this.minAngle)
		);
	}

	render() {
		return html`
			<div class="knob-wrap">
				<div
					class="value-display ${this._dragging ? 'visible' : ''}"
				>
					${this.formatValue(this.value)}
				</div>
				<div
					class="knob ${this._dragging ? 'dragging' : ''}"
					@pointerdown=${this._onPointerDown}
				>
					<div
						class="indicator"
						style="transform: translateX(-50%) rotate(${this.angle}deg)"
					></div>
				</div>
			</div>
			${this.label ? html`<span class="label">${this.label}</span>` : ''}
		`;
	}

	private _onPointerDown = (e: PointerEvent) => {
		e.preventDefault();
		this._dragging = true;
		this._dragStartY = e.clientY;
		this._dragStartValue = this.value;

		const target = e.currentTarget as HTMLElement;
		target.setPointerCapture(e.pointerId);
		target.addEventListener('pointermove', this._onPointerMove);
		target.addEventListener('pointerup', this._onPointerUp);
	};

	private _onPointerMove = (e: PointerEvent) => {
		if (!this._dragging) return;

		const deltaY = this._dragStartY - e.clientY; // Up = positive
		const range = this.max - this.min;
		const sensitivity = 200; // Pixels for full range
		const rawValue =
			this._dragStartValue + (deltaY / sensitivity) * range;

		// Snap to step
		const snapped = Math.round(rawValue / this.step) * this.step;
		const clamped = Math.max(this.min, Math.min(this.max, snapped));

		if (clamped !== this.value) {
			this.value = clamped;
			this.dispatchEvent(
				new CustomEvent('knob-change', {
					detail: { value: this.value },
					bubbles: true,
					composed: true,
				})
			);
		}
	};

	private _onPointerUp = (e: PointerEvent) => {
		this._dragging = false;
		const target = e.currentTarget as HTMLElement;
		target.releasePointerCapture(e.pointerId);
		target.removeEventListener('pointermove', this._onPointerMove);
		target.removeEventListener('pointerup', this._onPointerUp);
	};
}

declare global {
	interface HTMLElementTagNameMap {
		'sp-knob': SpKnob;
	}
}
