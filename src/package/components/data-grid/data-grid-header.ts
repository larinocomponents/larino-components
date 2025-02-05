import { html, css, LitElement } from 'lit'
import { customComponent } from '@/decorators/custom-component'

@customComponent('data-grid-header')
export class DataGridHeader extends LitElement {
    static styles = css`
        :host {
            color: hsl(0deg 0% 30.2%);
            font-size: 0.875em;
            overflow: hidden;
            padding: 11px 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `

    public render() {
        return html`<slot></slot>`
    }
}