import { LitElement } from 'lit';
export declare class DrumPad extends LitElement {
    index: number;
    active: boolean;
    keyBinding: string;
    sampleName: string;
    stepActive: boolean;
    stepSelected: boolean;
    stepPlaying: boolean;
    displayLabel: string;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _handleClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'drum-pad': DrumPad;
    }
}
