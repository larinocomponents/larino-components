declare module '@larinonpm/components/components/data-grid/data-grid-cell' {
  import { LitElement } from 'lit';
  import { GridColumnAlignment } from '@/components/data-grid/grid-column-definition';
  export class DataGridCell extends LitElement {
      static styles: import("lit").CSSResult;
      spacing: string;
      verticalAlignment: GridColumnAlignment;
      horizontalAlignment: GridColumnAlignment;
      render(): import("lit-html").TemplateResult<1>;
      private getControlStyle;
  }

}
declare module '@larinonpm/components/components/data-grid/data-grid-header' {
  import { LitElement } from 'lit';
  export class DataGridHeader extends LitElement {
      static styles: import("lit").CSSResult;
      render(): import("lit-html").TemplateResult<1>;
  }

}
declare module '@larinonpm/components/components/data-grid/data-grid' {
  import { LitElement, PropertyValues } from 'lit';
  import { GridColumnDefinition } from '@/components/data-grid/grid-column-definition';
  type RequestItemsCallback<T> = (top: number, skip: number) => Promise<RequestItemsResult<T>>;
  type InvokeCallback<T> = (item: T) => void;
  export interface RequestItemsResult<T> {
      count: number;
      items: T[];
  }
  export class DataGrid<T> extends LitElement {
      static styles: import("lit").CSSResult;
      private _onRequestItems?;
      private _invokable;
      private _onInvoke;
      private _count;
      private _pagination;
      definitions: GridColumnDefinition<T>[];
      set onRequestItems(callback: RequestItemsCallback<T>);
      set onInvoke(callback: InvokeCallback<T>);
      render(): import("lit-html").TemplateResult<1>;
      refresh(): Promise<void>;
      protected updated(changes: PropertyValues): void;
      private renderHeader;
      private updateWidths;
      private renderItems;
      private renderRow;
      private renderColumn;
      private setInvokable;
  }
  export {};

}
declare module '@larinonpm/components/components/data-grid/grid-column-definition' {
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

}
declare module '@larinonpm/components/components/data-grid/index' {
  export * from '@larinonpm/components/components/data-grid/grid-column-definition';
  export * from '@larinonpm/components/components/data-grid/data-grid-header';
  export * from '@larinonpm/components/components/data-grid/data-grid-cell';
  export * from '@larinonpm/components/components/data-grid/data-grid';

}
declare module '@larinonpm/components/components/dialogs/base-dialog' {
  import { LitElement, CSSResultGroup, TemplateResult } from 'lit';
  export abstract class BaseDialog extends LitElement {
      static styles: CSSResultGroup;
      private _dialog;
      width?: string;
      height?: string;
      render(): TemplateResult<1>;
      show(): Promise<void>;
      close(): void;
      protected abstract renderContent(): TemplateResult;
      protected dismissed(): void;
      protected closed(): void;
      private dismiss;
      private resolveSize;
  }

}
declare module '@larinonpm/components/components/dialogs/confirm-dialog' {
  import { BaseDialog } from '@larinonpm/components/components/dialogs/base-dialog';
  export class ConfirmDialog extends BaseDialog {
      static styles: import("lit").CSSResultGroup[];
      private _response?;
      title: string;
      message: string;
      private critical;
      renderContent(): import("lit-html").TemplateResult<1>;
      static show(title: string, message: string, critical?: boolean): Promise<string>;
      protected dismissed(): void;
      protected closed(): void;
      private respond;
  }

}
declare module '@larinonpm/components/components/dialogs/index' {
  export * from '@larinonpm/components/components/dialogs/modal-dialog';
  export * from '@larinonpm/components/components/dialogs/confirm-dialog';

}
declare module '@larinonpm/components/components/dialogs/modal-dialog' {
  import { BaseDialog } from '@larinonpm/components/components/dialogs/base-dialog';
  export class ModalDialog extends BaseDialog {
      static styles: import("lit").CSSResultGroup[];
      renderContent(): import("lit-html").TemplateResult<1>;
  }

}
declare module '@larinonpm/components/components/form/bound-form' {
  import { LitElement } from 'lit';
  import { ValidationResult } from '@/utilities';
  import { FormItem } from '@larinonpm/components/components/form/index';
  export class BoundForm<T> extends LitElement {
      private readonly _items;
      private _initialValues;
      private _values;
      private _valid;
      private _updatedFields;
      private _fieldUpdateDebounce;
      private _onvalidate?;
      private _onvalidated?;
      constructor();
      set initialValues(values: Partial<T>);
      get values(): T;
      get valid(): boolean;
      set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>);
      set onvalidated(callback: (valid: boolean) => Promise<void>);
      render(): import("lit-html").TemplateResult<1>;
      firstUpdated(): void;
      setFieldValues(values: Partial<T>): void;
      setFieldValue(field: string, value: any): void;
      setFieldStates(states: {
          [field: string]: boolean;
      }): void;
      setFieldState(field: string, state: boolean): void;
      reset(): void;
      private registerItems;
      private attachEventListeners;
      private onChange;
      private updateField;
      private onItemValidated;
  }

}
declare module '@larinonpm/components/components/form/controls/bound-select' {
  import { LitElement, PropertyValues } from 'lit';
  export class BoundSelect<T> extends LitElement {
      static styles: import("lit").CSSResult;
      private _value;
      private _controlText;
      private _options;
      private _control;
      valueProp: string;
      textProp: string;
      placeholder: string;
      disabled: boolean;
      get value(): string;
      set value(value: string);
      get valueAsNumber(): number;
      set valueAsNumber(value: number);
      get selectedText(): string;
      render(): import("lit-html").TemplateResult<1>;
      updated(changes: PropertyValues): void;
      setOptions(options: T[]): void;
      clear(): void;
      private renderSelectOptions;
      private onChangeEvent;
      private handleChange;
      private updateDisplay;
  }

}
declare module '@larinonpm/components/components/form/controls/checkbox-wrapper' {
  import { LitElement } from 'lit';
  export class CheckboxWrapper extends LitElement {
      static styles: import("lit").CSSResult;
      private _control;
      private _value;
      get value(): boolean;
      set value(value: boolean);
      render(): import("lit-html").TemplateResult<1>;
      firstUpdated(): void;
      private attachControl;
      private attachEventListener;
      private onChangeEvent;
      private updateValue;
  }

}
declare module '@larinonpm/components/components/form/controls/date-field' {
  import { LitElement } from 'lit';
  export class DateField extends LitElement {
      static styles: import("lit").CSSResult;
      private _value;
      private _control;
      placeholder: string;
      disabled: boolean;
      get value(): string;
      set value(value: string);
      render(): import("lit-html").TemplateResult<1>;
      private onInput;
  }

}
declare module '@larinonpm/components/components/form/controls/index' {
  export * from '@larinonpm/components/components/form/controls/bound-select';
  export * from '@larinonpm/components/components/form/controls/checkbox-wrapper';
  export * from '@larinonpm/components/components/form/controls/date-field';
  export * from '@larinonpm/components/components/form/controls/number-field';
  export * from '@larinonpm/components/components/form/controls/select-wrapper';
  export * from '@larinonpm/components/components/form/controls/text-field';

}
declare module '@larinonpm/components/components/form/controls/number-field' {
  import { LitElement } from 'lit';
  export class NumberField extends LitElement {
      static styles: import("lit").CSSResult;
      private _value;
      private _control;
      min: string;
      steps: string;
      placeholder: string;
      disabled: boolean;
      get value(): number;
      set value(value: number);
      render(): import("lit-html").TemplateResult<1>;
      private onInput;
  }

}
declare module '@larinonpm/components/components/form/controls/select-wrapper' {
  import { LitElement } from 'lit';
  export class SelectWrapper extends LitElement {
      static styles: import("lit").CSSResult;
      private _value;
      private _control;
      private _controlText;
      placeholder: string;
      get value(): string;
      set value(value: string);
      get valueAsNumber(): number;
      set valueAsNumber(value: number);
      render(): import("lit-html").TemplateResult<1>;
      firstUpdated(): void;
      private attachControl;
      private attachEventListener;
      private onChangeEvent;
      private updateDisplay;
  }

}
declare module '@larinonpm/components/components/form/controls/text-field' {
  import { LitElement } from 'lit';
  export class TextField extends LitElement {
      static styles: import("lit").CSSResult;
      private _value;
      private _control;
      placeholder: string;
      pattern?: string;
      maxLines: number;
      disabled: boolean;
      get value(): string;
      set value(value: string);
      render(): import("lit-html").TemplateResult<1>;
      private onKeyDown;
      private onInput;
  }

}
declare module '@larinonpm/components/components/form/form-item' {
  import { LitElement, PropertyValues } from 'lit';
  import { ValidationResult } from '@/utilities';
  export class FormItem extends LitElement {
      static styles: import("lit").CSSResult;
      private _control;
      private _initialValue;
      private _value;
      private _onvalidate?;
      private _valid;
      private _onvalidated?;
      name: string;
      label?: string;
      valuePropName: string;
      trigger: string;
      required: boolean;
      disabled: boolean;
      set initialValue(value: any);
      get value(): any;
      set value(value: any);
      get valid(): boolean;
      render(): import("lit-html").TemplateResult<1>;
      set onvalidate(callback: (value: any, item: FormItem) => Promise<ValidationResult>);
      set onvalidated(callback: (valid: boolean) => Promise<void>);
      firstUpdated(): void;
      updated(changes: PropertyValues): void;
      reset(): void;
      private attachControl;
      private attachEventListener;
      private onTrigger;
      private resolveValue;
      private setControlValue;
      private validate;
  }

}
declare module '@larinonpm/components/components/form/index' {
  export * from '@larinonpm/components/components/form/controls/index';
  export * from '@larinonpm/components/components/form/form-item';
  export * from '@larinonpm/components/components/form/bound-form';

}
declare module '@larinonpm/components/components/index' {
  export * from '@larinonpm/components/components/data-grid/index';
  export * from '@larinonpm/components/components/dialogs/index';
  export * from '@larinonpm/components/components/form/index';
  export * from '@larinonpm/components/components/progress/index';
  export * from '@larinonpm/components/components/strips/index';

}
declare module '@larinonpm/components/components/progress/index' {
  export * from '@larinonpm/components/components/progress/progress-spinner';

}
declare module '@larinonpm/components/components/progress/progress-spinner' {
  import { LitElement } from 'lit';
  export class ProgressSpinner extends LitElement {
      static styles: import("lit").CSSResult;
      private _path;
      private _c;
      private _r;
      size: number;
      color: string;
      constructor();
      render(): import("lit-html").TemplateResult<1>;
      protected updated(changes: Map<string, any>): void;
      private updateSize;
  }

}
declare module '@larinonpm/components/components/strips/index' {
  export * from '@larinonpm/components/components/strips/pagination-strip';
  export * from '@larinonpm/components/components/strips/status-strip';

}
declare module '@larinonpm/components/components/strips/pagination-strip' {
  import { LitElement, PropertyValues } from 'lit';
  export class PaginationStrip extends LitElement {
      static styles: import("lit").CSSResult;
      private _maxPage;
      private _eventQueue;
      private _lines;
      private _page;
      private _start;
      private _end;
      total: number;
      get lines(): number;
      get page(): number;
      render(): import("lit-html").TemplateResult<1>;
      protected updated(changes: PropertyValues): void;
      private updateLines;
      private calculatePages;
      private navigate;
      private updatePage;
      private notifyEvent;
  }

}
declare module '@larinonpm/components/components/strips/status-strip' {
  import '@/components/progress/progress-spinner';
  import { LitElement } from 'lit';
  export type StatusTypes = 'idle' | 'loading' | 'error' | 'success';
  export class StatusStrip extends LitElement {
      static styles: import("lit").CSSResult;
      private _dismissTimeout;
      private _status;
      private _message;
      render(): import("lit-html").TemplateResult<1>;
      show(status: StatusTypes, message: string, dismiss?: boolean): void;
      hide(): void;
      private updateStatus;
  }

}
declare module '@larinonpm/components/decorators/custom-component' {
  import { LitElement } from 'lit';
  export function customComponent(name: string): <T extends {
      new (...args: any[]): LitElement;
  }>(constructor: T) => void;

}
declare module '@larinonpm/components/decorators/index' {
  export * from '@larinonpm/components/decorators/custom-component';

}
declare module '@larinonpm/components/index' {
  export * from '@larinonpm/components/components/index';
  export * from '@larinonpm/components/utilities/validation-result';

}
declare module '@larinonpm/components/utilities/confirm-dialog-factory' {
  import { ConfirmDialog } from '@/components';
  export class ConfirmDialogFactory {
      private static _instances;
      static createOrSelect(key: string): ConfirmDialog;
  }

}
declare module '@larinonpm/components/utilities/form-item-collection' {
  import { FormItem } from '@/components';
  export class FormItemCollection {
      private readonly _items;
      constructor();
      /**
       * Adds an item to the collection if does not exists.
       * @returns Returns true if the item is added, otherwise false.
       */
      add(item: FormItem): boolean;
      /**
       * Returns the specified item from the collection.
       * @returns Returns the item associated with the specified name
       * or undefined if not found.
       */
      get(name: string): FormItem;
      /**
       * Checks if any item in the collection satisfies the
       * provided predicate.
       * @returns Returns true if any item satisfies
       * the predicate, otherwise false.
       */
      some(predicate: (item: FormItem) => boolean): boolean;
      /**
       * Checks if all items in the collection satisfies the
       * provided predicate.
       * @returns Returns true if all items satisfies
       * the predicate, otherwise false.
       */
      all(predicate: (item: FormItem) => boolean): boolean;
      /**
       * Itterate through all items in the collection and runs th
       * provided predicate.
       */
      each(predicate: (item: FormItem) => void): void;
      debug(): void;
  }

}
declare module '@larinonpm/components/utilities/index' {
  export * from '@larinonpm/components/utilities/confirm-dialog-factory';
  export * from '@larinonpm/components/utilities/string-utilities';
  export * from '@larinonpm/components/utilities/validation-result';
  export * from '@larinonpm/components/utilities/form-item-collection';

}
declare module '@larinonpm/components/utilities/string-utilities' {
  export const isNullOrEmpty: (value: string) => boolean;
  export const isNullOrWhitespace: (value: string) => boolean;
  export const isNumber: (v: string) => boolean;

}
declare module '@larinonpm/components/utilities/validation-result' {
  import { FormItem } from '@/components';
  export interface ValidationResult {
      valid: boolean;
      message?: string;
  }
  export function valid(): ValidationResult;
  export function invalid(message: string): ValidationResult;
  export function defaultItemValidator(value: any, item: FormItem): Promise<ValidationResult>;

}
declare module '@larinonpm/components' {
  import main = require('@larinonpm/components/index');
  export = main;
}