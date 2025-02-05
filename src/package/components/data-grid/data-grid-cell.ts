import { html, css, LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import { GridColumnAlignment } from '@/components/data-grid/grid-column-definition'

@customComponent('data-grid-cell')
export class DataGridCell extends LitElement {
    static styles = css`
        :host {
            --spacing: 11px 12px;
            --v-align: center;
            --h-align: start;
        }

        .control {
            align-items: var(--v-align);
            color: rgb(25, 25, 25);
            display: flex;
            font-size: 0.937em;
            justify-content: var(--h-align);
            line-height: 18px;
            overflow: hidden;
            padding: var(--spacing);
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
            this.style.setProperty('--spacing', this.spacing)

        if (changes.has('verticalAlignment'))
            this.style.setProperty('--v-align', this.verticalAlignment)

        if (changes.has('horizontalAlignment'))
            this.style.setProperty('--h-align', this.horizontalAlignment)
    }
}