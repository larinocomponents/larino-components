import { html, LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import styles from './progress-spinner.scss'

@customComponent('progress-spinner')
export class ProgressSpinner extends LitElement {
    static styles = styles

    @state()
    private _path: string

    @state()
    private _c: number

    @state()
    private _r: number

    @property({ type: Number })
    public size: number = 24

    @property()
    public color: string

    public render() {
        return html`
            <svg
                class="control"
                viewBox="0 0 ${this.size} ${this.size}">
                <circle
                    stroke-width="2"
                    cx=${this._c}
                    cy=${this._c}
                    r=${this._r}
                />
                <path stroke-width="2" d="${this._path}" />
            </svg>
        `
    }

    protected override updated(changes: Map<string, any>): void {
        if (changes.has('size'))
            this.updateSize()

        if (changes.has('color'))
            this.style.setProperty('--color', this.color)
    }

    private updateSize() {
        // Fixed size
        this.style.width = this.size + 'px'
        this.style.height = this.size + 'px'

        // Spinner
        const d = this.size - 1
        this._c = this.size / 2
        this._r = this._c - 1
        this._path = `M${this._c} ${1} A${this._r} ${this._r} 0 0 1 ${d} ${this._c}`
    }
}