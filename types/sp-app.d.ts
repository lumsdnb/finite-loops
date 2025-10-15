import { LitElement } from 'lit';
import './components/pad-grid';
import './components/control-panel';
export declare class SpApp extends LitElement {
    private audioContext?;
    private samples;
    private sampleNames;
    private patterns;
    private midiEnabled;
    private midiInputs;
    private isLoading;
    private currentPadIndex;
    bpm: number;
    currentMode: 'performance' | 'sequencer';
    private currentStep;
    private keyMap;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private initKeyboardEvents;
    private _handleKeyDown;
    private _handleKeyUp;
    private initAudio;
    private loadDefaultSamples;
    private initMidi;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _handleBpmChange;
    private _handleModeChange;
    private _handlePadTrigger;
    private playSound;
}
declare global {
    interface HTMLElementTagNameMap {
        'sp-app': SpApp;
    }
}
