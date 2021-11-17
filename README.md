# svelte-geo

A tiny library for making maps, intended for use in data visualisation projects. Svelte-geo uses [d3-geo](https://github.com/d3/d3-geo) to plot .geojson polygon data as svg.

## Two components

```
  <BaseMap
    projection={a_d3-geo_projection}
    margin = {{left:10,right:10,top:10,bottom:10} }
  >
    <FeatureLayer
      geojson={geojson_object}
      styleAccessor = {(feature, selected) => style_object}
      idAccessor = {feature => feature_uid}
      selectMode = {integer >=0 || Infinity}
      bind:selection = {selection}
      on:click={event_handler}
      on:mousemove = {event_handler}
      on:mouseenter = {event_handler}
      on:mouseleave = {event_handler}
    \>
  <\BaseMap>
```

BaseMap sets up things which are common to all feature layers e.g. the map projection and the margin to allow around the layers.

### BaseMap props

**projection** : a [D3-geo projection](https://github.com/d3/d3-geo)  
**margin** : a margin object of the form `{left:10,right:10,top:10,bottom:10}`. Measurements are in px.

FeatureLayer goes in a slot in BaseMap. It plots and styles the features from a geojson object.

### FeatureLayer props

**geojson** : a geojson object. **Required**  
**styleAccessor** : a function that takes a feature from your geojson object, and a selection status (boolean), and returns a style object for an svg path.  
**idAccessor** : a function that takes a feature from your geojson object, and returns a unique identifier for the feature. This is what will be stored in `selection`.  
**selectMode** : defines the number of features that may be selected. May be an integer >=0, or `Infinity`.  
**selection** : an array containing the uid's of the current selection. Bind to `selection` to control the selection programmatically.
