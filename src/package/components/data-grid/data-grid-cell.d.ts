import { LitElement, PropertyValues } from 'lit';
import { GridColumnAlignment } from '@/components/data-grid/grid-column-definition';
export declare class DataGridCell extends LitElement {
    static styles: import("lit").CSSResult;
    spacing: string;
    verticalAlignment: GridColumnAlignment;
    horizontalAlignment: GridColumnAlignment;
    render(): import("lit").TemplateResult<1>;
    protected updated(changes: PropertyValues): void;
}
