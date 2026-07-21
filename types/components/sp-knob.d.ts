import { LitElement } from 'lit';
export declare class SpKnob extends LitElement {
    value: number;
    min: number;
    max: number;
    step: number;
    label: string;
    formatValue: (v: number) => string;
    private _dragging;
    private _dragStartY;
    private _dragStartValue;
    private readonly minAngle;
    private readonly maxAngle;
    static styles: import("lit").CSSResult;
    private get normalizedValue();
    private get angle();
    render(): import("lit").TemplateResult<1>;
    private _onPointerDown;
    private _onPointerMove;
    private _onPointerUp;
}
declare global {
    interface HTMLElementTagNameMap {
        'sp-knob': SpKnob;
    }
}
