<script>
	import BaseMap from '../lib/BaseMap.svelte';
	import FeatureLayer from '../lib/FeatureLayer.svelte';
	import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
	import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
	import northisland from './_geojson/rto2017_ni_simplified_3dp.geojson.json';
	import southisland from './_geojson/rto2017_si_simplified_3dp.geojson.json';
	import { geoAlbers, geoEqualEarth, geoEquirectangular, geoTransverseMercator } from 'd3-geo';
	import { scaleOrdinal, scaleLinear } from 'd3-scale';
	import { object_without_properties } from 'svelte/internal';

	let selection2, selection3;
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
</script>

<h1>svelte-geo</h1>
<h2>a basic map library for svelte projects</h2>

<h3>Minimum viable</h3>

<div class="basemap">
	<BaseMap>
		<FeatureLayer geojson={coastline} />
	</BaseMap>
</div>

<h3>Styling areas</h3>

<p>
	Style areas based on feature information by supplying a styleAccessor function. The function takes
	a feature and it's selection status, and returns a style object.
</p>
<p>
	Areas are styled using a d3-scale linear scale, to change the fill-opacity acccording to the
	length of their names. This is one method of creating a choropleth.
</p>

<div class="basemap">
	<BaseMap>
		<FeatureLayer
			geojson={rto}
			styleAccessor={(feature) => ({
				fill: 'tomato',
				'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
				stroke: 'tomato',
				'vector-effect': 'non-scaling-stroke'
			})}
		/>
	</BaseMap>
</div>

<p>
	Areas are styled using a d3-scale ordinal scale, acccording to the first letter of their name.
</p>

<div class="basemap">
	<BaseMap>
		<FeatureLayer
			geojson={rto}
			styleAccessor={(feature) => ({
				fill: foodscale(feature.properties.RTO2017__1[0]),
				stroke: 'olive',
				'vector-effect': 'non-scaling-stroke'
			})}
		/>
	</BaseMap>
</div>

<h3>Clickable areas</h3>

<p>Clicking on an area dispatches a click event. e.detail contains the geojson feature object.</p>

<div class="basemap">
	<BaseMap>
		<FeatureLayer
			geojson={rto}
			styleAccessor={(feature) => ({
				fill: 'lightgrey',
				stroke: 'black',
				'vector-effect': 'non-scaling-stroke'
			})}
			on:click={(e) => (clicked = e.detail.feature)}
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
<p>
	You can set what is used as the uid via the idAccessor function. This function should take a
	geojson feature and return a uid. It defaults to feature=>JSON.stringify(feature.properties)
</p>
<p>
	Selecting a feature sets feature.properties to True. We can use this to set the style on selected
	features via the styleAccessor function.
</p>

<p>Select up to 3 areas</p>

<p>Current Selection: {JSON.stringify(selection2)}</p>

<div class="basemap">
	<BaseMap>
		<FeatureLayer
			styleAccessor={(feature, selected) => ({
				fill: 'black',
				stroke: 'black',
				'vector-effect': 'non-scaling-stroke',
				'fill-opacity': selected ? 0.5 : 0.1
			})}
			geojson={rto}
			selectMode={3}
			idAccessor={(feature) => feature.properties.RTO2017__1}
			bind:selection={selection2}
		/>
	</BaseMap>
</div>

<p>
	You can change the number of areas you are choosing to select programmatically. Changing to a
	smaller number discards the oldest selections first.
</p>

<label>
	Selecting up to
	<input type="number" disabled={nIsInfinite} bind:value={n} min="0" max="30" />
	areas.
</label>
<label>
	<input type="checkbox" bind:checked={nIsInfinite} />
	Infinite
</label> <br />

<p>Current Selection: {JSON.stringify(selection3)}</p>

<div class="basemap">
	<BaseMap>
		<FeatureLayer
			geojson={rto}
			styleAccessor={(feature, selected) => ({
				fill: 'red',
				stroke: 'black',
				'vector-effect': 'non-scaling-stroke',
				'fill-opacity': selected ? 0.9 : 0.1
			})}
			selectMode={nIsInfinite ? Infinity : n}
			idAccessor={(feature) => feature.properties.OBJECTID}
			bind:selection={selection3}
		/>
	</BaseMap>
</div>

<style>
	div.basemap {
		border: black solid thin;
		width: 400px;
		height: 400px;
		margin: 50px;
	}
</style>
