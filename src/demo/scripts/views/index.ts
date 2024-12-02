import '@larino/components'
import { BoundSelect, SelectWrapper, TextField } from '@larino/components'

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
})

function createOptions(prefix: string) {
    return Array.from({ length: 15 }, (_, i) => ({
        id: i+1,
        name: `${prefix} ${i+1}`
    }))
}