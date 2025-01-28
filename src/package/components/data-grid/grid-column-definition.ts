import { DataGridCell } from './data-grid-cell'

type GridColumnValueMapper<T> = (raw: any, item: T, index: number) => any | HTMLElement

type GridColumnRenderCallback = (column: DataGridCell) => void

type GridViewVerticalAlignment = 'top' | 'middle' | 'bottom'

type GridViewHorizontalAlignment = 'left' | 'center' | 'right'

export interface GridColumnDefinition<T> {
    navigation?: string
    name?: string
    width?: string
    horizontalAlignment?: GridViewHorizontalAlignment,
    verticalAlignment?: GridViewVerticalAlignment
    map?: GridColumnValueMapper<T>
    onRender?: GridColumnRenderCallback
    // sortable?: boolean,
    // defaultSorting?: GridSorting
}