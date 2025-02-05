import { LitElement } from 'lit';
export declare function customComponent(name: string): <T extends {
    new (...args: any[]): LitElement;
}>(constructor: T) => void;
