export const isNullOrEmpty = (value: string) => {
    return value == null || value === ''
}

export const isNullOrWhitespace = (value: string) => {
    return isNullOrEmpty(value?.trim()) 
}

export const isNumber = (v: string) => Number.isFinite(+v)