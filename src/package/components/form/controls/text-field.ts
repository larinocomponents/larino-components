import { html, LitElement, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { isNullOrWhitespace } from '@/utilities'
import styles from './text-field.scss'

@customElement('text-field')
export class TextField extends LitElement {
    static styles = styles

    private _value: string
    
    @query('.control')
    private _control: HTMLTextAreaElement

    @property()
    public type: string = 'text'

    @property()
    public placeholder: string

    @property()
    public pattern?: string

    @property({ attribute: 'max-lines' })
    public maxLines: number = 1

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
            <textarea
                class="control"
                type="${this.type}"
                placeholder="${this.placeholder ?? nothing}"
                pattern="${this.pattern ?? nothing}"
                ?disabled="${this.disabled}"
                @keydown=${this.onKeyDown}
                @input=${this.onInput}
                rows=${this.maxLines}
            ></textarea>
        `
    }

    private onKeyDown(e: KeyboardEvent) {
        const lines = this._control.value.split('\n').length
        if (e.code === 'Enter' && lines == this.maxLines)
            e.preventDefault()
    }

    private onInput(e: InputEvent) {
        e.stopPropagation()
        const value = this._control.value
        this._value = !isNullOrWhitespace(value) ? value : null
        this.dispatchEvent(new CustomEvent('input'))
    }

    // TODO: Masking feature
    // const cursorPosition = this._control.selectionStart || 0;
    // this._control.setSelectionRange(cursorPosition, cursorPosition)
}