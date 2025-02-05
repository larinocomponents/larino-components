type GridColumnMapper<T> = (raw: any, item: T, index: number) => any | HTMLElement

type GridColumnAlignment = 'start' | 'center' | 'end'

export interface GridColumnDefinition<T> {
    name?: string
    navigation?: string
    horizontalAlignment?: GridColumnAlignment
    verticalAlignment?: GridColumnAlignment
    spacing?: number
    width?: string
    map?: GridColumnMapper<T>
}