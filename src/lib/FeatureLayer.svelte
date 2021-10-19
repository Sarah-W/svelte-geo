<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { geoPath } from 'd3-geo'
  // import { xor_only, ctrl_click_adds, single_only,select_2 } from '$lib/select_modes.js'
  export let geojson
  export let styleAccessor = feature =>({fill:"green",stroke:"black"})
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

  let single = (selection,feature)=>{
    console.log('blah')
    return [idAccessor(feature)]
  }
  
  let multi = (selection,feature) => {
    if (selection.find(d=>d==idAccessor(feature))){
      selection = selection.filter(d=>d!=idAccessor(feature))
    } else {
      selection.push(idAccessor(feature))
    }    
    return selection
  }
  
  let nMulti = (n) => {
    if((Number.isInteger(n)&& selectMode > 0) || n == Infinity ){
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
      features=geojson.features
      features.forEach(feature => {
        feature.properties.selected = !!selection.find(s=>s==idAccessor(feature))
      });
    }

  $: if(selection.length > selectMode){
      while(selection.length > selectMode){
        selection.shift()
        }
      features=geojson.features
      features.forEach(feature => {
        feature.properties.selected = !!selection.find(s=>s==idAccessor(feature))
      })  
    }  

</script> 


<g class="map-group">
  {#each features as feature}
    <path
      class="feature-path"
      {...styleAccessor(feature)}
      d="{geoPathFn(feature)}"
      on:click={(e) => clickHandler(feature,e)}
    ></path>
  {/each}
</g>

