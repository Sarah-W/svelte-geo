<script>
	import { setContext } from 'svelte';
	import { createProjection } from './projectionStore.js';
	import { geoMercator } from 'd3-geo';
	import { zoomer } from './_zoomer.js';
	export let projection = null;
	export let margin = { left: 10, right: 10, top: 10, bottom: 10 };

	let width = 0;
	let height = 0;

	let _projection = createProjection(projection ?? geoMercator);
	let setSize = (height, width) => _projection.size([height, width]);

  $: _projection.setProjection(projection)

	$: setSize(height - (margin.top + margin.bottom), width - (margin.left + margin.right));
	setContext('basemap', { projection: _projection });

</script>

<div id="svgwrapper" bind:clientWidth={width} bind:clientHeight={height}>
	<svg use:zoomer={margin}>
		<g>
			<slot />
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
