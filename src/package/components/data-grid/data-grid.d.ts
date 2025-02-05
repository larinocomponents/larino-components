import { LitElement } from 'lit'
import { GridColumnDefinition } from './grid-column-definition'

export interface RequestItemsResult<T> {
    count: number;
    items: T[];
}

type RequestItemsCallback<T> = (top: number, skip: number) => Promise<RequestItemsResult<T>>

type InvokeCallback<T> = (item: T) => void

export declare class DataGrid<T> extends LitElement {
    definitions: GridColumnDefinition<T>[]

    refresh(): Promise<void>
    onRequestItems(callback: RequestItemsCallback<T>): void
    onInvoke(callback: InvokeCallback<T>): void
}
