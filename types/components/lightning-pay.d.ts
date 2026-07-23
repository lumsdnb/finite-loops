import { LitElement } from 'lit';
export declare class LightningPay extends LitElement {
    slug: string;
    minSats: number;
    private _state;
    private _amount;
    private _bolt11;
    private _paymentHash;
    private _downloadToken;
    private _error;
    private _copied;
    private _pollTimer;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _stopPolling;
    private _createInvoice;
    private _startPolling;
    private _checkPayment;
    private _copyInvoice;
    private _reset;
    private _handleAmountInput;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _renderState;
    updated(changed: Map<string, unknown>): void;
    private _renderQr;
}
