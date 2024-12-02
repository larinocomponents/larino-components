import { LitElement } from 'lit'

export interface TextField extends LitElement {
  type: string
  placeholder: string
  disabled: boolean
  value: string
}

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField
  }
}