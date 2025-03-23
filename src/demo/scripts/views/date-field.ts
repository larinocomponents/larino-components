import '@larinonpm/components'
import { DateField } from '@larinonpm/components'

class View {
    private readonly _field: DateField
    private readonly _testBtn: HTMLButtonElement
    private readonly _debug: HTMLInputElement

    constructor() {
        this._field = document.querySelector('date-field')
        this._testBtn = document.querySelector('button#test')
        this._debug = document.querySelector('#debug')
        this.addEventListeners()
    }

    public test() {
    }

    private addEventListeners() {
        this._field.oninput = this.debug.bind(this)
        this._testBtn.onclick = this.testPopulation.bind(this)
    }

    private debug() {
        const date = this._field.value
        this._debug.value = date.toString()
    }

    private async testPopulation() {
        this._field.value = this._debug.value
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new View()
})