import { LitElement } from 'lit';
export declare class SampleWaveform extends LitElement {
    sampleUrl: string;
    sampleName: string;
    private _waveform?;
    private _waveformContainer;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    updated(changed: Map<string, unknown>): void;
    private _initWaveform;
    disconnectedCallback(): void;
    private _loadSample;
}
declare global {
    interface HTMLElementTagNameMap {
        'sample-waveform': SampleWaveform;
    }
}
