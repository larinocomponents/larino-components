import { html, LitElement } from 'lit'
import {customElement, property} from 'lit/decorators.js'
import styles from './simple-greeting.scss';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    static styles = styles

    @property()
    public name: string

    public render() {
        return html`<p class="control">Hello, ${this.name}</p>`
    }
}