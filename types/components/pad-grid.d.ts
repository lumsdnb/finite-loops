import { LitElement } from 'lit';
import './drum-pad';
export declare class PadGrid extends LitElement {
    mode: 'performance' | 'sequencer';
    currentStep: number;
    sampleNames: Map<number, string>;
    static styles: import("lit").CSSResult;
    private _getPadButton;
    /**
     * Programmatically sets a pad's visual state to "pressed".
     * Called by the parent app.
     */
    triggerPadDown(index: number): void;
    /**
     * Programmatically sets a pad's visual state to "unpressed".
     * Called by the parent app.
     */
    triggerPadUp(index: number): void;
    render(): import("lit").TemplateResult<1>;
    private _handlePadClick;
}
