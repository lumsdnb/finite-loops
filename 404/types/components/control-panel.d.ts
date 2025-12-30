import { LitElement } from 'lit';
import './sp-button';
import './sample-waveform';
export declare class ControlPanel extends LitElement {
    currentPadIndex: number;
    currentSampleName: string;
    bpm: number;
    mode: 'performance' | 'sequencer';
    static styles: import("lit").CSSResult;
    private _sampleEditState;
    private _timeBpmState;
    render(): import("lit").TemplateResult<1>;
    private _handleSampleEditClick;
    private _handleTimeBpmClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'control-panel': ControlPanel;
    }
}
