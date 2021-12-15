import { zoom, zoomIdentity} from 'd3-zoom';
import { select } from 'd3-selection';

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
					console.log(k,x,y)
					let selection = select(svg)
						.select('g')
						.attr('style', `transform:translate(${left + x}px, ${top + y}px) scale(${k})`);
					selection.selectAll("g.tooltip").attr('style', `transform:scale(${1/k})translate(${-1*(x+left)}px, ${-1*(y+top)}px)`)	
				})
			);
		},
		reset: () => {
			select(_svg).transition().duration(750).call(z.transform, zoomIdentity);
		},
		unzoom:(element)=>{
			select(element).call(z.transform, zoomIdentity);
		}
	}
}

export function data(node, d) {
	node.__data__ = d;
}
