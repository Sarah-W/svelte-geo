
<script>
  import BaseMap from '../lib/BaseMap.svelte'
  import FeatureLayer from '../lib/FeatureLayer.svelte'
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json'
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json'
  import northisland from './_geojson/rto2017_ni_simplified_3dp.geojson.json'
  import southisland from './_geojson/rto2017_si_simplified_3dp.geojson.json'
  import { geoAlbers,geoEqualEarth,geoEquirectangular,geoTransverseMercator } from 'd3-geo'
  import { scaleOrdinal, scaleLinear } from 'd3-scale'

let selection
let n = 2
let nIsInfinite = false
let clicked
let foodscale = scaleOrdinal()
.range([
		'lime',
		'tomato',
		'peachpuff',
		'olive',
		'papayawhip',
		'plum',
		'wheat',
		'orange',
		'salmon',
		'honeydew',
		'lightsalmon',
		'lemonchiffon',
		'blanchedalmond',
    'chocolate' 
	]);

  let linearscale = scaleLinear()
    .domain([5,15])

</script>
<h1> svelte-geo </h1>
<h2>a basic map library for svelte projects</h2>

<div class = basemap>
  <BaseMap>
    <FeatureLayer 
      geojson={rto}
      styleAccessor ={(feature,selected)=>({
        "fill":selected ?'tomato':'olive',
        "fill-opacity":linearscale(feature.properties.RTO2017__1.length),
        "stroke":selected ? "tomato":"olive",
        "stroke-width":selected ? 2:1,
        'vector-effect':"non-scaling-stroke"
        })}
      on:click={e=>clicked=e.detail}
      selectMode = {nIsInfinite ? Infinity : n}
      idAccessor={feature=>feature.properties.RTO2017__1}
      bind:selection={selection}
    />
  </BaseMap>
</div>

<label>
  Selecting up to
	<input type=number disabled={nIsInfinite} bind:value={n} min=0 max=30>
  areas.
</label>
<label> 
  <input type="checkbox" bind:checked={nIsInfinite}>
  Infinite
</label> <br/>

{#if clicked}
  <p>The last thing you clicked was {JSON.stringify(clicked.properties,undefined,2)}</p>
  <p>Your current selection is {JSON.stringify(selection)}</p>
{:else}
  <p>Click on the map!</p>
{/if}

<style>
  div.basemap{
    border: black solid thin;
    width : 600px;
    height: 600px;
    margin:50px
  }
</style> 