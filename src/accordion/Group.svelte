<script context="module" lang="ts">
  /**
   * Use this to get the AccordionGroup context.
   */
  export const contextKey = {}

  /**
   * Function that closes an accordion.
   */
  export type Closer = () => void

  /**
   * The AccordionGroup context.
   */
  export interface Context {
    /**
     * Sets the current opened accordion for the group,
     * by providing a function that closes it.
     *
     * @param fn The function that closes the accordion,
     */
    setAccordion(fn: Closer): void
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte'

  let closer: Closer

  setContext<Context>(contextKey, {
    setAccordion(fn) {
      if (closer === fn) {
        return
      }
      closer?.()
      closer = fn
    },
  })
</script>

<slot />
