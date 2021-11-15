<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { geoPath, geoBounds } from 'd3-geo'
  export let geojson
  export let styleAccessor = feature =>({'vector-effect':"non-scaling-stroke",fill:"lightgrey",stroke:"black"})
  export let selectMode = null
  export let selection = []
  export let idAccessor = feature=>JSON.stringify(feature.properties)
  export let layerName = null

  const dispatch = createEventDispatcher()
  
  let _geojson = JSON.parse(JSON.stringify(geojson))

  let features = _geojson.features
  let { projection } = getContext("basemap")

  layerName = projection.addLayer(_geojson,layerName)

  $: geoPathFn = geoPath($projection);

  let selectFn = ()=>[]
  
  let multi = (selection,feature) => {
    if (selection.find(d=>d==idAccessor(feature))){
      selection = selection.filter(d=>d!=idAccessor(feature))
    } else {
      selection.push(idAccessor(feature))
    }    
    return selection
  }
  
  let nMulti = (n) => {
    if((Number.isInteger(n)&& n > 0) || n == Infinity ){
      return (selection,feature)=>{
        selection = multi(selection,feature) 
        if(selection.length > n){
          selection.shift()
        } 
        return selection
      }
    } else {return (selection,feature)=>[]}
  } 

  $: selectFn = nMulti(selectMode)

  $:clickHandler = (feature,e) => {
      selection = nMulti(selectMode)(selection,feature)
      dispatch("click",feature)
      features=features
      features.forEach(feature => {
        const feature_id = idAccessor(feature)
        feature.properties.selected = !!selection.find(s=>s==feature_id)
      });
    }

  $: if(selection.length > selectMode){
      while(selection.length > selectMode){
        selection.shift()
      }
      features=features
      features.forEach(feature => {
        const feature_id = idAccessor(feature)
        feature.properties.selected = !!selection.find(s=>s==feature_id)
      })
      selection=selection
    }  

</script> 

<g class="map-group">
  {#each features as feature}
    <path
      class="feature-path"
      {...styleAccessor(feature)}
      d="{geoPathFn(feature)}"
      on:click={(e) => clickHandler(feature,e)}
      on:mousemove={(e)=>dispatch("mousemove",{feature,event:e})}
      on:mouseenter={(e)=>dispatch("mouseenter",{feature,event:e})}
      on:mouseleave={(e)=>dispatch("mouseleave",{feature,event:e})}
    ></path>
  {/each}
</g>

