import { html, css, LitElement } from 'lit'
import { customComponent } from '@/decorators/custom-component'

@customComponent('data-grid-cell')
export class DataGridCell extends LitElement {
    static styles = css`
        .control {
            align-items: center;
            color: rgb(25, 25, 25);
            display: block;
            font-size: 0.937em;
            line-height: 18px;
            overflow: hidden;
            padding: 11px 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `

    public render() {
        return html`
            <span class="control" part="control">
                <slot></slot>
            </span>
        `
    }
}