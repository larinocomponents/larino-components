import { FormItem } from '@/components'

export class FormItemCollection {
    private readonly _items: Map<string, FormItem>

    constructor() {
        this._items = new Map()
    }

    /**
     * Adds an item to the collection if does not exists.
     * @returns Returns true if the item is added, otherwise false.
     */
    public add(item: FormItem): boolean {
        const exists = this._items.has(item.name)
        if (!exists) this._items.set(item.name, item)
        return !exists
    }

    /**
     * Returns the specified item from the collection.
     * @returns Returns the item associated with the specified name
     * or undefined if not found.
     */
    public get(name: string): FormItem {
        return this._items.get(name)
    }

    /**
     * Checks if any item in the collection satisfies the
     * provided predicate.
     * @returns Returns true if any item satisfies
     * the predicate, otherwise false.
     */
    public some(predicate: (item: FormItem) => boolean) {
        for (const item of this._items.values()) {
            if (predicate(item))
                return true
        }
        return false
    }

    /**
     * Checks if all items in the collection satisfies the
     * provided predicate.
     * @returns Returns true if all items satisfies
     * the predicate, otherwise false.
     */
    public all(predicate: (item: FormItem) => boolean) {
        for (const item of this._items.values()) {
            if (!predicate(item))
                return false
        }
        return true
    }

    /**
     * Itterate through all items in the collection and runs th 
     * provided predicate.
     */
    public each(predicate: (item: FormItem) => void) {
        for (const item of this._items.values()) {
            predicate(item)
        }
    }

    public debug() {
        for (const item of this._items.values()) {
            console.log(item.name, item.value, item.valid)
        }
    }
}