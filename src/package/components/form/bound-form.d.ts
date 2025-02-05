import { LitElement } from 'lit';
import { ValidationResult } from '@/utilities';
import { FormItem } from '.';
export declare class BoundForm<T> extends LitElement {
    private readonly _items;
    private _initialValues;
    private _values;
    private _valid;
    private _updatedFields;
    private _fieldUpdateDebounce;
    private _onvalidate?;
    private _onvalidated?;
    constructor();
    set initialValues(values: Partial<T>);
    get values(): T;
    get valid(): boolean;
    set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>);
    set onvalidated(callback: (valid: boolean) => Promise<void>);
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
    setFieldValues(values: Partial<T>): void;
    setFieldValue(field: string, value: any): void;
    setFieldStates(states: {
        [field: string]: boolean;
    }): void;
    setFieldState(field: string, state: boolean): void;
    reset(): void;
    private registerItems;
    private attachEventListeners;
    private onChange;
    private updateField;
    private onItemValidated;
}
