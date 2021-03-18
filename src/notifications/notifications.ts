import { writable } from 'svelte/store'
import type { Readable } from 'svelte/store'

/**
 * Custom Svelte Reader interface for the notifications store.
 */
interface Notifications extends Readable<readonly any[]> {
  /**
   * Removes the least recent notification from the queue.
   */
  pop(): void
  /**
   * Adds a new notification to the queue.
   *
   * @param payload The notification's content.
   */
  push(payload: any): void
}

function createStore(): Notifications {
  // To implement the read-only property of the notifications store,
  // we are lazily caching a copy of the actual queue on subscribe,
  // if the queue was mutated.
  type Cache = readonly any[] | null
  const { update, subscribe } = writable<Cache>(null)
  let queue: any[] = []
  /**
   * Clones the queue into the cache store
   * if it was modified and returns it.
   *
   * @param cache The old cache.
   * @returns The new, valid cache.
   */
  const clone = (cache: Cache) => {
    if (!cache) {
      const copy = Object.freeze(queue.slice())
      update(() => copy)
      return copy
    }
    return cache
  }
  /**
   * Invalidates the current cache
   */
  const invalidate = () => {
    update(() => null)
  }

  return {
    subscribe(run) {
      return subscribe(cache => {
        run(clone(cache))
      })
    },
    pop() {
      queue.shift()
      invalidate()
    },
    push(payload) {
      queue.push(payload)
      invalidate()
    },
  }
}

/**
 * The notifications store. Use its methods `push` and `pop`
 * to add or remove notifications, and subscribe to it to
 * get the queued notifications.
 *
 * Note that the queue returned on subscription is a readonly
 * array and calling mutating methods such as `push`, `shift`,
 * `splice` etc. will fail!
 */
export const notifications = createStore()
