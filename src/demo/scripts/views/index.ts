import '@larinonpm/components'
import { valid, invalid, BoundSelect, FormItem, NumberField, SelectWrapper, TextField } from '@larinonpm/components'

interface OptionType {
    id: number
    name: string
}

document.addEventListener('DOMContentLoaded', () => {
    const textField = document.querySelector('#text-field') as TextField
    const selectWrapper = document.querySelector('#select-wrapper') as SelectWrapper
    const boundSelect = document.querySelector('#bound-select') as BoundSelect<OptionType>
    const changeOptionsBtn = document.querySelector('#change-options') as HTMLButtonElement
    const clearOptionsBtn = document.querySelector('#clear-options') as HTMLButtonElement
    const numberField = document.querySelector('#number-field') as NumberField

    textField.oninput = () => {
        console.log(textField.value)
    }

    selectWrapper.onchange = () => {
        console.log(selectWrapper.value, selectWrapper.valueAsNumber)
    }

    boundSelect.onchange = () => console.log(boundSelect.value)
    boundSelect.setOptions(createOptions(`Bound Option`))
    changeOptionsBtn.onclick = () => {
        boundSelect.setOptions(createOptions(`New Option`))
    }
    clearOptionsBtn.onclick = () => boundSelect.clear()

    numberField.oninput = () => console.log('number-field:', numberField.value)


    // form-item
    const formItem = document.querySelector('#form-item') as FormItem
    const formItemDebug = document.querySelector('#form-item-debug') as HTMLSpanElement

    formItem.onvalidate = async (value: any, item: FormItem) => {
        return defaultItemValidator(value, item)
    }

    formItem.onvalidated = async valid => {
        formItemDebug.innerText = `Valid: ${valid}`
    }
})

function createOptions(prefix: string) {
    return Array.from({ length: 15 }, (_, i) => ({
        id: i+1,
        name: `${prefix} ${i+1}`
    }))
}

async function defaultItemValidator(value: any, item: FormItem) {
    console.log(item.required)
    return (!item.required || value != null)
        ? valid()
        : invalid('Field is required!')
}