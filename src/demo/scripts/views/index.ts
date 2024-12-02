import 'larino-components'

document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.createElement('simple-greeting')
    greeting.name = 'Sample!'
    document.body.append(greeting)
})