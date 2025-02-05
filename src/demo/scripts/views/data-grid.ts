import '@larinonpm/components'

import { DataGrid } from '@larinonpm/components'

document.addEventListener('DOMContentLoaded', () => {
    const dg1 = document.querySelector('#dg-1') as DataGrid<any>

    dg1.onRequestItems = async (top: number, skip: number) => new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve({
                count: 15,
                items: Array.from({length: 15}, (_, i) => ({
                    prop1: `Value ${i+1}`,
                    prop2: { name: `Name # ${i+1}` },
                    prop3: i % 2 && `Property 3!`
                })).slice(skip, skip + top)
            })
        }, 0)
    })

    dg1.definitions = [
        {
            name: 'Column 1',
            navigation: 'prop1',
            horizontalAlignment: 'end',
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
            spacing: '0',
            map: () => {
                const button = document.createElement('button')
                button.innerHTML = 'Click Me!'
                return button
            }
        }
    ]

    dg1.refresh()
})