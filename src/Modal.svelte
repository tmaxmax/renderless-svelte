<script context="module" lang="ts">
  import { get, writable } from 'svelte/store'

  /**
   * The current state of the modal.
   */
  const open = writable(false)
  /**
   * The current data in the modal.
   */
  const payload = writable<any>(undefined)

  let resolveClose: (value: any) => void

  /**
   * Opens the modal with the given data.
   *
   * @param data
   * @returns A promise that is resolved when the modal is closed.
   * It holds the provided data.
   */
  export function openModal<T>(data: T): Promise<T> {
    open.set(true)
    payload.set(data)
    return new Promise<T>(resolve => {
      resolveClose = resolve
    })
  }

  /**
   * Closes the modal.
   */
  export function closeModal() {
    if (get(open)) {
      open.set(false)
      resolveClose(get(payload))
    }
  }
</script>

{#if $open}
  <slot payload={$payload} close={closeModal} />
{/if}
