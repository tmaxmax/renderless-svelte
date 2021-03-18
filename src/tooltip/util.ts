type EvKey = keyof HTMLElementEventMap
type Ev<T extends EvKey> = HTMLElementEventMap[T]

export function event<T extends EvKey>(
  element: HTMLElement,
  event: T
): Promise<Ev<T>> {
  return new Promise(resolve => {
    function callback(this: HTMLElement, ev: Ev<T>) {
      element.removeEventListener(event, callback)
      resolve(ev)
    }

    element.addEventListener(event, callback)
  })
}

/**
 * Generates a threshold array to be used with the IntersectionObserver API,
 * all at equal intervals.
 *
 * @param steps The number of steps to generate.
 * @returns The threshold array.
 */
export function generateIOThreshold(steps: number): number[] {
  return Array.from({ length: steps }, (_, i) => i / steps)
}
