import { html, unsafeCSS } from 'lit'
import { property } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import { ConfirmDialogFactory } from '@/utilities'
import { BaseDialog } from './base-dialog'
import styles from './confirm-dialog.scss'

@customComponent('confirm-dialog')
export class ConfirmDialog extends BaseDialog {
    static styles = [BaseDialog.styles, unsafeCSS(styles)]

    private _response?: string

    @property()
    public title: string

    @property()
    public message: string

    @property({ type: Boolean })
    private critical: boolean

    public renderContent() {
        return html`
            <div class="content">
                <h1 class="title">${this.title}</h1>
                <p class="message">${this.message}</p>
                <div class="footer">
                    <button
                        class="cancel"
                        data-response="cancel"
                        @click=${this.respond}>
                        Cancel
                    </button>
                    <button
                        class="accept"
                        data-response="accept"
                        @click=${this.respond}
                        ?critical=${this.critical}>
                        Continue
                    </button>
                </div>
            </div>
        `
    }

    public static show(title: string, message: string, critical?: boolean): Promise<string> {
        const dialog = ConfirmDialogFactory.createOrSelect('default')

        dialog.title = title
        dialog.message = message
        dialog.critical = critical

        return new Promise<string>(resolve => {
            const handler = (e: CustomEvent) => {
                dialog.removeEventListener('close', handler)
                resolve(e.detail)
            }
            dialog.addEventListener('close', handler)
            dialog.show()
        })
    }
    
    protected override dismissed() {
        this._response = 'cancel'
        this.close()
    }

    protected override closed() {
        this.dispatchEvent(new CustomEvent('close', { detail: this._response }))
        this._response = undefined
    }

    private respond(e: Event) {
        this._response = (e.target as HTMLElement).dataset.response
        this.close()
    }
}