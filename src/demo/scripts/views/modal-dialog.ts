import '@larinonpm/components'

import { ConfirmDialog, ModalDialog, StatusStrip } from '@larinonpm/components'

document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('modal-dialog') as ModalDialog
    const showModalBtn = document.querySelector('#show-modal-button') as HTMLButtonElement

    showModalBtn.onclick = () => dialog.show()
    dialog.onclose = () => console.log('Dialog closed')

    const showConfirmBtn = document.querySelector('#show-confirm-button') as HTMLButtonElement
    showConfirmBtn.onclick = async () => {
        const response = await ConfirmDialog.show('Delete this user?', 'The user will be removed from the system.\nThis action cannot be undone.')
        console.log(response)
    }

    // Status Strip
    const statusStrip = document.querySelector('status-strip') as StatusStrip
    const showLoadingBtn = document.querySelector('#show-loading') as HTMLButtonElement
    const showSuccessBtn = document.querySelector('#show-success') as HTMLButtonElement
    const showErrorBtn = document.querySelector('#show-error') as HTMLButtonElement

    showLoadingBtn.onclick = () => statusStrip.show('loading', 'Loading...')
    showSuccessBtn.onclick = () => statusStrip.show('success', 'Success!', true)
    showErrorBtn.onclick = () => statusStrip.show('error', 'Error!')
})