import { html, LitElement, render } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './select-wrapper.scss'

@customElement('select-wrapper')
export class SelectWrapper extends LitElement {
    static styles = styles

    private _value: string
    private _control: HTMLSelectElement

    @state()
    private _controlText: string

    @property()
    public placeholder: string

    public get value(): string {
        return this._value !== 'default'
            ? this._value
            : undefined
    }

    public set value(value: string) {
        this._value = value
        this._control.value = value ?? 'default'
        this.updateDisplay()
    }

    public get valueAsNumber(): number {
        return this.value && Number(this.value)
    }

    public set valueAsNumber(value: number) {
        this.value = value?.toString()
    }

    public render() {
        return html`
            <div class="wrapper">
                <span class="value">${this._controlText}</span>
                <span class="placeholder">${this.placeholder ?? 'Select value'}</span>
                <svg stroke-linejoin="round" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"></path>
                </svg>
                <slot></slot>
            </div>
        `
    }

    public firstUpdated() {
        this.attachControl()
    }

    private attachControl() {
        this._control = this.firstElementChild as HTMLSelectElement
        render(
            html`<option value="default" selected>--</option>`,
            this._control,
            { renderBefore: this._control.firstChild }
        )
        this.attachEventListener()
    }

    private attachEventListener() {
        this._control.onchange = this.onChangeEvent.bind(this)
    }
    
    private async onChangeEvent(e: Event) {
        e.stopPropagation()
        this._value = this._control.value
        this.updateDisplay()
        this.dispatchEvent(new Event('change'))
    }

    private updateDisplay() {
        const { selectedIndex, selectedOptions } = this._control
        const controlText = selectedIndex > 0 ? selectedOptions[0]?.text : ''
        this._controlText = this._value !== 'default' && controlText
            ?  controlText
            : ''
    }
}