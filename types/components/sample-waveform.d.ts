import { LitElement } from "lit";
export declare class SampleWaveform extends LitElement {
    sampleUrl: string;
    waveColor: string;
    height: number;
    playheadPosition: number;
    static styles: import("lit").CSSResult;
    private canvasRef;
    private static audioContext;
    peaks: number[];
    resizeObserver: ResizeObserver | null;
    isLoading: boolean;
    private loadId;
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string | number | symbol, unknown>): void;
    _fetchAudio(): Promise<void>;
    _getPeaks(data: Float32Array, samples: number): number[];
    _drawWaveform(): void;
}
