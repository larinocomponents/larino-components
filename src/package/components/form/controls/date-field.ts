import { html, unsafeCSS, LitElement, nothing } from 'lit'
import { customComponent } from '@/decorators/custom-component'
import { isNullOrWhitespace } from '@/utilities'
import { property, query } from 'lit/decorators.js'
import styles from './text-field.scss'

@customComponent('date-field')
export class DateField extends LitElement {
    static styles = unsafeCSS(styles)

    private _value: string
    
    @query('.control')
    private _control: HTMLInputElement

    @property()
    public placeholder: string

    @property({ type: Boolean })
    public disabled: boolean

    public get value() {
        return this._value
    }

    public set value(value: string) {
        this._value = value ?? null
        this._control.value = value ?? ''
    }

    public render() {
        return html`
            <input
                type="date"
                class="control"
                placeholder="${this.placeholder ?? nothing}"
                ?disabled=${this.disabled}
                @input=${this.onInput}
            />
        `
    }

    private onInput(e: Event) {
        e.stopPropagation()
        const value = this._control.value
        this._value = !isNullOrWhitespace(value) ? value : null
        this.dispatchEvent(new CustomEvent('input'))
    }
}