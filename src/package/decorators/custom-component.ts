import { LitElement } from 'lit'

export function customComponent(name: string) {
    return function <T extends { new(...args: any[]): LitElement }>(constructor: T) {
        if (!customElements.get(name)) {
            window.customElements.define(name, constructor);
        }
    }
}