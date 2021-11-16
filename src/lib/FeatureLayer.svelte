<script>
  import { getContext, createEventDispatcher } from 'svelte'
  import { geoPath } from 'd3-geo'
  export let geojson
  export let styleAccessor = (feature,selected) =>({'vector-effect':"non-scaling-stroke",fill:"lightgrey",stroke:"black"})
  export let selectMode = null
  export let selection = []
  export let idAccessor = feature=>JSON.stringify(feature.properties)
  export let layerName = null

  const dispatch = createEventDispatcher()

  let features = geojson.features
  let { projection } = getContext("basemap")

  layerName = projection.addLayer(geojson,layerName)
  $: geoPathFn = geoPath($projection);
  
  let multi = (_selection,feature) => {
    if (_selection.find(d=>d==idAccessor(feature))){
      _selection = _selection.filter(d=>d!=idAccessor(feature))
    } else {
      _selection.push(idAccessor(feature))
    }    
    return _selection
  }
  
  let nMulti = (n) => {
    let _selection = [...selection]
    if((Number.isInteger(n)&& n > 0) || n == Infinity ){
      return (_selection,feature)=>{
        _selection = multi(_selection,feature) 
        if(_selection.length > n){
          _selection.shift()
        } 
        return _selection
      }
    } else {return (selection,feature)=>[]}
  }
  
  const isSelected = (feature,selection)=> !!selection.find(s=>s==idAccessor(feature))

  $: _styleAccessor = (feature,selection) => styleAccessor(feature,isSelected(feature,selection))

  // $: console.trace("selection ",selection)


  const clickHandler = (feature,event) => {
      selection = nMulti(selectMode)(selection,feature)
      dispatch("click",{feature,event})
    }

  $: if(selection.length > selectMode){
      while(selection.length > selectMode){
        selection.shift()
      }
      selection=selection
    }  
  

</script> 

<g class="map-group">
  {#each features as feature}
    <path
      class="feature-path"
      {..._styleAccessor(feature,selection)}
      d="{geoPathFn(feature)}"
      on:click ={(e) => clickHandler(feature,e)}
      on:mousemove={(e)=>dispatch("mousemove",{feature,event:e})}
      on:mouseenter={(e)=>dispatch("mouseenter",{feature,event:e})}
      on:mouseleave={(e)=>dispatch("mouseleave",{feature,event:e})}
    ></path>
  {/each}
</g>

