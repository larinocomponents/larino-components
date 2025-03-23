import '@larinonpm/components'
import { BoundSelect } from '@larinonpm/components'

interface Options {
    id: string
    value: string
}

const wait = (duration: number) => new Promise<void>(resolve => window.setTimeout(() => resolve(), duration ?? 0))

class View {
    private readonly _select: BoundSelect<Options>
    private readonly _testBtn: HTMLButtonElement

    constructor() {
        this._select = document.querySelector('bound-select')
        this._testBtn = document.querySelector('button#test')
        this.addEventListeners()
    }

    public test() {
        this._select.value = '5'
    }

    private addEventListeners() {
        this._testBtn.onclick = this.testPopulation.bind(this)
    }

    private async testPopulation() {
        await wait(2000)

        const data: Options[] = Array.from({length: 10}, (_, i) => ({
            id: i.toString(),
            value: `Option ${i + 1}`
        }))

        this._select.setOptions(data)
        alert('Done!')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const view = new View()
    view.test()
})