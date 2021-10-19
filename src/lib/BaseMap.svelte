<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { geoMercator } from 'd3-geo'
  export let projection = null 
  
  let width = 400
  let height = 600

  let _projection = writable(geoMercator)
  let dimensions = writable({height,width})

  const setDimensions = (height,width)=> $dimensions ={height,width}

  $: $_projection = projection ? projection : geoMercator 
  $: setDimensions(height,width)

  setContext("basemap",{projection:_projection,dimensions})

</script>


<div class = svg bind:clientWidth={width} bind:clientHeight={height}>
  <svg >
    <slot {width}{height} ></slot>
  </svg>
</div>

<style>
  .svg{
    background-color: aquamarine;
    height:100%;
    width: 100%;
  }
  svg{
    background-color: aliceblue;
    height:100%;
    width: 100%;
  }
</style>