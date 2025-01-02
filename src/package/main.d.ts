import { LitElement } from 'lit'

declare interface ValidationResult {
    valid: boolean,
    message?: string
}

declare function valid(): ValidationResult

declare function invalid(message: string): ValidationResult

declare function defaultItemValidator(value: any, item: FormItem): Promise<ValidationResult>

declare class TextField extends LitElement {
  type: string
  placeholder: string
  disabled: boolean
  value: string
}

declare class NumberField extends LitElement {
  min: string
  steps: string
  placeholder: string
  disabled: boolean
  value: string
}

declare class SelectWrapper extends LitElement {
  placeholder: string
  value: string
  valueAsNumber: string
}

declare class BoundSelect<T> extends LitElement {
  valueProp: string
  textProp: string
  placeholder: string
  disabled: boolean
  value: string
  valueAsNumber: string
  selectedText: string
  setOptions(options: T[]): void
  clear(): void
}

declare class CheckboxWrapper extends LitElement {
  value: boolean
}

declare class FormItem extends LitElement {
  name: string
  label: string
  valuePropName: string
  trigger: string
  required: boolean
  disabled: boolean
  value: any
  get valid(): boolean
  set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>)
  set onvalidated(callback: (valid: boolean) => Promise<void>)
  reset(): void
}

declare class BoundForm<T> extends LitElement {
  set initialValues(values: Partial<T>)
  get values(): T
  get valid(): boolean
  set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>)
  set onvalidated(callback: (valid: boolean) => Promise<void>)
  setFieldValues(values: Partial<T>): void
  setFieldValue(field: string, value: any): void
  setFieldStates(states: {[field: string]: boolean}): void
  setFieldState(field: string, state: boolean): void
  reset(): void
}

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField
    'number-field': NumberField
    'select-wrapper': SelectWrapper
    'bound-select': BoundSelect<any>
    'checkbox-wrapper': CheckboxWrapper
    'form-item': FormItem
  }
}