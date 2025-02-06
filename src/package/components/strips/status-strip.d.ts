import '@/components/progress/progress-spinner';
import { LitElement } from 'lit';
export type StatusTypes = 'idle' | 'loading' | 'error' | 'success';
export declare class StatusStrip extends LitElement {
    static styles: import("lit").CSSResult;
    private _dismissTimeout;
    private _status;
    private _message;
    render(): import("lit").TemplateResult<1>;
    show(status: StatusTypes, message: string, dismiss?: boolean): void;
    hide(): void;
    private updateStatus;
}
