
<script>
  import BaseMap from '../lib/BaseMap.svelte'
  import FeatureLayer from '../lib/FeatureLayer.svelte'
  import coastline from '../lib/geojson/coastline_simplified_3dp.geojson.json'
  import rto from '../lib/geojson/rto2017_simplified_3dp.geojson.json'


let selection
let n = 2
let nIsInfinite =false
let lastclicked
let idAccessor = d=>d.properties.OBJECTID

</script>

<h1> Here's ya map </h1>
<label>
  Selecting up to
	<input type=number disabled={nIsInfinite} bind:value={n} min=0 max=10>
	<input type=range disabled={nIsInfinite} bind:value={n} min=0 max=10>
</label>
<label> 
  <input type="checkbox" bind:checked={nIsInfinite}>
  Infinite
</label>

<p>Selection is {JSON.stringify(selection)}</p>

{#if lastclicked}
  <p>The last thing you clicked was {JSON.stringify(lastclicked.properties)}</p>
{:else}
  <p>Click on the map!</p>
{/if}

<div>
  <BaseMap >
    <FeatureLayer geojson={coastline} />
    <FeatureLayer 
      styleAccessor ={(feature)=>({
        fill:"chartreuse",
        stroke:"red",
        'vector-effect':"non-scaling-stroke",
        'fill-opacity':feature.properties.selected ? 0.8:0.3
        })} 
      geojson={rto}
      selectMode = {nIsInfinite ? Infinity : n}
      {idAccessor}
      bind:selection={selection}  
      on:click={e=>lastclicked=e.detail}
    />
  </BaseMap>
</div>


<style>
  div{
    border: black solid thin;
    width : 700px;
    height: 700px;
  }
</style> 