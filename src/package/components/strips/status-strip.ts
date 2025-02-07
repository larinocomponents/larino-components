import '@/components/progress/progress-spinner'

import { html, unsafeCSS, LitElement } from 'lit'
import { state } from 'lit/decorators.js'
import { customComponent } from '@/decorators/custom-component'
import styles from './status-strip.scss'

export type StatusTypes = 'idle' | 'loading' | 'error' | 'success'

@customComponent('status-strip')
export class StatusStrip extends LitElement {
    static styles = unsafeCSS(styles)

    private _dismissTimeout: number

    @state()
    private _status: StatusTypes = 'idle'

    @state()
    private _message: string

    public render() {
        return html`
            <div class="control ${this._status}" title=${this._message}>
                <div class="indicators">
                    <span class="indicator load">
                        <progress-spinner size="16"></progress-spinner>
                    </span>
                    <span class="indicator error">
                        <svg viewBox="0 0 24 24">
                            <path d="M12,1c6.071,-0 11,4.929 11,11c0,6.071 -4.929,11 -11,11c-6.071,-0 -11,-4.929 -11,-11c0,-6.071 4.929,-11 11,-11Zm1.809,5.642c-0,-0.977 -0.793,-1.77 -1.77,-1.77l-0.078,0c-0.977,0 -1.77,0.793 -1.77,1.77c0,0.977 0.793,1.77 1.77,1.77l0.078,0c0.977,0 1.77,-0.793 1.77,-1.77Zm-0.559,4.525c0,-0.69 -0.56,-1.25 -1.25,-1.25c-0.69,-0 -1.25,0.56 -1.25,1.25l0,5.907c0,0.69 0.56,1.25 1.25,1.25c0.69,-0 1.25,-0.56 1.25,-1.25l0,-5.907Z"/>
                        </svg>
                    </span>
                    <span class="indicator success">
                        <svg viewBox="0 0 24 24">
                            <path d="M12,1c6.071,0 11,4.929 11,11c0,6.071 -4.929,11 -11,11c-6.071,0 -11,-4.929 -11,-11c0,-6.071 4.929,-11 11,-11Zm6.126,7.307l-1.124,-1.124l-7.386,7.386l-2.618,-2.617l-1.124,1.124l3.742,3.741l8.51,-8.51Z"/>
                        </svg>
                    </span>
                </div>
                <span class="message">
                    ${this._message}
                </span>
            </div>
        `
    }

    public show(status: StatusTypes, message: string, dismiss: boolean = false) {
        this.updateStatus(status, message)

        window.clearTimeout(this._dismissTimeout)

        if (dismiss)
            this._dismissTimeout = window.setTimeout(this.hide.bind(this), 1000)
    }

    public hide() {
        this.updateStatus('idle', null)
    }

    private updateStatus(status: StatusTypes, message: string) {
        this._status = status
        this._message = message?.replace(/\r?\n/g, ' ')
    }
}