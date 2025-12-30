import { LitElement } from 'lit';
import './components/pad-grid';
import './components/control-panel';
export declare class SpApp extends LitElement {
    private samples;
    private sampleNames;
    private midiEnabled;
    private audioPlaybackManager;
    private midiInputs;
    private isLoading;
    private currentPadIndex;
    bpm: number;
    currentMode: 'performance' | 'sequencer';
    private currentStep;
    private keyMap;
    private _backPanelVisible;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _getPadGrid;
    private initKeyboardEvents;
    private _handleKeyDown;
    private _handleKeyUp;
    private initAudioPlaybackManager;
    private loadDefaultSamples;
    private initMidi;
    updated(changedProperties: Map<string | number | symbol, unknown>): void;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    toggleBackVisible(): void;
    private _handleBpmChange;
    private _handleModeChange;
    private _handlePadTrigger;
    private _handlePlaybackStarted;
    private _handlePlaybackProgress;
    private _handlePlaybackEnded;
}
declare global {
    interface HTMLElementTagNameMap {
        'sp-app': SpApp;
    }
}
