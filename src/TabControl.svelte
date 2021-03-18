<script context="module" lang="ts">
  export const contextKey = {}

  export interface Context {}
</script>

<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { TabControlItem } from './TabControlItem.svelte'

  export let tabs: TabControlItem[]

  const store = writable([])

  function setTab(id: any) {
    $store = $store.map(t => ({ ...t, active: t.id == id }))
  }

  $: tabs = $store

  setContext<Context>(contextKey, {})
</script>

<slot name="tabs" {tabs} />
<slot />
