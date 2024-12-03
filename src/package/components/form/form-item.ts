import { isNullOrEmpty, ValidationResult } from '@/utilities'
import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import styles from './form-item.scss'
    
@customElement('form-item')
export class FormItem extends LitElement {
    static styles = styles

    private _control: HTMLElement
    private _initialValue: any
    private _value: any
    private _onvalidate?: (value: any, item: FormItem) => Promise<ValidationResult>
    private _valid: boolean
    private _onvalidated?: (valid: boolean) => Promise<void>

    @property()
    public name: string

    @property()
    public label?: string

    @property({ attribute: 'value-prop-name' })
    public valuePropName: string

    @property()
    public trigger: string

    @property({ type: Boolean })
    public required: boolean

    @property({ type: Boolean })
    public disabled: boolean

    public set initialValue(value: any) {
        this._initialValue = value
        this.value = value
    }

    public get value() {
        return this._value
    }

    public set value(value: any) {
        this._value = value
        this.setControlValue()
        this.validate()
    }

    public get valid() {
        return this._valid
    }

    public set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>) {
        this._onvalidate = callback
        this.validate() // TODO: Revisit. Right now this is a temporary fix.
    }

    public set onvalidated(callback: (valid: boolean) => Promise<void>) {
        this._onvalidated = callback
    }

    public render() {
        return html`
            <span class="label ${!isNullOrEmpty(this.label) && 'visible'}">
                ${this.label}
            </span>
            <div>
                <slot></slot>
            </div>
        `
    }
    
    public firstUpdated() {
        this.attachControl()
    }

    public updated(changes: PropertyValues): void {
        if (changes.has('disabled'))
            this._control.toggleAttribute('disabled', this.disabled)
    }

    public reset() {
        this.initialValue = undefined
    }

    private attachControl() {
        this._control = this.firstElementChild as HTMLElement
        this.value = this._initialValue ?? this.resolveValue()
        this.validate()
        this.attachEventListener()
    }

    private attachEventListener() {
        const trigger = this.trigger ?? 'change'
        this._control.addEventListener(trigger, this.onTrigger.bind(this))
    }

    private async onTrigger() {
        this._value = this.resolveValue()
        this.dispatchEvent(new Event('change'))
        await this.validate()
    }
    
    private resolveValue() {
        const propName = this.valuePropName ?? 'value'
        const value = this._control[propName]
        return !isNullOrEmpty(value) ? value : null
    }

    private setControlValue() {
        if (this._control) {
            this._control[this.valuePropName ?? 'value'] = this._value
        }
    }

    private async validate() {
        if (!this._onvalidate) 
            return;

        const {valid, message} = await this._onvalidate(this._value, this)
        this._valid = valid
        this._control.toggleAttribute('invalid', !valid)
        this._control.dataset.error = message ?? ''

        if (this._onvalidated)
            await this._onvalidated(valid)
    }
}