import { LitElement } from 'lit';
export declare class SpButton extends LitElement {
    label: string;
    active: boolean;
    variant: 'square' | 'round';
    size: 'small' | 'medium' | 'large';
    highlight: string;
    static styles: import("lit").CSSResult;
    private _handleKeyDown;
    private _handleKeyUp;
    render(): import("lit").TemplateResult<1>;
    protected _handleClick(e: MouseEvent): void;
}
