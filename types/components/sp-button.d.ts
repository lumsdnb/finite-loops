import { LitElement, CSSResult } from 'lit';
export declare class SpButton extends LitElement {
    label: string;
    active: boolean;
    variant: 'square' | 'round';
    size: 'small' | 'medium' | 'large';
    highlight: string;
    static styles: CSSResult[];
    render(): import("lit").TemplateResult<1>;
    protected _handleClick(e: MouseEvent): void;
}
