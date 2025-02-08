import { html, unsafeCSS, LitElement, CSSResultGroup, TemplateResult } from 'lit'
import { query, property } from 'lit/decorators.js'
import { isNullOrEmpty, isNumber } from '@/utilities/string-utilities'
import styles from './base-dialog.scss'

export abstract class BaseDialog extends LitElement {
    static styles: CSSResultGroup = unsafeCSS(styles)

    @query('dialog')
    private _dialog: HTMLDialogElement

    @property()
    public width?: string

    @property()
    public height?: string

    public render() {
        return html`
            <dialog
                style="width:${this.resolveSize(this.width)};height:${this.resolveSize(this.height)};"
                @click=${this.dismiss}
                @close=${this.closed}>
                ${this.renderContent()}
            </dialog>
        `
    }

    public async show() {
        await this.updateComplete
        this._dialog.showModal()
    }

    public close() {
        this._dialog.close()
    }

    protected abstract renderContent(): TemplateResult
    
    protected dismissed() {}

    protected closed() {
        this.dispatchEvent(new Event('close'))
    }

    private dismiss(e: PointerEvent) {
        if (e.target === this._dialog)
            this.dismissed()
    }

    private resolveSize(size: string) {
        size = size?.trim();

        // Check for null or empty.
        if (isNullOrEmpty(size))
            return 'max-content'

        // Allow predefined valid non-numeric CSS values.
        if (['auto', 'max-content', 'min-content', 'fit-content', 'inherit', 'initial', 'unset'].includes(size))
            return size

        // Check if size has CSS units.
        const match = size.match(/(px|em|rem|%|vw|vh|vmin|vmax|in|cm|mm|ch|ex|pt|pc)$/);
        if (match && isNumber(size.replace(match[0], '')))
            return size

        // Check for valid number then append 'px' as unit.
        if (isNumber(size))
            return `${size}px`

        // Otherwise fallback to 'max-content' and log a warning.
        console.warn(`Unrecognized size value: ${size}.`)
        return 'max-content'
    }
}