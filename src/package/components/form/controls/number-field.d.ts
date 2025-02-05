import { LitElement } from 'lit';
export declare class NumberField extends LitElement {
    static styles: import("lit").CSSResult;
    private _value;
    private _control;
    min: string;
    steps: string;
    placeholder: string;
    disabled: boolean;
    get value(): number;
    set value(value: number);
    render(): import("lit").TemplateResult<1>;
    private onInput;
}
