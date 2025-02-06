import { LitElement } from 'lit';
export declare class ModalDialog extends LitElement {
    static styles: import("lit").CSSResult;
    private _control;
    width: number;
    height: number;
    render(): import("lit").TemplateResult<1>;
    show(): void;
    close(): void;
    protected updated(changes: Map<string, any>): void;
    private setSize;
    private notifyClosed;
}
