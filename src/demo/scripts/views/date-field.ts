import '@larinonpm/components'

import { DateField } from '@larinonpm/components'

document.addEventListener('DOMContentLoaded', () => {
    const df = document.querySelector('date-field') as DateField
    const debugSpan = document.querySelector('#debug') as HTMLSpanElement

    df.oninput = () => {
        const date = df.value
        debugSpan.innerText = date.toString()
    }
})