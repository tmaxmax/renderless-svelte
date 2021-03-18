import { writable } from 'svelte/store'

/**
 * The store used to hold the tooltip's data.
 */
export const options = writable<any>(undefined)
/**
 * The store used to hold the tooltip's trigger element's dimensions.
 */
export const dimensions = writable<DOMRectReadOnly | undefined>(undefined)
