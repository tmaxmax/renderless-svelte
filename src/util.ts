import { writable } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { isEqual, cloneDeep } from 'lodash-es'

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

/**
 * Exclude `undefined` from `T`.
 */
export type Defined<T> = T extends undefined ? never : T

// TODO: documentation for ReadonlyWritable type and readonlyWritable function

export interface ReadonlyWritable<T>
  extends Readable<Readonly<NonNullable<T>>> {
  update(updater: (value: NonNullable<T>) => NonNullable<T>): void
  set(value: NonNullable<T>): void
  trigger(): void
}

export function readonlyWritable<T>(
  value: NonNullable<T>
): ReadonlyWritable<T> {
  if (typeof value === 'undefined' || value === null) {
    throw new TypeError(
      'value must be non-nullable in order to create a readonly writable store'
    )
  }

  type Value = typeof value
  type Cache = Readonly<Value> | null
  const { subscribe, update } = writable<Cache>(null)

  const clone = (cache: Cache): NonNullable<Cache> => {
    if (cache === null) {
      const copy = Object.freeze(cloneDeep(value))
      update(() => copy)
      return copy
    }
    return cache
  }

  return {
    subscribe(run, invalidator) {
      return subscribe(
        cache => {
          run(clone(cache))
        },
        cache => invalidator?.(clone(cache!))
      )
    },
    update(updater) {
      value = updater(value)
      update(() => null)
    },
    set(v) {
      value = v
      update(() => null)
    },
    trigger() {
      update(cache => cache)
    },
  }
}
