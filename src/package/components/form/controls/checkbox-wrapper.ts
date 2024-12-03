import { html, LitElement } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import styles from './checkbox-wrapper.scss'

@customElement('checkbox-wrapper')
export class CheckboxWrapper extends LitElement {
    static styles = styles

    private _control: HTMLInputElement

    @state()
    private _value: boolean

    public get value(): boolean {
        return this._value
    }

    public set value(value: boolean) {
        this.updateValue(value ?? false)
        this._control.checked = this._value
    }

    public render() {
        return html`
            <div class="wrapper">
                <div class="indicator ${this._value && 'checked'}">
                    <svg fill="none" height="16" viewBox="0 0 20 20" width="16">
                        <path d="M14 7L8.5 12.5L6 10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    </svg>
                </div>
                <slot></slot>
            </div>
        `
    }

    public firstUpdated() {
        this.attachControl()
    }

    private attachControl() {
        const label = this.querySelector('label') as HTMLLabelElement
        const input = this.querySelector('input') as HTMLInputElement

        // Override ID and label[for] attribute.
        const id = `checkbox_${crypto.randomUUID().substring(0, 8)}`
        label.htmlFor = id
        input.id = id

        // Override input[type]
        input.type = 'checkbox'

        this._control = input
        this.attachEventListener()
    }

    private attachEventListener() {
        this._control.onchange = this.onChangeEvent.bind(this)
    }
    
    private async onChangeEvent(e: Event) {
        e.stopPropagation()
        this.updateValue(this._control.checked)
        this.dispatchEvent(new Event('change'))
    }

    private updateValue(value: boolean) {
        this._value = value
    }
}