
<script>
  import BaseMap from '../lib/BaseMap.svelte'
  import FeatureLayer from '../lib/FeatureLayer.svelte'
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json'
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json'
  import northisland from './_geojson/rto2017_ni_simplified_3dp.geojson.json'
  import southisland from './_geojson/rto2017_si_simplified_3dp.geojson.json'
  import { geoAlbers,geoEqualEarth,geoEquirectangular,geoTransverseMercator } from 'd3-geo'
  import { scaleOrdinal } from 'd3-scale'


let selection2,selection3
let n = 2
let nIsInfinite = false
let clicked
let foodscale = scaleOrdinal()
	.range([
		'lime',
		'tomato',
		'olive',
		'Plum',
		'Orange',
		'salmon'
	]);

</script>
<h1> svelte-geo </h1>
<h2>a basic map library for svelte projects</h2>

<h3>Minimum viable</h3>

<div class = basemap>
  <BaseMap>
    <FeatureLayer 
    geojson={coastline} 
    />
  </BaseMap>
</div> 

<h3>Clickable areas</h3>

<p>Clicking on an area dispatches a click event. e.detail contains the geojson feature object. </p>


<div class = basemap>
  <BaseMap>
    <FeatureLayer 
      geojson={rto}
      styleAccessor ={(feature)=>({
        fill:"lightgrey",
        stroke:"black",
        'vector-effect':"non-scaling-stroke"
        })}   
      on:click={e=>clicked=e.detail}
    />
  </BaseMap>
</div>

{#if clicked}
  <p>The last thing you clicked was {JSON.stringify(clicked.properties)}</p>
{:else}
  <p>Click on the map!</p>
{/if}


<h3>Selectable areas</h3>

<p>Selecting an area adds it's uid to the selection array, which you can bind to.</p>
<p>You can set what is used as the uid via the idAccessor function. This function should take a geojson feature and return a uid. It defaults to feature=>JSON.stringify(feature.properties) </p>
<p>Selecting a feature sets feature.properties to True. We can use this to set the style on selected features via the styleAccessor function.</p>

<p>Select up to 3 areas </p>

<p>Current Selection:  {JSON.stringify(selection2)}</p>
  
<div class = basemap>
  <BaseMap>
    <FeatureLayer 
      styleAccessor ={(feature)=>({
        fill:"black",
        stroke:"black",
        'vector-effect':"non-scaling-stroke",
        'fill-opacity':feature.properties.selected ? 0.5:0.1
        })} 
      geojson={rto}
      selectMode = {3}
      idAccessor={feature=>feature.properties.RTO2017__1}
      bind:selection={selection2}
    />
  </BaseMap>
</div>

<p>You can change the number of areas you are choosing to select programmatically. Changing to a smaller number discards the oldest selections first.</p>

<label>
  Selecting up to
	<input type=number disabled={nIsInfinite} bind:value={n} min=0 max=30>
  areas.
</label>
<label> 
  <input type="checkbox" bind:checked={nIsInfinite}>
  Infinite
</label> <br/>

<p>Current Selection:  {JSON.stringify(selection3)}</p>



<div class = basemap>
  <BaseMap>
    <FeatureLayer
      geojson={rto} 
      styleAccessor ={(feature)=>({
        fill:"red",
        stroke:"black",
        'vector-effect':"non-scaling-stroke",
        'fill-opacity':feature.properties.selected ? 0.9:0.1
        })} 
      
      selectMode = {nIsInfinite ? Infinity : n}
      idAccessor={feature=>feature.properties.OBJECTID}
      bind:selection={selection3}  
      on:click={e=>clicked=e.detail}
    />
  </BaseMap>
</div>


<style>
  div.basemap{
    border: black solid thin;
    width : 400px;
    height: 400px;
    margin:50px
  }
</style> 