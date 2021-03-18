import { writable } from 'svelte/store'

/**
 * The current state of the modal.
 */
export const open = writable(false)

/**
 * The current data in the modal.
 */
export const payload = writable<any>(undefined)
