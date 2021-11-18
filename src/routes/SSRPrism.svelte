<script >
  import 'prismjs/themes/prism-okaidia.css'
  import { onMount } from "svelte";
  export let language = "svelte"
  
  let prism = false
  onMount(async() => {
    prism = (await import("svelte-prism")).default
  })
</script>

{#if prism}
  <svelte:component this={prism} {language}>
    <slot></slot>
  </svelte:component>
{/if}
  