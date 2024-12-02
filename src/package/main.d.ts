import { SimpleGreeting } from './components'

declare global {
  interface HTMLElementTagNameMap {
    'simple-greeting': SimpleGreeting
  }
}