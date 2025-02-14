import { html, unsafeCSS, LitElement, PropertyValues, render } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { customComponent } from '@/decorators/custom-component'
import { GridColumnDefinition } from '@/components/data-grid/grid-column-definition'
import { PaginationStrip } from '@/components/strips/pagination-strip'

import styles from './data-grid.scss'

type RequestItemsCallback<T> = (top: number, skip: number) => Promise<RequestItemsResult<T>>

type InvokeCallback<T> = (item: T) => void

export interface RequestItemsResult<T> {
    count: number
    items: T[]
}

@customComponent('data-grid')
export class DataGrid<T> extends LitElement {
    static styles = unsafeCSS(styles)

    private _onRequestItems?: RequestItemsCallback<T>
    private _invokable: boolean = false
    private _onInvoke: InvokeCallback<T>

    @state()
    private _count: number = 0

    @query('.pagination')
    private _pagination: PaginationStrip

    @property({ type: Array, attribute: false })
    public definitions: GridColumnDefinition<T>[] = []

    public set onRequestItems(callback: RequestItemsCallback<T>) {
        this._onRequestItems = callback
    }

    public set onInvoke(callback: InvokeCallback<T>) {
        this._onInvoke = callback
        this.setInvokable()
    }

    public render() {
        return html`
            <div class="scroll-wrapper">
                <div class="row header">
                    ${this.renderHeader()}
                </div>
                <div class="content">
                    <slot></slot>
                </div>
                <div class="empty ${this._count == 0 ? 'visible' : ''}">
                    <svg class="icon" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" d="M 5.6 4.369993 C 6.152346 3.082603 7.419122 2.248577 8.82 2.249994 L 23.18 2.249994 C 24.58 2.249994 25.846001 3.083994 26.4 4.369993 L 31.879999 17.159994 L 32 26.749994 C 32 28.682991 30.432997 30.249994 28.5 30.249994 L 3.5 30.249994 C 1.567003 30.249994 0 28.682991 0 26.749994 L 0.12 17.159994 Z M 8.82 5.249994 L 3.774 16.249994 L 9.5 16.249994 L 13.25 20.249994 L 18.75 20.249994 L 22.5 16.249994 L 28.226 16.249994 L 23.18 5.249994 Z M 29 19.249994 L 23.25 19.249994 L 19.5 23.249994 L 12.5 23.249994 L 8.75 19.249994 L 3 19.249994 L 3.5 27.249994 L 29 26.749994 Z"/>
                    </svg>
                    <p class="label">Nothing in here...</p>
                </div>
            </div>
            <div class="footer">
                <pagination-strip
                    class="pagination"
                    total="${this._count}"
                    @change=${this.refresh}>
                </pagination-strip>
            </div>
        `
    }

    public async refresh() {
        if (!this._onRequestItems)
            throw 'Unable to refresh data grid. onRequestUpdate callback is not configured.'

        const top = this._pagination.lines
        const skip = this._pagination.page * top
        const {count, items} = await this._onRequestItems(top, skip)
        
        this._count = count
        this.renderItems(items)
    }

    protected override updated(changes: PropertyValues): void {
        if (changes.has('definitions'))
            this.updateWidths()
    }

    private renderHeader() {
        return this.definitions.map(definition => html`
            <data-grid-header>
                ${definition.name ?? definition.navigation}
            </data-grid-header>
        `)
    }

    private updateWidths() {
        const widths = this.definitions.map(cd => cd.width ?? '150px').join(' ')
        this.style.setProperty('--widths', widths)
    }

    private renderItems(items: T[]) {
        const rows = repeat(items, i => i, this.renderRow.bind(this))
        render(rows, this)
    }

    private renderRow(item: T) {
        const onInvoke = () => {
            if (this._invokable)
                this._onInvoke(item)
        }
        
        return html`
            <div class="row" @click=${onInvoke}>
                ${this.definitions.map((cd, index) =>
                    this.renderColumn(cd, item, index))}
            </div>
        `
    }

    private renderColumn(definition: GridColumnDefinition<T>, item: T, index: number) {
        const fields = definition.navigation.split('/')

        const value = fields.reduce((value: any, field: string) => {
            return value ? value[field] : value
        }, item)

        const content = definition.map
            ? definition.map(value, item, index)
            : value
            
        return html`
            <data-grid-cell
                spacing=${definition.spacing}
                v-align=${definition.verticalAlignment}
                h-align=${definition.horizontalAlignment}>
                ${content}
            </data-grid-cell>
        `
    }

    private setInvokable() {
        this._invokable = true
        this.classList.add('invokable')
    }
}