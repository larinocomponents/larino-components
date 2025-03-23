import { html, unsafeCSS, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import { isNullOrWhitespace } from '@/utilities'
import { format } from 'date-fns'
import styles from './text-field.scss'

@customComponent('date-field')
export class DateField extends LitElement {
    static styles = unsafeCSS(styles)

    private _value: string

    public get value() {
        return this._value
    }

    @property({ reflect: false })
    public set value(value: string) {
        this._value = DateField.normalize(value)
    }

    @property({ type: Boolean })
    public disabled: boolean

    public render() {
        return html`
            <input
                type="date"
                class="control"
                value=${this.value}
                ?disabled=${this.disabled}
                @input=${this.onInput}
            />
        `
    }

    private onInput(e: Event) {
        e.stopPropagation()
        const value = (e.target as HTMLInputElement).value
        this.value = !isNullOrWhitespace(value) ? value : null
        this.dispatchEvent(new Event('input'))
    }

    // Subjectively, normalization shouldn't be the responsibility of  
    // a date input component. However, as a built-in utility, this component  
    // will handle input normalization.  
    private static normalize(value: string) {
        const date = new Date(value)
        if (isNaN(date.getTime())) {
            console.warn(`Invalid date format: ${value}.`)
            return null
        }
        return format(date, 'yyyy-MM-dd')
    }
}