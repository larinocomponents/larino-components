import { LitElement } from 'lit'

export declare class PaginationStrip extends LitElement {
    total: number

    get lines(): number
    get page(): number
}
