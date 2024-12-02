import '@larino/components'

import { TextField } from '@larino/components'

document.addEventListener('DOMContentLoaded', () => {
    const textField = document.querySelector('#text-field') as TextField
    textField.oninput = () => {
        console.log(textField.value)
    }
})