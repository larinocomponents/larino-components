import { LitElement, PropertyValues } from 'lit';
export declare class PaginationStrip extends LitElement {
    static styles: import("lit").CSSResult;
    private _maxPage;
    private _eventQueue;
    private _lines;
    private _page;
    private _start;
    private _end;
    total: number;
    get lines(): number;
    get page(): number;
    render(): import("lit").TemplateResult<1>;
    protected updated(changes: PropertyValues): void;
    private updateLines;
    private calculatePages;
    private navigate;
    private updatePage;
    private notifyEvent;
}
