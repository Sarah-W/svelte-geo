
<script>
  import BaseMap from '../lib/BaseMap.svelte'
  import FeatureLayer from '../lib/FeatureLayer.svelte'
  import coastline from '../lib/geojson/coastline_simplified_3dp.geojson.json'
  import rto from '../lib/geojson/rto2017_simplified_3dp.geojson.json'
  import { geoAlbers,geoEqualEarth,geoEquirectangular,geoTransverseMercator } from 'd3-geo'
  import { scaleOrdinal } from 'd3-scale'



let selection
let n = 2
let nIsInfinite =false
let lastclicked
let idAccessor = d=>d.properties.OBJECTID
let foodscale = scaleOrdinal()
	.range([
		'lime',
		'tomato',
		'peachpuff',
		'olive',
		'papayawhip',
		'Plum',
		'wheat',
		'Orange',
		'salmon',
		'HoneyDew',
		'LightSalmon',
		'LemonChiffon',
		'blanchedalmond'
	]);

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
</label> <br/>


<p>Selection is {JSON.stringify(selection)}</p>

{#if lastclicked}
  <p>The last thing you clicked was {JSON.stringify(lastclicked.properties)}</p>
{:else}
  <p>Click on the map!</p>
{/if}

<div>
  <BaseMap >
    <FeatureLayer geojson={coastline} styleAccessor={()=>({stroke:"black",fill:"white"})} />
    <FeatureLayer 
      styleAccessor ={(feature)=>({
        fill:foodscale(feature.properties.RTO2017__1),
        stroke:"black",
        'vector-effect':"non-scaling-stroke",
        'fill-opacity':feature.properties.selected ? 0.9:0.1
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