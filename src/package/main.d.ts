import { LitElement } from 'lit'

export interface TextField extends LitElement {
  type: string
  placeholder: string
  disabled: boolean
  value: string
}

export interface SelectWrapper extends LitElement {
  placeholder: string
  value: string
  valueAsNumber: string
}

export interface BoundSelect<T> extends LitElement {
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

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField
    'select-wrapper': SelectWrapper
    'bound-select': BoundSelect<any>
  }
}