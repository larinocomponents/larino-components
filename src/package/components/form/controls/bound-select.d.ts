import { LitElement } from 'lit'

export declare class BoundSelect<T> extends LitElement {
    valueProp: string
    textProp: string
    placeholder: string
    disabled: boolean
    value: string
    valueAsNumber: number

    get selectedText(): string

    setOptions(options: T[]): void
    clear(): void
}
