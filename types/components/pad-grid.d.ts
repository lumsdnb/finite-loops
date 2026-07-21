import { LitElement } from 'lit';
import './drum-pad';
import type { Step } from '../sequencer/types';
export declare class PadGrid extends LitElement {
    mode: 'performance' | 'sequencer';
    currentStep: number;
    sampleNames: Map<number, string>;
    stepStates: Step[];
    selectedStep: number | null;
    playingStep: number;
    private longPressTimers;
    private readonly longPressMs;
    static styles: import("lit").CSSResult;
    private _getPadButton;
    triggerPadDown(index: number): void;
    triggerPadUp(index: number): void;
    render(): import("lit").TemplateResult<1>;
    private _handlePadClick;
    private _handlePointerDown;
    private _handlePointerUp;
}
