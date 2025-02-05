import { LitElement } from 'lit';
export declare class CheckboxWrapper extends LitElement {
    static styles: import("lit").CSSResult;
    private _control;
    private _value;
    get value(): boolean;
    set value(value: boolean);
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
    private attachControl;
    private attachEventListener;
    private onChangeEvent;
    private updateValue;
}
