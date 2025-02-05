export type GridColumnAlignment = 'start' | 'center' | 'end';
export type GridColumnMapper<T> = (raw: any, item: T, index: number) => any | HTMLElement;
export interface GridColumnDefinition<T> {
    name?: string;
    navigation?: string;
    horizontalAlignment?: GridColumnAlignment;
    verticalAlignment?: GridColumnAlignment;
    spacing?: string;
    width?: string;
    map?: GridColumnMapper<T>;
}
