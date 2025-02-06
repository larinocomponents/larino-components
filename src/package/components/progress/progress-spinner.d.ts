import { LitElement } from 'lit';
export declare class ProgressSpinner extends LitElement {
    static styles: import("lit").CSSResult;
    private _path;
    private _c;
    private _r;
    size: number;
    color: string;
    render(): import("lit").TemplateResult<1>;
    protected updated(changes: Map<string, any>): void;
    private setSize;
}
