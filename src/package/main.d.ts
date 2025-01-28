import { LitElement } from 'lit'

// Form
declare interface ValidationResult {
    valid: boolean,
    message?: string
}

declare function valid(): ValidationResult

declare function invalid(message: string): ValidationResult

declare function defaultItemValidator(value: any, item: FormItem): Promise<ValidationResult>

declare class TextField extends LitElement {
  type: string
  placeholder: string
  disabled: boolean
  value: string
}

declare class NumberField extends LitElement {
  min: string
  steps: string
  placeholder: string
  disabled: boolean
  value: string
}

declare class SelectWrapper extends LitElement {
  placeholder: string
  value: string
  valueAsNumber: string
}

declare class BoundSelect<T> extends LitElement {
  valueProp: string
  textProp: string
  placeholder: string
  disabled: boolean
  value: string
  valueAsNumber: string
  selectedText: string
  setOptions(options: T[]): void
  clear(): void
}

declare class CheckboxWrapper extends LitElement {
  value: boolean
}

declare class FormItem extends LitElement {
  name: string
  label: string
  valuePropName: string
  trigger: string
  required: boolean
  disabled: boolean
  value: any
  get valid(): boolean
  set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>)
  set onvalidated(callback: (valid: boolean) => Promise<void>)
  reset(): void
}

declare class BoundForm<T> extends LitElement {
  set initialValues(values: Partial<T>)
  get values(): T
  get valid(): boolean
  set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>)
  set onvalidated(callback: (valid: boolean) => Promise<void>)
  setFieldValues(values: Partial<T>): void
  setFieldValue(field: string, value: any): void
  setFieldStates(states: {[field: string]: boolean}): void
  setFieldState(field: string, state: boolean): void
  reset(): void
}

// Data-grid
declare type GridColumnValueMapper<T> = (raw: any, item: T, index: number) => any | HTMLElement

declare type GridViewHorizontalAlignment = 'left' | 'center' | 'right'

declare type GridViewVerticalAlignment = 'top' | 'middle' | 'bottom'

declare type GridColumnRenderCallback = (column: DataGridCell) => void

declare type RequestItemsCallback<T> = (top: number, skip: number) => Promise<RequestItemsResult<T>>

declare interface RequestItemsResult<T> {
    count: number
    items: T[]
}

declare type InvokeCallback<T> = (item: T) => void

declare interface GridColumnDefinition<T> {
  navigation?: string
  name?: string
  width?: string
  horizontalAlignment?: GridViewHorizontalAlignment,
  verticalAlignment?: GridViewVerticalAlignment
  map?: GridColumnValueMapper<T>
  onRender?: GridColumnRenderCallback
}

declare class DataGrid<T> extends LitElement {
  set columnDefinitions(value: GridColumnDefinition<T>[])
  set onRequestItems(callback: RequestItemsCallback<T>)
  set onInvoke(callback: InvokeCallback<T>)
  refresh(): Promise<void>
  reset(): void
}

declare class DataGridCell extends LitElement {}

declare class PaginationStrip extends LitElement {
  total: number
  get lines(): number
  get page(): number
}

declare global {
  interface HTMLElementTagNameMap {
    'text-field': TextField
    'number-field': NumberField
    'select-wrapper': SelectWrapper
    'bound-select': BoundSelect<any>
    'checkbox-wrapper': CheckboxWrapper
    'form-item': FormItem
    'data-grid': DataGrid<any>
    'data-grid-cell': DataGridCell
    'pagination-strip': PaginationStrip
  }
}