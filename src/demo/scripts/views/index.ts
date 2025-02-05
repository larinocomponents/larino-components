import '@larinonpm/components'
import { BoundForm, BoundSelect, DataGrid, FormItem, NumberField, SelectWrapper, TextField, defaultItemValidator } from '@larinonpm/components'

interface OptionType {
    id: number
    name: string
}

interface Person {
    name: string
    gender: number
    remarks?: string
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

    formItemDebug.onclick = () => {}

    formItem.onvalidate = async (value: any, item: FormItem) => {
        return defaultItemValidator(value, item)
    }

    formItem.onvalidated = async valid => {
        formItemDebug.innerText = `Valid: ${valid}`
    }

    // bound-form
    const boundForm = document.querySelector('#bound-form') as BoundForm<Person>
    const boundFormDebug = document.querySelector('#bound-form-debug') as HTMLSpanElement
    const disabledBFBtn = document.querySelector('#disable-bf-fname') as HTMLButtonElement
    const changeBFGender = document.querySelector('#change-bf-gender') as HTMLButtonElement

    const debugBoundForm = () => {
        boundFormDebug.innerText = `${JSON.stringify(boundForm.values)}\nValid: ${boundForm.valid}`
    }

    formItem.onchange = debugBoundForm.bind(this)
    boundForm.onvalidate = async (value: any, item: FormItem) => {
        return defaultItemValidator(value, item)
    }
    boundForm.onvalidated = debugBoundForm.bind(this)

    disabledBFBtn.onclick = () => boundForm.setFieldStates({ fullname: false })
    changeBFGender.onclick = () => boundForm.setFieldValues({ gender: 3 })

    // data-grid
    const dg1 = document.querySelector('#dg-1') as DataGrid<any>
    dg1.onRequestItems = async (top: number, skip: number) => ({
        count: 15,
        items: Array.from({length: 15}, (_, i) => ({
            prop1: `Value ${i+1}`,
            prop2: { name: `Name # ${i+1}` },
            prop3: i % 2 && `Property 3!`
        })).slice(skip, skip + top)
    })
    // dg1.onRequestItems = async (top: number, skip: number) => ({
    //     count: 0,
    //     items: []
    // })
    dg1.columnDefinitions = [
        {
            name: 'Column 1',
            navigation: 'prop1',
            horizontalAlignment: 'right',
            width: '300px'
        },
        {
            name: 'Column 2',
            navigation: 'prop2/name',
            horizontalAlignment: 'center'
        },
        {
            name: 'Column 3',
            navigation: 'prop1',
            map: (_, item) => item.prop3
        },
        {
            name: 'Custom Column',
            navigation: 'prop1',
            map: () => {
                const button = document.createElement('button')
                button.innerHTML = 'Click Me!'
                return button
            }
        }
    ]
    dg1.refresh()
})

function createOptions(prefix: string) {
    return Array.from({ length: 15 }, (_, i) => ({
        id: i+1,
        name: `${prefix} ${i+1}`
    }))
}