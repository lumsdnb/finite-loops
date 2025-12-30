import { LitElement } from "lit";
export declare class SampleWaveform extends LitElement {
    sampleUrl: string;
    waveColor: string;
    height: number;
    playheadPosition: number;
    static styles: import("lit").CSSResult;
    private canvasRef;
    peaks: number[];
    resizeObserver: ResizeObserver | null;
    isLoading: boolean;
    constructor();
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string | number | symbol, unknown>): void;
    _fetchAudio(): Promise<void>;
    _getPeaks(data: Float32Array, samples: number): number[];
    _drawWaveform(): void;
}
