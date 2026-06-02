import { CSSResult } from 'lit';
import { SpButton } from './sp-button';
export declare class SpPad extends SpButton {
    sampleName: string;
    padIndex: number;
    static get styles(): CSSResult[];
    render(): import("lit").TemplateResult<1>;
    protected _handleClick(e: MouseEvent): void;
}
