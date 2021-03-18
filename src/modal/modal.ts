import { get } from 'svelte/store'
import { open, payload } from './stores'

/**
 * Resolver for the promise created when the modal
 * was opened.
 */
let resolveModal: (value: any) => void

/**
 * Opens the modal with the given data.
 *
 * @param data
 * @returns A promise that is resolved when the modal is closed.
 * It holds the provided data.
 */
export function openModal<T>(data: T): Promise<T> {
  open.set(true)
  payload.set(data)
  return new Promise<T>(resolve => {
    resolveModal = resolve
  })
}

/**
 * Closes the modal.
 */
export function closeModal() {
  if (get(open)) {
    open.set(false)
    resolveModal(get(payload))
  }
}
