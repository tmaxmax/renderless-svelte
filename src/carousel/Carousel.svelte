<script lang="ts">
  import type { CarouselControls } from './types'
  /**
   * The items to create the carousel with.
   */
  export let items: any[]
  /**
   * The index of the current carousel item.
   */
  export let currentIndex = 0
  /**
   * Indicates whether the carousel should loop back to the beginning
   * if iterated further the last element.
   *
   * @default false
   */
  export let loop = false

  /**
   * Sets the current carousel item to the ith item
   * in the provided items.
   *
   * @param i The index of the item.
   */
  export const setIndex = (i: number) => {
    if (i < items.length) {
      currentIndex = i
    }
  }

  /**
   * Provides functions to loop through the carousel items.
   */
  export const controls: CarouselControls = {
    next() {
      if (currentIndex < items.length - 1) {
        currentIndex++
      } else if (loop) {
        currentIndex = 0
      }
    },
    previous: () => {
      if (currentIndex > 0) {
        currentIndex--
      } else if (loop) {
        currentIndex = items.length - 1
      }
    },
  }

  /**
   * The current item in the carousel.
   */
  $: payload = items[currentIndex]
</script>

<slot {currentIndex} {payload} {setIndex} {controls} {loop} />
