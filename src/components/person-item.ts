import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('person-item')
export class PersonItem extends LitElement {
    static styles = css`
    :host {
        --photo-size: 30px;
        --spacing: 5px;
    }

    :host {
        cursor: default;
        display: flex;
        font-family: sans-serif;
        height: 35px;
        gap: var(--spacing);
        padding: var(--spacing);
    }

    :host(:hover) {
        background-color: #eee;
    }

    .container {
        display: flex;
        justify-content: center;
    }
    
    #photo-container {
        align-items: center;
    }

    #photo {
        border-radius: 50%;
        height: var(--photo-size);
        overflow: hidden;
        width: var(--photo-size);
    }

    #photo img {
        height: 100%;
    }

    #info-container {
        flex-direction: column;
        flex-grow: 1;
        gap: 3px;
    }

    #display-name {
        font-size: 14px;
        line-height: 14px;
    }
    
    #additional-info {
        color: rgb(0 0 0 / 50%);
        font-size: 13px;
        line-height: 13px;
    }
    `;

    @property()
    photo: string;

    @property({ attribute: 'display-name' })
    displayName: string;

    @property()
    additional: string;

    photoTemplate() {
        if (!this.photo)
            return nothing;

        return html`
        <div id="photo-container" class="container">
            <div id="photo">
                <img src="${this.photo}" />
            </div>
        </div>
        `;
    }

    additionalTemplate() {
        if (!this.additional)
            return nothing;

        return html`<span id="additional-info">${this.additional}</span>`;
    }

    protected render() {
        return html`
        ${this.photoTemplate()}
        <div id="info-container" class="container">
            <span id="display-name">${this.displayName}</span>
            ${this.additionalTemplate()}
        </div>
        `;
    }
}