import { isNullOrWhitespace } from '@/utilities'
import { html, unsafeCSS, LitElement, nothing } from 'lit'
import { property, query } from 'lit/decorators.js'
import { customComponent } from '@/decorators'
import styles from './text-field.scss'

@customComponent('number-field')
export class NumberField extends LitElement {
    static styles = unsafeCSS(styles)

    private _value: number 
    
    @query('.control')
    private _control: HTMLInputElement

    @property()
    public min: string

    @property()
    public steps: string

    @property()
    public placeholder: string

    @property({ type: Boolean })
    public disabled: boolean

    public get value() {
        return this._value
    }

    public set value(value: number) {
        this._value = value
        this._control.value = value?.toString() ?? ''
    }

    public render() {
        return html`
            <input
                class="control"
                type="number"
                min="${this.min ?? nothing}"
                steps="${this.steps ?? nothing}"
                placeholder="${this.placeholder ?? nothing}"
                ?disabled=${this.disabled}
                @input=${this.onInput}
            />
        `
    }

    private onInput(e: Event) {
        e.stopPropagation()
        const value = this._control.value
        this._value = !isNullOrWhitespace(value) ? Number(value) : undefined
        this.dispatchEvent(new CustomEvent('input'))
    }
}