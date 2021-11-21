<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
	import northisland from './_geojson/rto2017_ni_simplified_3dp.geojson.json';
	import southisland from './_geojson/rto2017_si_simplified_3dp.geojson.json';
	import { geoAlbers, geoEqualEarth, geoEquirectangular, geoMercator, geoTransverseMercator } from 'd3-geo';
	import { scaleOrdinal, scaleLinear } from 'd3-scale';

	let selection = [];
	let n = 2;
	let nIsInfinite = false;
	let clicked;
	let foodscale = scaleOrdinal().range([
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

	let linearscale = scaleLinear().domain([5, 15]);
  const presetSelection = ["Northland","Southland"]
  let projection = geoMercator

  let showNorth = true
  let showSouth = false
  let southSelection = []

</script>

<h1>svelte-geo sandbox</h1>
<h2>everything works with everything else</h2>
<p>When I was in geology 102 at the University of Auckland, the lecturer apologised for having to teach us about the geology of New Zealand, as it was just too complicated for a first-year course. So many geological processes, piled on top of each other.</p>
<p>This example is a bit like that.</p> 

<div class = wrapper >
  <div class="basemap">
    <BaseMap {projection}>
      <FeatureLayer
        geojson={rto}
        styleAccessor={(feature, selected) => ({
          fill: selected ? 'tomato' : 'olive',
          'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
          stroke: selected ? 'tomato' : 'olive',
          'stroke-width': selected ? 2 : 1,
          'vector-effect': 'non-scaling-stroke'
        })}
        on:click={(e) => (clicked = e.detail.feature)}
        selectMode={nIsInfinite ? Infinity : n}
        idAccessor={(feature) => feature.properties.RTO2017__1}
        bind:selection
      />
    </BaseMap>
  </div>
  <div class = commentary>
    <label>
      Select up to
      <input type="number" disabled={nIsInfinite} bind:value={n} min="0" max="30" />
      areas.
    </label>
    <label>
      Or select Infinite areas 
      <input type="checkbox" bind:checked={nIsInfinite} />
    </label> <br />

    <p>The last thing you clicked was: </p> <pre>{JSON.stringify(clicked?.properties, undefined, 2)}</pre>
    <p>Your current selection is: </p> <pre>{JSON.stringify(selection)}</pre>
    <p>Set a selection <button on:click={()=> selection = [...presetSelection]}>["Northland","Southland"]</button> </p>
  
    <p>Set a different projection: </p> 
    <input type="radio" id="geoMercator" name="projection" on:click={()=>projection = geoMercator} checked>
    <label for="geoMercator">geoMercator</label><br>
    <input type="radio" id="geoEqualEarth" name="projection" on:click={()=>projection = geoEqualEarth}>
    <label for="geoEqualEarth">geoEqualEarth</label><br>
  
  </div>
</div>
<div class = wrapper >
  <div class="basemap">
    <BaseMap>
      {#if showNorth} 
        <FeatureLayer
          geojson={northisland}
          styleAccessor={(feature, selected) => ({
            fill: selected ? 'blue' : 'grey',
            'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
            stroke: selected ? 'blue' : 'grey',
            'stroke-width': selected ? 2 : 1,
            'vector-effect': 'non-scaling-stroke'
          })}
          selectMode={Infinity}
          idAccessor={(feature) => feature.properties.RTO2017__1}
        />
      {/if}
      {#if showSouth}   
        <FeatureLayer
          geojson={southisland}
          styleAccessor={(feature, selected) => ({
            fill: selected ? 'green' : 'grey',
            'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
            stroke: selected ? 'green' : 'grey',
            'stroke-width': selected ? 2 : 1,
            'vector-effect': 'non-scaling-stroke'
          })}
          selectMode={Infinity}
          idAccessor={(feature) => feature.properties.RTO2017__1}
          bind:selection = {southSelection}
        />
      {/if}
    </BaseMap>
  </div>
  <div class = commentary>
    <label>
      Show the North Island
      <input type="checkbox" bind:checked={showNorth} />
    </label><br>
    <label>
      Show the South Island
      <input type="checkbox" bind:checked={showSouth} />
    </label>

    <p>To persist the selection, bind it to a variable, or it will be lost when the layer is destroyed.</p>
    <p>The South Island layer is bound, the North Island one is not. </p>

  </div>
</div>

<style>
  div.wrapper {
    display:flex;
    flex-direction:row 
  }
	div.basemap {
		border: black solid thin;
		width: 500px;
		height: 500px;
		margin: 50px;
	}
  div.commentary{
    margin: 50px;
  }


</style>
