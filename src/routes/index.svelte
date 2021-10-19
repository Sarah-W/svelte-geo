
<script>
  import BaseMap from '../lib/BaseMap.svelte'
  import FeatureLayer from '../lib/FeatureLayer.svelte'
  import coastline from '../lib/geojson/coastline_simplified_3dp.geojson.json'
  import rto from '../lib/geojson/rto2017_simplified_3dp.geojson.json'
  // on:click={e=>e.detail.feature.properties.selected = !e.detail.feature.properties.selected}

let selection
let n = 2
let lastclicked
let idAccessor = d=>d.properties.OBJECTID

</script>

<h1> Here's ya map </h1>
<p>Selecting up to {n}</p>
<label>
	<input type=number bind:value={n} min=0 max=10>
	<input type=range bind:value={n} min=0 max=10>
</label>
<p>Selection is {JSON.stringify(selection)}</p>

{#if lastclicked}
  <p>The last thing you clicked was {JSON.stringify(lastclicked.properties)}</p>
{/if}

<div>
  <BaseMap >
    <FeatureLayer geojson={coastline}/>
    <FeatureLayer 
      styleAccessor ={(feature)=>({
        fill:"chartreuse",
        stroke:"red",
        'fill-opacity':feature.properties.selected ? 0.8:0.3
        })} 
      geojson={rto}
      selectMode = {n}
      idAccessor = {d=>d.properties.OBJECTID}
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