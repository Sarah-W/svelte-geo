<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { geoPath } from 'd3-geo'
  // import { xor_only, ctrl_click_adds, single_only,select_2 } from '$lib/select_modes.js'
  export let geojson
  export let styleAccessor = feature =>({'vector-effect':"non-scaling-stroke",fill:"green",stroke:"black"})
  export let selectMode = null
  export let selection = []
  export let idAccessor = feature=>JSON.stringify(feature.properties)

  const dispatch = createEventDispatcher()

  
  let features = geojson.features
  let { projection, dimensions } = getContext("basemap")
  let p = $projection() 

	$: projectionFn = p.fitSize([$dimensions.width,$dimensions.height], geojson);
  $: geoPathFn = geoPath(projectionFn);

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

