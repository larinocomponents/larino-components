import { LitElement, PropertyValues } from 'lit';
export declare class BoundSelect<T> extends LitElement {
    static styles: import("lit").CSSResult;
    private _value;
    private _controlText;
    private _options;
    private _control;
    valueProp: string;
    textProp: string;
    placeholder: string;
    disabled: boolean;
    get value(): string;
    set value(value: string);
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    get selectedText(): string;
    render(): import("lit").TemplateResult<1>;
    updated(changes: PropertyValues): void;
    setOptions(options: T[]): void;
    clear(): void;
    private renderSelectOptions;
    private onChangeEvent;
    private handleChange;
    private updateDisplay;
}
