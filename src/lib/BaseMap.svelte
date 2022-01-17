<script>
	import { setContext } from 'svelte';
	import { createProjection } from './projectionStore.js';
	import { geoMercator } from 'd3-geo';
	import { createZoomer } from './_zoomer.js';
	export let projection = null;
	export let margin = { left: 10, right: 10, top: 10, bottom: 10 };
	export let background = "unset"
	let {zoomer, reset, offsetX, offsetY, applyCurrentZoom} = createZoomer()
	export const zoomReset = reset

	let width = 0;
	let height = 0;

	let _projection = createProjection(projection ?? geoMercator);
	let setSize = (height, width) => _projection.size([height, width]);

	// const offsetX = writable(null)
	// const offsetY = writable(null)

	setContext('offset',{offsetX,offsetY})

	const mousemoveHandler = (event) => {
		$offsetX=event.offsetX
		$offsetY=event.offsetY
	};

  $: _projection.setProjection(projection)

	$: setSize(height - (margin.top + margin.bottom), width - (margin.left + margin.right));
	setContext('basemap', { projection: _projection, margin, applyCurrentZoom});

</script>

<div id="svgwrapper" bind:clientWidth={width} bind:clientHeight={height}>
	<svg 
		on:mousemove={mousemoveHandler}
		use:zoomer 
		style={`background-color:${background}`}
		>
		<g style = {`transform:translate(${margin.left}px, ${margin.top}px)`}>
			<slot/>
		</g>
	</svg>
</div>

<style>
	#svgwrapper {
		height: 100%;
		width: 100%;
	}
	svg {
		height: 100%;
		width: 100%;
	}

</style>
