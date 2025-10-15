import { LitElement } from 'lit';
import './drum-pad';
export declare class PadGrid extends LitElement {
    mode: 'performance' | 'sequencer';
    currentStep: number;
    sampleNames: Map<number, string>;
    private keyMap;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _handlePadClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'pad-grid': PadGrid;
    }
}
