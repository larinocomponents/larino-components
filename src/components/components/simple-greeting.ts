import { html, LitElement } from 'lit'
import {customElement, property} from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    public name: string

    public render() {
        return html`<p>Hello, ${this.name}</p>`
    }
}