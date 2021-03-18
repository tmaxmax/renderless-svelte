<script context="module" lang="ts">
  import { writable } from 'svelte/store'
  import { event } from './util'

  const optionsStore = writable<any>(undefined)
  const dimensionsStore = writable<DOMRectReadOnly | undefined>(undefined)

  const callback: IntersectionObserverCallback = entries => {
    const [entry] = entries
    dimensionsStore.set(entry.boundingClientRect)
  }

  let observer: IntersectionObserver

  /**
   * An action used to associate a tooltip with a given element.
   * Use the `opts` parameter to pass additional data for the
   * tooltip, or else make it `null`.
   *
   * @param element The element to associate the tooltip with.
   * @param opts Additional data for the tooltip. Shall not be
   * `undefined`!
   */
  export const tooltip = (element: HTMLElement, opts: any) => {
    let currentOptions = opts
    let running = true

    async function handler() {
      while (running) {
        await event(element, 'mouseover')
        observer.observe(element)
        optionsStore.set(currentOptions)
        await event(element, 'mouseout')
        observer.unobserve(element)
        optionsStore.set(undefined)
      }
    }

    handler()

    return {
      destroy() {
        running = false
      },
      update(opts: any) {
        currentOptions = opts
      },
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { generateIOThreshold } from './util'

  /**
   * The rectangle of the element that triggers the tooltip.
   */
  export let dimensions: DOMRectReadOnly | undefined
  /**
   * Data used to display the tooltip.
   */
  export let options

  onMount(() => {
    observer ??= new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: generateIOThreshold(500),
    })

    return () => observer.disconnect()
  })

  $: dimensions = $dimensionsStore
  $: options = $optionsStore
</script>

<slot />
