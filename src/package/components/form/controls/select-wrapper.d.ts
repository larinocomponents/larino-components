import { LitElement } from 'lit';
export declare class SelectWrapper extends LitElement {
    static styles: import("lit").CSSResult;
    private _value;
    private _control;
    private _controlText;
    placeholder: string;
    get value(): string;
    set value(value: string);
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    render(): import("lit").TemplateResult<1>;
    firstUpdated(): void;
    private attachControl;
    private attachEventListener;
    private onChangeEvent;
    private updateDisplay;
}
