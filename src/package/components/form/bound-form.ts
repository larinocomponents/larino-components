import { customComponent } from '@/decorators'
import { html, LitElement } from 'lit'
import { ValidationResult, FormItemCollection } from '@/utilities'
import { FormItem } from '.'

@customComponent('bound-form')
export class BoundForm<T> extends LitElement {
    private readonly _items: FormItemCollection

    private _initialValues: Partial<T>
    private _values: T
    private _valid: boolean
    private _updatedFields: Set<string>
    private _fieldUpdateDebounce: number
    private _onvalidate?: (value: any, item: FormItem) => Promise<ValidationResult>
    private _onvalidated?: (valid: boolean) => Promise<void>

    constructor() {
        super()
        this._items = new FormItemCollection()
        this._values = {} as T
        this._updatedFields = new Set()
    }

    public set initialValues(values: Partial<T>) {
        this._initialValues = values
        this._values = {...values, ...this._values}
        for (const field in values) {
            const item = this._items.get(field)
            if (item) item.initialValue = values[field]
        }
    }

    public get values() {
        return this._values
    }

    public get valid() {
        return this._valid
    }

    public set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>) {
        this._onvalidate = callback
        // Register validation callbacks in case not registered.
        // TODO: Revisit. Right now this is a temporary fix.
        this._items.each(item => {
            item. onvalidate = this._onvalidate.bind(this)
        })
    }

    public set onvalidated(callback: (valid: boolean) => Promise<void>) {
        this._onvalidated = callback
    }

    public render() {
        return html`<slot></slot>`
    }
    
    public firstUpdated() {
        this.registerItems()
    }

    public setFieldValues(values: Partial<T>) {
        for (const prop in values) {
            this.setFieldValue(prop, values[prop])
        }
    }
    
    public setFieldValue(field: string, value: any) {
        const updated = this.updateField(field, value)
        const item = this._items.get(field)
        if (updated && item) item.value = value
    }

    public setFieldStates(states: {[field: string]: boolean}) {
        for (const prop in states) {
            this.setFieldState(prop, states[prop])
        }
    }

    public setFieldState(field: string, state: boolean) {
        const item = this._items.get(field)
        if (item) item.toggleAttribute('disabled', !state)
    }

    public setFieldVisibility(field: string, visible: boolean) {
        const item = this._items.get(field)
        if (item) item.hidden = !visible
    }

    public reset() {
        this._initialValues = {}
        this._values = {} as T
        this._items.each(item => item.reset())
    }
    
    private registerItems() {
        for (const item of this.querySelectorAll('form-item')) {
            if (item instanceof FormItem && this._items.add(item)) {
                this.attachEventListeners(item)
                item.initialValue = this._initialValues && this._initialValues[item.name]
            }
        }
    }

    private attachEventListeners(item: FormItem) {
        item.onchange = () => this.onChange(item)
        if (this._onvalidate) {
            item.onvalidate = this._onvalidate.bind(this)
        }
        item.onvalidated = this.onItemValidated.bind(this)
    }

    private onChange(item: FormItem) {
        this.updateField(item.name, item.value)
    }

    private updateField(field: string, value: any): boolean {
        // Check if value has changed.
        if (this._values[field] === value)
            return false

        // Otherwise update.
        this._values[field] = value
        this._updatedFields.add(field)

        // And schedule notification.
        window.clearTimeout(this._fieldUpdateDebounce)
        this._fieldUpdateDebounce = window.setTimeout(() => {
            this._fieldUpdateDebounce = undefined
            const updatedFields =  new Set(this._updatedFields)
            this.dispatchEvent(new CustomEvent('change', { detail: updatedFields }))
            this._updatedFields.clear()
        }, 100)

        return true
    }

    private async onItemValidated() {
        this._valid = this._items.all(i => i.valid)

        if (this._onvalidated)
            await this._onvalidated(this._valid)
    }
}