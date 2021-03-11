<script lang="ts">
  import { contextKey } from './AccordionGroup.svelte'
  import type { Context } from './AccordionGroup.svelte'

  import { getContext } from 'svelte'

  /**
   * Flag that indicates if the accordion is open.
   */
  export let isOpen = false

  const close = () => {
    isOpen = false
  }
  /**
   * Opens or closes the accordion. Use it to toggle
   * the accordion state programatically (e.g. as a handler for event listeners).
   */
  const toggle = () => {
    isOpen = !isOpen
  }

  // Type this with undefined because if the context doesn't exist
  // getContext returns undefined.
  const context = getContext<Context | undefined>(contextKey)

  $: if (isOpen) {
    context?.setAccordion(close)
  }
</script>

<slot name="header" {toggle} {isOpen} />
{#if isOpen}
  <slot />
{/if}
