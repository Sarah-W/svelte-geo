import { zoom } from 'd3-zoom';
import { select } from 'd3-selection';

export function zoomer(svg, offset) {
	const { left, top } = offset ?? { left: 0, top: 0 };
	select(svg).select('g').attr('style', `transform:translate(${left}px, ${top}px)`);
	select(svg).call(
		zoom().on('zoom', ({ transform }) => {
			const { k, x, y } = transform;
			select(svg)
				.select('g')
				.attr('style', `transform:translate(${left + x}px, ${top + y}px) scale(${k})`);
		})
	);
}

export function data(node, d) {
	node.__data__ = d;
}
