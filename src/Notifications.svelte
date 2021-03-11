<script context="module" lang="ts">
  import { writable } from 'svelte/store'

  function createStore() {
    // Use ReadonlyArray so the type system prevents the user to modify the array.
    const { update, subscribe } = writable<ReadonlyArray<any>>([])

    return {
      subscribe,
      /**
       * Removes the least recent notification from the queue.
       */
      pop() {
        // Safe to cast to mutable array here, as pop and push
        // encapsulate the array mutation away from the user.
        update(queue => {
          ;(queue as any[]).shift()
          return queue
        })
      },
      /**
       * Adds a new notification to the queue.
       *
       * @param payload The notification's content.
       */
      push(payload: any) {
        update(queue => {
          ;(queue as any[]).push(payload)
          return queue
        })
      },
    }
  }

  /**
   * The notifications store. Use its methods `push` and `pop`
   * to add or remove notifications, and subscribe to it to
   * get the current notification.
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

  const dispatch = createEventDispatcher()

  let hasActiveNotification = false

  notifications.subscribe(queue => {
    if (hasActiveNotification || queue.length === 0) {
      return
    }

    hasActiveNotification = true

    setTimeout(() => {
      hasActiveNotification = false
      notifications.pop()
    }, duration)

    dispatch('notify', queue[0])
  })
</script>

{#if $notifications.length > 0}
  <slot payload={$notifications[0]} />
{/if}
