import { LitElement } from 'lit'

export declare class TextField extends LitElement {
    type: string
    placeholder: string
    pattern?: string
    maxLines: number
    disabled: boolean
    value: string
}
