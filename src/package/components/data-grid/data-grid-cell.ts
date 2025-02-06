import { html, css, LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import { GridColumnAlignment } from '@/components/data-grid/grid-column-definition'

@customComponent('data-grid-cell')
export class DataGridCell extends LitElement {
    static styles = css`
        :host {
            align-items: center;
            display: flex;
            justify-content: start;
            padding: 11px 12px;
        }

        .control {
            color: rgb(25, 25, 25);
            display: block;
            font-size: 0.937em;
            line-height: 18px;
            overflow: hidden;
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
            <span class="control" part="control">
                <slot></slot>
            </span>
        `
    }

    protected updated(changes: PropertyValues): void {
        if (changes.has('spacing'))
            this.style.padding = this.spacing

        if (changes.has('verticalAlignment'))
            this.style.alignItems = this.verticalAlignment

        if (changes.has('horizontalAlignment'))
            this.style.justifyContent = this.horizontalAlignment
    }
}