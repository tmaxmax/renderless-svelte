<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { notifications } from './notifications'

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
