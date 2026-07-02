import { LitElement } from 'lit';
export declare class AudioPlayer extends LitElement {
    open: boolean;
    trackTitle: string;
    trackSource: string;
    playing: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _togglePlayback;
    private _stopPlayback;
}
