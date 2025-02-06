import '@larinonpm/components'

import { ModalDialog } from '@larinonpm/components'

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('modal-dialog') as ModalDialog
    const showModalBtn = document.querySelector('#show-modal-button') as HTMLButtonElement

    showModalBtn.onclick = () => dialog.show()
    dialog.onclose = () => console.log('Dialog closed')
})