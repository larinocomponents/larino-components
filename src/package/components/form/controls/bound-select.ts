import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import styles from './select-wrapper.scss'

@customElement('bound-select')
export class BoundSelect<T> extends LitElement {
    static styles = styles

    private _value: string

    @state()
    private _controlText: string

    @state()
    private _options: T[] = []

    @query('.control')
    private _control: HTMLSelectElement

    @property({attribute: 'value-prop'})
    public valueProp: string = 'value'

    @property({attribute: 'text-prop'})
    public textProp: string = 'text'

    @property()
    public placeholder: string

    @property({ type: Boolean })
    public disabled: boolean

    public get value(): string {
        return this._value !== 'default'
            ? this._value
            : null
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

    public get selectedText() {
        return this._control.selectedOptions[0]?.text
    }

    public render() {
        return html`
            <div class="wrapper" part="wrapper">
                <span class="value">${this._controlText}</span>
                <span class="placeholder">${this.placeholder ?? 'Select value'}</span>
                <svg part="icon" stroke-linejoin="round" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"></path>
                </svg>
                <select
                    class="control"
                    @change=${this.onChangeEvent}
                    ?disabled=${this.disabled}>
                    <option value="default">--</option>
                    ${this.renderSelectOptions()}
                </select>
            </div>
        `
    }

    public updated(changes: PropertyValues): void {
        if (changes.has('_options'))
            this.handleChange()
    }

    public setOptions(options: T[]) {
        this._options = options
    }

    public clear() {
        this.value = undefined
        this._options = []
    }

    private renderSelectOptions() {
        return this._options.map(item => {
            const text = item[this.textProp]
            const value = item[this.valueProp] ?? text

            return html`
                <option value="${value}" ?select=${value == this._value}>
                    ${text}
                </option>
            `
        })
    }

    private onChangeEvent(e: Event) {
        e.stopPropagation()
        this.handleChange()
    }

    private handleChange() {
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