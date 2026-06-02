import { LitElement } from "lit";
import "./sp-button";
import "./sample-waveform";
export declare class ControlPanel extends LitElement {
    currentPadIndex: number;
    currentSampleName: string;
    bpm: number;
    mode: "performance" | "sequencer";
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _handleBpmChange;
}
