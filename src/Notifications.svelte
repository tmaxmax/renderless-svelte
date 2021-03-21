<script context="module" lang="ts">
  import type { Readable } from 'svelte/store'
  import { readonlyWritable } from './util'

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
    const { update, subscribe } = readonlyWritable<any[]>([])

    return {
      subscribe,
      pop() {
        update(queue => (queue.shift(), queue))
      },
      push(payload) {
        update(queue => (queue.push(payload), queue))
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
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  /**
   * The time the notification stays active, in milliseconds.
   *
   * @default 1000
   */
  export let duration = 1000

  const dispatch = createEventDispatcher<any>()

  let hasActiveNotification = false

  $: payload = $notifications[0]
  $: if (!hasActiveNotification && payload) {
    hasActiveNotification = true

    setTimeout(() => {
      hasActiveNotification = false
      notifications.pop()
    }, duration)

    dispatch('notify', payload)
  }
</script>

{#if payload}
  <slot {payload} />
{/if}
