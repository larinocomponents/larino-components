import { FormItem } from '@/components';
export declare class FormItemCollection {
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
