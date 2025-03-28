import { html, unsafeCSS } from 'lit'
import { customComponent } from '@/decorators/custom-component'
import { BaseDialog } from './base-dialog'
import styles from './modal-dialog.scss'

@customComponent('modal-dialog')
export class ModalDialog extends BaseDialog {
    static styles = [BaseDialog.styles, unsafeCSS(styles)]

    public renderContent() {
        return html`
            <button class="close-button" @click=${this.close}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
                </svg>
            </button>
            <slot></slot>
        `
    }
}