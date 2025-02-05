import { FormItem } from '@/components'

export interface ValidationResult {
    valid: boolean
    message?: string
}

export declare function valid(): ValidationResult

export declare function invalid(message: string): ValidationResult

export declare function defaultItemValidator(value: any, item: FormItem): Promise<ValidationResult>
