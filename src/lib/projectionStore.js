import { writable } from 'svelte/store'
import { geoMercator, geoBounds  } from 'd3-geo'

export function createProjection(projection) {
  projection = projection() ?? geoMercator() 
  const { subscribe, set, update } = writable(projection)
  
  let layerBoundingBoxes = {} // we stick the points in here from the bounding boxes
  let size = [0,0] //screen [height,width]

  const recalc = () => {
    const json = {
      type: "FeatureCollection",
      features:Object.values(layerBoundingBoxes)
        .map(d=>({
          geometry:{
            type:"LineString",
            coordinates:d
          }
        }))
      }
      console.log(layerBoundingBoxes)
    projection.fitSize(size,json)
    set(projection)
  }
  
  return {
    subscribe,
    set,
    update,
    size: (_size)=>{
        if(_size){size =_size;recalc()}
        return size
      },
    addLayer: (geojson,layerName) => {
      layerName = layerName ?? Math.random().toString(36).slice(-9)
      layerBoundingBoxes[layerName] = geoBounds(geojson)
      recalc()
      return layerName
    },
    clear: layerName => {
      if (layerName) {
        delete layerBoundingBoxes[layerName]
      } else {
        layerBoundingBoxes = {}
      }
      recalc()
    }
  }
}
