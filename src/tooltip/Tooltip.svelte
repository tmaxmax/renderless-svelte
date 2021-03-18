<script lang="ts">
  import { onMount } from 'svelte'

  import { generateIOThreshold } from './util'
  import observer, { init } from './observer'
  import {
    options as optionsStore,
    dimensions as dimensionsStore,
  } from './stores'

  /**
   * The rectangle of the element that triggers the tooltip.
   */
  export let dimensions: DOMRectReadOnly | undefined
  /**
   * Data used to display the tooltip.
   */
  export let options

  onMount(() => {
    init(
      new IntersectionObserver(
        entries => {
          const [entry] = entries
          $dimensionsStore = entry.boundingClientRect
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: generateIOThreshold(800),
        }
      )
    )

    return () => observer!.disconnect()
  })

  $: dimensions = $dimensionsStore
  $: options = $optionsStore
</script>

<slot />
