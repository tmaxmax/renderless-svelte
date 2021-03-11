<script context="module" lang="ts">
  import { get, writable } from 'svelte/store'

  /**
   * The current state of the modal.
   */
  let open = writable(false)
  /**
   * The current data in the modal.
   */
  let payload = writable<any>(undefined)

  let resolveClose: (value: any) => void

  /**
   * Opens the modal with the given data.
   *
   * @param data
   */
  export function openModal<T>(data: T) {
    open.set(true)
    payload.set(data)
    return new Promise<T>(resolve => {
      resolveClose = resolve
    })
  }

  /**
   * Closes the modal.
   */
  export const closeModal = () => {
    if (get(open)) {
      open.set(false)
      resolveClose(get(payload))
    }
  }
</script>

{#if $open}
  <slot payload={$payload} close={closeModal} />
{/if}
