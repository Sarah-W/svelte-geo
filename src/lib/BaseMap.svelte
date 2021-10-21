<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { geoMercator } from 'd3-geo'
  import { zoomer } from './_zoomer.js'
  export let projection = null
  export let margin = {left:10,right:10,top:10,bottom:10} 
  
  let width = 400
  let height = 600

  let _projection = writable(geoMercator)
  let dimensions = writable({height,width})

  const setDimensions = (height,width)=> $dimensions ={height,width}

  $: $_projection = projection ?? geoMercator 
  $: setDimensions(height-(margin.top+margin.bottom),width-(margin.left+margin.right))

  setContext("basemap",{projection:_projection,dimensions})
  
</script>
  <div id="svgwrapper" 
    bind:clientWidth={width} 
    bind:clientHeight={height} 
  >
  <svg use:zoomer={margin}>
    <g>
      <slot></slot>
    </g>
  </svg>
</div>

<style>
  #svgwrapper{
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