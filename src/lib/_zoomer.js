import { zoom, zoomIdentity} from 'd3-zoom';
import { select } from 'd3-selection';

console.log({zoomIdentity})

export function createZoomer() {
	const z = zoom()
	let _svg
	return {
		zoomer: (svg, offset) => {
			_svg = svg
			const { left, top } = offset ?? { left: 0, top: 0 };
			select(svg).select('g').attr('style', `transform:translate(${left}px, ${top}px)`);
			select(svg).call(
				z.on('zoom', ({ transform }) => {
					const { k, x, y } = transform;
					select(svg)
						.select('g')
						.attr('style', `transform:translate(${left + x}px, ${top + y}px) scale(${k})`);
				})
			);
		},
		reset: () => {
			select(_svg).transition().duration(750).call(z.transform, zoomIdentity);
		}
	}
}

export function data(node, d) {
	node.__data__ = d;
}
