import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type PayState = 'amount' | 'invoice' | 'waiting' | 'paid';

@customElement('lightning-pay')
export class LightningPay extends LitElement {
	@property({ type: String }) slug = '';
	@property({ type: Number }) minSats = 1000;

	@state() private _state: PayState = 'amount';
	@state() private _amount = 0;
	@state() private _bolt11 = '';
	@state() private _paymentHash = '';
	@state() private _downloadToken = '';
	@state() private _error = '';
	@state() private _copied = false;

	private _pollTimer: number | undefined;

	connectedCallback() {
		super.connectedCallback();
		this._amount = this.minSats;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._stopPolling();
	}

	private _stopPolling() {
		if (this._pollTimer) {
			window.clearInterval(this._pollTimer);
			this._pollTimer = undefined;
		}
	}

	private _createInvoice = async () => {
		this._error = '';

		if (this._amount < this.minSats) {
			this._error = `Minimum is ${this.minSats} sats`;
			return;
		}

		try {
			const res = await fetch('/api/store/invoice', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					slug: this.slug,
					amount_sats: this._amount,
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				this._error = data.error || 'Failed to create invoice';
				return;
			}

			const data = await res.json();
			this._bolt11 = data.bolt11;
			this._paymentHash = data.payment_hash;
			this._state = 'invoice';

			await new Promise((r) => setTimeout(r, 1000));
			this._state = 'waiting';
			this._startPolling();
		} catch {
			this._error = 'Network error';
		}
	};

	private _startPolling() {
		this._pollTimer = window.setInterval(() => this._checkPayment(), 3000);
	}

	private _checkPayment = async () => {
		try {
			const res = await fetch(
				`/api/store/invoice/${this._paymentHash}/${this.slug}`,
			);
			if (!res.ok) return;

			const data = await res.json();
			if (data.paid) {
				this._stopPolling();
				this._downloadToken = data.download_token;
				this._state = 'paid';
			}
		} catch {
			// keep polling on failure
		}
	};

	private _copyInvoice = async () => {
		try {
			await navigator.clipboard.writeText(this._bolt11);
			this._copied = true;
			setTimeout(() => (this._copied = false), 2000);
		} catch {
			// clipboard API may fail
		}
	};

	private _reset = () => {
		this._stopPolling();
		this._state = 'amount';
		this._bolt11 = '';
		this._paymentHash = '';
		this._downloadToken = '';
		this._error = '';
		this._copied = false;
		this._amount = this.minSats;
	};

	private _handleAmountInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		this._amount = parseInt(input.value, 10) || 0;
	};

	static styles = css`
		:host {
			display: block;
			margin-top: 1rem;
			font-family: 'Courier New', monospace;
		}

		.ln-container {
			border: 1px solid #2a2a2a;
			background: #111;
			padding: 1rem;
		}

		.ln-header {
			font-size: 0.65rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			color: #f7931a;
			margin-bottom: 0.75rem;
			display: flex;
			align-items: center;
			gap: 6px;
		}

		.ln-bolt {
			font-size: 0.8rem;
		}

		.amount-row {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 0.75rem;
		}

		.amount-input {
			width: 100px;
			background: #0a0a0a;
			border: 1px solid #333;
			color: #e0e0e0;
			font-family: inherit;
			font-size: 0.85rem;
			padding: 6px 8px;
			text-align: right;
		}

		.amount-input:focus {
			outline: none;
			border-color: #f7931a;
		}

		.amount-label {
			font-size: 0.75rem;
			color: #888;
		}

		.amount-min {
			font-size: 0.65rem;
			color: #555;
			margin-left: auto;
		}

		.ln-btn {
			background: #f7931a;
			color: #0a0a0a;
			border: none;
			font-family: inherit;
			font-size: 0.75rem;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			padding: 8px 16px;
			cursor: pointer;
			font-weight: 700;
			transition: background 0.15s;
			width: 100%;
		}

		.ln-btn:hover {
			background: #ffab40;
		}

		.ln-btn:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.ln-btn.secondary {
			background: none;
			border: 1px solid #333;
			color: #888;
			margin-top: 8px;
		}

		.ln-btn.secondary:hover {
			border-color: #00e5ff;
			color: #00e5ff;
		}

		.ln-btn.download {
			background: #22c55e;
		}

		.ln-btn.download:hover {
			background: #4ade80;
		}

		.invoice-display {
			margin-bottom: 0.75rem;
		}

		.qr-container {
			display: flex;
			justify-content: center;
			margin-bottom: 0.75rem;
		}

		.qr-canvas {
			image-rendering: pixelated;
			border: 4px solid #fff;
		}

		.bolt11-text {
			font-size: 0.6rem;
			color: #666;
			word-break: break-all;
			line-height: 1.4;
			max-height: 3.2em;
			overflow: hidden;
			margin-bottom: 8px;
		}

		.copy-btn {
			background: none;
			border: 1px solid #333;
			color: #888;
			font-family: inherit;
			font-size: 0.7rem;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			padding: 4px 12px;
			cursor: pointer;
			transition: border-color 0.15s, color 0.15s;
		}

		.copy-btn:hover {
			border-color: #00e5ff;
			color: #00e5ff;
		}

		.copy-btn.copied {
			border-color: #22c55e;
			color: #22c55e;
		}

		.waiting-indicator {
			display: flex;
			align-items: center;
			gap: 8px;
			margin-bottom: 0.75rem;
			font-size: 0.75rem;
			color: #888;
		}

		.pulse-dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: #f7931a;
			animation: lnPulse 1.5s ease-in-out infinite;
		}

		@keyframes lnPulse {
			0%,
			100% {
				box-shadow: 0 0 0 0 rgba(247, 147, 26, 0.4);
			}
			50% {
				box-shadow: 0 0 0 6px rgba(247, 147, 26, 0);
			}
		}

		.error-text {
			font-size: 0.7rem;
			color: #ef4444;
			margin-bottom: 0.5rem;
		}

		.paid-msg {
			font-size: 0.8rem;
			color: #22c55e;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			margin-bottom: 0.75rem;
			font-weight: 700;
		}
	`;

	render() {
		return html`
			<div class="ln-container">
				<div class="ln-header">
					<span class="ln-bolt">&#x26A1;</span>
					pay with lightning
				</div>
				${this._renderState()}
			</div>
		`;
	}

	private _renderState() {
		switch (this._state) {
			case 'amount':
				return html`
					<div class="amount-row">
						<input
							class="amount-input"
							type="number"
							min=${this.minSats}
							.value=${String(this._amount)}
							@input=${this._handleAmountInput}
						/>
						<span class="amount-label">sats</span>
						<span class="amount-min">min ${this.minSats}</span>
					</div>
					${this._error
						? html`<div class="error-text">${this._error}</div>`
						: nothing}
					<button
						class="ln-btn"
						@click=${this._createInvoice}
						?disabled=${this._amount < this.minSats}
					>
						create invoice
					</button>
				`;

			case 'invoice':
			case 'waiting':
				return html`
					<div class="invoice-display">
						<div class="qr-container">
							<canvas
								class="qr-canvas"
								width="200"
								height="200"
							></canvas>
						</div>
						<div class="bolt11-text">${this._bolt11}</div>
						<button
							class="copy-btn ${this._copied ? 'copied' : ''}"
							@click=${this._copyInvoice}
						>
							${this._copied ? 'copied' : 'copy invoice'}
						</button>
					</div>
					<div class="waiting-indicator">
						<span class="pulse-dot"></span>
						waiting for payment...
					</div>
					<button class="ln-btn secondary" @click=${this._reset}>
						cancel
					</button>
				`;

			case 'paid':
				return html`
					<div class="paid-msg">payment received</div>
					<a
						class="ln-btn download"
						href="/api/store/download/${this.slug}/${this._downloadToken}"
						download
						style="display:block;text-align:center;text-decoration:none"
					>
						download album
					</a>
					<button class="ln-btn secondary" @click=${this._reset}>
						new payment
					</button>
				`;
		}
	}

	updated(changed: Map<string, unknown>) {
		if (
			changed.has('_state') &&
			(this._state === 'invoice' || this._state === 'waiting')
		) {
			this._renderQr();
		}
	}

	private async _renderQr() {
		const canvas = this.renderRoot.querySelector(
			'.qr-canvas',
		) as HTMLCanvasElement | null;
		if (!canvas || !this._bolt11) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		try {
			const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(this._bolt11.toUpperCase())}`;
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => {
				ctx.drawImage(img, 0, 0, 200, 200);
			};
			img.src = qrUrl;
		} catch {
			ctx.fillStyle = '#222';
			ctx.fillRect(0, 0, 200, 200);
			ctx.fillStyle = '#888';
			ctx.font = '12px monospace';
			ctx.fillText('QR unavailable', 40, 100);
		}
	}
}
