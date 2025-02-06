import '@larinonpm/components'

import { ModalDialog, StatusStrip } from '@larinonpm/components'

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('modal-dialog') as ModalDialog
    const showModalBtn = document.querySelector('#show-modal-button') as HTMLButtonElement

    showModalBtn.onclick = () => dialog.show()
    dialog.onclose = () => console.log('Dialog closed')

    // Status Strip
    const statusStrip = document.querySelector('status-strip') as StatusStrip
    const showLoadingBtn = document.querySelector('#show-loading') as HTMLButtonElement
    const showSuccessBtn = document.querySelector('#show-success') as HTMLButtonElement
    const showErrorBtn = document.querySelector('#show-error') as HTMLButtonElement

    showLoadingBtn.onclick = () => statusStrip.show('loading', 'Loading...')
    showSuccessBtn.onclick = () => statusStrip.show('success', 'Success!', true)
    showErrorBtn.onclick = () => statusStrip.show('error', 'Error!')
})