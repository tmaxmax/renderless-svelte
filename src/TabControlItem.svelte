<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { contextKey } from './TabControl.svelte'
  import type { Context, Tab } from './TabControl.svelte'

  export let active = false
  export let disabled = false
  export let id: any
  export let payload: any

  const ctx = getContext<Context>(contextKey)

  type TabComponent =
    | {
        mounted?: false
      }
    | {
        mounted: true
        tab: Tab
      }

  let component: TabComponent = {}
  onMount(() => {
    component = {
      tab: ctx.add({ active, disabled, id, payload }),
      mounted: true,
    }
  })

  $: if (component.mounted) {
    component.tab.disabled = disabled
  }
</script>

{#if component.mounted && component.tab.active}
  <slot />
{/if}
