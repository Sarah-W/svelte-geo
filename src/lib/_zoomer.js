import { zoom, zoomIdentity} from 'd3-zoom';
import { select } from 'd3-selection';
import { writable } from 'svelte/store';

export function createZoomer() {
	const z = zoom()
	let _svg
	let currentTransform = zoomIdentity

	let offsetX = writable(0)
	let offsetY = writable(0)

	return {
		zoomer: (svg) => {
			_svg = svg
			select(svg).call(
				z.on('zoom', ({transform,sourceEvent}) => {
					if (sourceEvent){
						offsetX.set(sourceEvent.offsetX)
						offsetY.set(sourceEvent.offsetY)
					}
					const { k, x, y } = transform;
					select(svg).select('g').selectAll('g.map-group')
						.attr('style', `transform:translate(${x}px, ${y}px) scale(${k})`);
				})
			);
		},
		reset: () => {
			select(_svg).transition().duration(750).call(z.transform, zoomIdentity);
			currentTransform = zoomIdentity
		},
		applyCurrentZoom: (element) => {
			select(element).call(z.transform, currentTransform)
		},
		offsetX,
		offsetY
	}
}

export function data(node, d) {
	node.__data__ = d;
}
