/**
 * The observer used to watch for position changes of the tooltip's trigger element.
 */
let observer: IntersectionObserver | undefined = undefined

/**
 * Initializes the tooltip observer, if undefined, else does nothing.
 *
 * @param o The new observer
 */
export function init(o: IntersectionObserver) {
  observer ??= o
}

export default observer
