import { FormItem } from '@/components'

export interface ValidationResult {
    valid: boolean,
    message?: string
}

export function valid(): ValidationResult {
    return { valid: true }
}

export function invalid(message: string): ValidationResult {
    return  { valid: false, message }
}

export async function defaultItemValidator (value: any, item: FormItem) {
    return (!item.required || value != null)
        ? valid()
        : invalid('Field is required!')
}