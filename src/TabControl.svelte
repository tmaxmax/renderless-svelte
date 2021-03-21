<script context="module" lang="ts">
  import type { Readable } from 'svelte/store'
  import { readonlyWritable } from './util'

  export const contextKey = {}

  export interface TabInput {
    active: boolean
    disabled: boolean
    id: any
    payload: any
  }

  export type Tab = Readonly<Omit<TabInput, 'disabled'>> &
    Pick<TabInput, 'disabled'> & {
      select(): void
    }

  export interface Context extends Readable<readonly Tab[]> {
    add(tab: TabInput): Tab
    setTab(id: any): void
  }

  function createStore(): Context {
    let currentID: any = undefined
    const { subscribe, update, trigger } = readonlyWritable<Tab[]>([])
    const setTab = (id: any) => {
      currentID = id
      trigger()
    }

    return {
      subscribe,
      add({ active, disabled, id, payload }) {
        if (active) {
          currentID = id
        }
        const tab: Tab = {
          get active() {
            return id === currentID
          },
          get disabled() {
            return disabled
          },
          set disabled(value) {
            disabled = value
            trigger()
          },
          get id() {
            return id
          },
          get payload() {
            return payload
          },
          select() {
            setTab(id)
          },
        }
        update(tabs => (tabs.push(tab), tabs))
        return tab
      },
      setTab,
    }
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte'

  export let tabs: readonly Tab[]

  const ctx = createStore()
  export const setTab = ctx.setTab

  $: tabs = $ctx

  setContext<Context>(contextKey, ctx)
</script>

<slot name="tabs" {tabs} />
<slot />
