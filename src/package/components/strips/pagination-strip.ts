import { html, unsafeCSS, LitElement, PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import styles from './pagination-strip.scss'

@customComponent('pagination-strip')
export class PaginationStrip extends LitElement {
    static styles = unsafeCSS(styles)

    private _maxPage: number = 1
    private _eventQueue: number

    @state()
    private _lines: number = 10
    
    @state()
    private _page: number = 0

    @state()
    private _start: number = 0

    @state()
    private _end: number = 0

    @property({ type: Number })
    public total: number

    public get lines() {
        return this._lines
    }

    public get page() {
        return this._page
    }

    public render() {
        return html`
            <div class="blocks lines">
                <span class="value">${this._lines}</span>
                <span>per page</span>
                <svg stroke-linejoin="round" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z"></path>
                </svg>
                <select value="10" @change=${this.updateLines}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
            <div class="blocks page">
                <span class="value">${(this._start + 1)}-${this._end}</span>
                of
                <span class="total">${this.total}</span>
            </div>
            <button
                class="blocks nav-button previous"
                @click=${() => this.navigate(-1)}
                ?disabled=${this._page === 0}>
                <svg viewBox="0 0 24 24">
                    <path d="M16.8,20.7c.6.6.6,1.5,0,2.1s-1.5.6-2.1,0L5.7,13.9l-1.5-1.5c-.2-.2-.2-.4-.2-.7s0-.5.2-.7h0c0,0,1.4-1.5,1.4-1.5L14.7.7c.6-.6,1.5-.6,2.1,0,.6.6.6,1.5,0,2.1L7.8,11.8l9,9Z"/>
                </svg>
            </button>
            <button
                class="blocks nav-button next"
                @click=${() => this.navigate(1)}
                ?disabled=${this._page === this._maxPage}>
                <svg viewBox="0 0 24 24">
                    <path d="M7.2,20.7c-.6.6-.6,1.5,0,2.1s1.5.6,2.1,0l9-9,1.5-1.5c.2-.2.2-.4.2-.7s0-.5-.2-.7h0c0,0-1.4-1.5-1.4-1.5L9.3.7c-.6-.6-1.5-.6-2.1,0-.6.6-.6,1.5,0,2.1l9,9-9,9Z"/>
                </svg>
            </button>
        `
    }

    protected override updated(changes: PropertyValues): void {
        if (changes.has('total') || changes.has('_lines'))
            this.calculatePages()
    }

    private updateLines(e: Event) {
        this._lines = parseInt((e.target as HTMLSelectElement).value)
        this.notifyEvent()
    }

    private calculatePages() {
        this._maxPage = Math.max(0, Math.ceil(this.total / this._lines) - 1)
        this.updatePage(0)
    }

    private navigate(delta: number) {
        this.updatePage(delta)
        this.notifyEvent()
    }

    private updatePage(delta: number) {
        this._page = Math.max(0, Math.min(this._maxPage, this._page + delta))
        this._start = (this._page * this._lines)
        this._end = Math.min(this.total, this._start + this._lines)
    }

    private notifyEvent() {
        // Queue notification.
        window.clearTimeout(this._eventQueue)
        this._eventQueue = window.setTimeout(() => {
            this.dispatchEvent(new CustomEvent('change'))
        }, 500)
    }
}