import observer from './observer'
import { options } from './stores'
import { event } from './util'

/**
 * Exclude `undefined` from `T`.
 */
type Defined<T> = T extends undefined ? never : T

/**
 * An action used to associate a tooltip with a given element.
 * Use the `opts` parameter to pass additional data for the
 * tooltip, or else make it `null`.
 *
 * @param element The element to associate the tooltip with.
 * @param opts Additional data for the tooltip. Shall not be
 * `undefined`!
 */
export function tooltip<T>(element: HTMLElement, opts: Defined<T>) {
  if (typeof observer === 'undefined') {
    throw new Error('Missing instantiation of tooltip component')
  }

  let currentOptions = opts
  let running = true

  async function handler() {
    while (running) {
      await event(element, 'mouseover')
      observer!.observe(element)
      options.set(currentOptions)
      await event(element, 'mouseout')
      observer!.unobserve(element)
      options.set(undefined)
    }
  }

  handler()

  return {
    destroy() {
      running = false
    },
    update(opts: Defined<T>) {
      currentOptions = opts
    },
  }
}
