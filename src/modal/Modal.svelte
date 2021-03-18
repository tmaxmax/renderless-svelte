<script context="module" lang="ts">
  import { open, payload } from './stores'
  import { closeModal } from './modal'
</script>

{#if $open}
  <slot payload={$payload} close={closeModal} />
{/if}
