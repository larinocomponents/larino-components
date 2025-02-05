import { LitElement } from 'lit';
export declare class TextField extends LitElement {
    static styles: import("lit").CSSResult;
    private _value;
    private _control;
    type: string;
    placeholder: string;
    pattern?: string;
    maxLines: number;
    disabled: boolean;
    get value(): string;
    set value(value: string);
    render(): import("lit").TemplateResult<1>;
    private onKeyDown;
    private onInput;
}
