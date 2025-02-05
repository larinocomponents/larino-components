import { LitElement, PropertyValues } from 'lit';
import { GridColumnDefinition } from '@/components/data-grid/grid-column-definition';
type RequestItemsCallback<T> = (top: number, skip: number) => Promise<RequestItemsResult<T>>;
type InvokeCallback<T> = (item: T) => void;
export interface RequestItemsResult<T> {
    count: number;
    items: T[];
}
export declare class DataGrid<T> extends LitElement {
    static styles: import("lit").CSSResult;
    private _onRequestItems?;
    private _invokable;
    private _onInvoke;
    private _count;
    private _items;
    private _pagination;
    definitions: GridColumnDefinition<T>[];
    set onRequestItems(callback: RequestItemsCallback<T>);
    set onInvoke(callback: InvokeCallback<T>);
    render(): import("lit").TemplateResult<1>;
    refresh(): Promise<void>;
    protected updated(changes: PropertyValues): void;
    private renderHeader;
    private updateWidths;
    private renderItems;
    private renderRow;
    private renderColumn;
    private setInvokable;
}
export {};
