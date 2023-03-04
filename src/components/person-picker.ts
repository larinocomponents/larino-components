import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Ref, ref, createRef } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import { PersonPickerDropdown } from './person-picker-dropdown';

@customElement('person-picker')
export class PersonPicker extends LitElement {
    static styles = css`
    :host {
        display: inline-block;
        width: 200px;
    }

    #input {
        border: solid 1px black;
        position: relative;
    }

    #input
    span {
        box-sizing: border-box;
        font-family: monospace;
        font-size: 14px;
        line-height: 18px;
        max-width: 100%;
        overflow-y: auto;
        padding: 5px 15px;
        width: 100%;
    }

    #filter {
        -ms-overflow-style: none;
        display: block;
        outline: none;
        scrollbar-width: none;
        white-space: nowrap;
    }

    #filter::-webkit-scrollbar{
        display: none;
    }

    #placeholder {
        color: #bdbdbd;
        display: none;
        left: 0;
        position: absolute;
        top: 0;
        z-index: -1;
    }

    #placeholder.visible {
        display: block;
    }
    `;

    filterRef: Ref<HTMLSpanElement> = createRef();
    pickerRef: Ref<PersonPickerDropdown> = createRef();

    @property()
    placeholder: string;

    @state()
    private _debounce: number;

    @state()
    private _placeholderClasses = { visible: true };

    protected render() {
        return html`
        <div id="input">
            <span id="filter"
                ${ref(this.filterRef)}"
                @input="${this.handleFilterInputEvent}"
                @click="${this.handleFilterClickEvent}"
                contenteditable="true">
            </span>
            <span id="placeholder"
                class="${classMap(this._placeholderClasses)}">
                ${this.placeholder}
            </span>
        </div>
        <person-picker-dropdown ${ref(this.pickerRef)}>
            <slot></slot>
        </person-picker-dropdown>
        `;
    }

    private handleFilterInputEvent() {
        const filterRef = this.filterRef.value;
        const value = filterRef.textContent;
        const empty = value.length === 0;

        this.togglePicker(!empty);
        this._placeholderClasses.visible = empty;

        if (this._debounce)
            window.clearTimeout(this._debounce);

        this._debounce = window.setTimeout(() => this.onFilterInput(value), 200);
    }

    private handleFilterClickEvent() {
        this.togglePicker(true);
        document.addEventListener('click', this.handlePickerDismiss);
    }

    private onFilterInput(value: string) {
        const eventDetail =  { filter: value };
        const event = new CustomEvent('filter', {
            detail: eventDetail
        });

        this.dispatchEvent(event);
    }

    private togglePicker(show: boolean) {
        if (show)
            this.pickerRef.value.show();
        else
            this.pickerRef.value.hide();
    }

    // Arrow function binds "this" to this component.
    private handlePickerDismiss = (e: MouseEvent) => {
        if (e.target === this)
            return;

        this.togglePicker(false);
        document.removeEventListener('click', this.handlePickerDismiss);
    }
}