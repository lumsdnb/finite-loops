import { LitElement } from "lit";
export declare class TopNav extends LitElement {
    activeName: string;
    regions: {
        id: string;
        name: string;
    }[];
    private navContainer;
    private navLinks;
    static styles: import("lit").CSSResult;
    protected firstUpdated(): void;
    protected updated(changed: Map<string, unknown>): void;
    private _resizeObserver?;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private _scrollToActive;
    private _dispatchNavigate;
}
