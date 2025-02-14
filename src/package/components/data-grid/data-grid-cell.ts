import { html, css, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import { GridColumnAlignment } from '@/components/data-grid/grid-column-definition'

@customComponent('data-grid-cell')
export class DataGridCell extends LitElement {
    static styles = css`
        :host {
            display: flex;
        }

        .control {
            align-items: center;
            color: rgb(25, 25, 25);
            display: flex;
            font-size: 0.937em;
            justify-content: start;
            line-height: 18px;
            overflow: hidden;
            padding: 11px 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `

    @property()
    public spacing: string

    @property({ attribute: 'v-align' })
    public verticalAlignment: GridColumnAlignment

    @property({ attribute: 'h-align' })
    public horizontalAlignment: GridColumnAlignment

    public render() {
        return html`
            <div class="control" part="control" style="${this.getControlStyle()}">
                <slot></slot>
            </div>
        `
    }

    private getControlStyle() {
        return `align-items:${this.verticalAlignment};justify-content:${this.horizontalAlignment};padding:${this.spacing};`
    }
}