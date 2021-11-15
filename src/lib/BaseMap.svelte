<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { createProjection } from './projectionStore.js'
  import { geoMercator } from 'd3-geo'
  import { zoomer } from './_zoomer.js'
  export let projection = null
  export let margin = {left:10,right:10,top:10,bottom:10} 
  
  let width = 0
  let height = 0

  let _projection = createProjection(geoMercator)

  let setSize = (height,width) => _projection.size([height,width])

  console.log($_projection)

  $: setSize(height-(margin.top+margin.bottom),width-(margin.left+margin.right))
  $: console.log(_projection.size())
  setContext("basemap",{projection:_projection})

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
    height:100%;
    width: 100%;
  }
  svg{
    height:100%;
    width: 100%;
  }
</style>