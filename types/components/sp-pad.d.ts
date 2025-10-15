import { SpButton } from './sp-button';
export declare class SpPad extends SpButton {
    sampleName: string;
    padIndex: number;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
    protected _handleClick(e: MouseEvent): void;
}
