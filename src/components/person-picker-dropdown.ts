import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('person-picker-dropdown')
export class PersonPickerDropdown extends LitElement {
    static styles = css`
    #picker {
        border: solid 1px black;
        display: block;
    }

    #picker::slotted(person-item) {
        border-top: solid 1px rgb(0 0 0 / 30%);
    }
    `;

    @state()
    private _showPicker: boolean;

    show() {
        this._showPicker = true;
    }

    hide() {
        this._showPicker = false;
    }

    protected render() {
        if (!this._showPicker)
            return nothing;

        return html`
        <div id="picker">
            <slot></slot>
        </div>
        `;
    }
}