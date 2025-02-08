import { ConfirmDialog } from '@/components'

export class ConfirmDialogFactory {
    private static _instances = new Map<string, ConfirmDialog>()

    public static createOrSelect(key: string) {
        let instance = this._instances.get(key)

        if (!instance || !instance.isConnected) {
            instance = document.createElement('confirm-dialog') as ConfirmDialog
            document.body.appendChild(instance)
            this._instances.set(key, instance)
        }

        return instance
    }
}