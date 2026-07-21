import { LitElement } from 'lit';
import './components/pad-grid';
import './components/control-panel';
export declare class Fl404 extends LitElement {
    private samples;
    private sampleNames;
    private audioPlaybackManager;
    private midiInputs;
    private currentPadIndex;
    bpm: number;
    currentMode: 'performance' | 'sequencer';
    private currentStep;
    private sequencer;
    private seqPlaying;
    private seqRecording;
    private seqCurrentStep;
    private seqSelectedSample;
    private seqSelectedStep;
    private seqStepStates;
    private knobSwing;
    private knobLength;
    private knobVol;
    private knobPitch;
    private shiftHeld;
    private keyMap;
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
    private _handleStepInteraction;
    private _handleSampleSelect;
    private _updateStepStates;
    private _handleTransportPlay;
    private _handleTransportStop;
    private _handleTransportRec;
    private _handleTapTempo;
    private _handleKnobSwing;
    private _handleKnobLength;
    private _handleKnobVol;
    private _handleKnobPitch;
    static styles: import("lit").CSSResult;
    render(): import("lit").TemplateResult<1>;
    private _handleBpmChange;
    private _handleModeChange;
    private _handlePadTrigger;
    private _handleStepToggled;
    private _handleStepSelected;
    private _handleSampleSelectEvent;
    private _handlePlaybackStarted;
    private _handlePlaybackProgress;
    private _handlePlaybackEnded;
}
declare global {
    interface HTMLElementTagNameMap {
        'fl-404': Fl404;
    }
}
