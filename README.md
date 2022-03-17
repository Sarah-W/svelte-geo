# svelte-geo

A tiny library for making maps, intended for use in data visualisation projects. Svelte-geo uses [d3-geo](https://github.com/d3/d3-geo) to plot .geojson polygon data as svg.

[svelte-geo in action](https://svelte-geo.vercel.app/)

## Two components

```
  <BaseMap
    projection={a_d3-geo_projection}
    margin = {{left:10,right:10,top:10,bottom:10} }
    background = {any_valid_html_color}
    bind:zoomReset = {resetter}
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
      on:mount = {event_handler}
      on:destroy = {event_handler}
      let:hoveredFeature
    >
      <text>{hoveredFeature.someAttribute}</text>
    </FeatureLayer>
  </BaseMap>
```

BaseMap sets up things which are common to all feature layers e.g. the map projection and the margin to allow around the layers.

## BaseMap 
### props

**projection** : a [D3-geo projection](https://github.com/d3/d3-geo)  
**margin** : a margin object of the form `{left:10,right:10,top:10,bottom:10}`. Measurements are in px.   
**background** : sets the background color of the `<svg>` element.   
**zoomReset** : exports a reset function for the map zoom.   

### slot
`<FeatureLayer>` elements go in a slot in `<BaseMap>`. `<FeatureLayer>` plots and styles the features from a geojson object.
You may use multiple `<FeatureLayer>`s in a map.  

## FeatureLayer 
### props

**geojson** : a geojson object. **Required**  
**styleAccessor** : a function that takes a feature from your geojson object, and a selection status (boolean), and returns a style object for an svg path.  
**idAccessor** : a function that takes a feature from your geojson object, and returns a unique identifier for the feature. This is what will be stored in `selection`.  
**selectMode** : defines the number of features that may be selected. May be an integer >=0, or `Infinity`.  
**selection** : an array containing the uid's of the current selection. Bind to `selection` to control the selection programmatically.

### events
**mount**  
**destroy**

Mount and destroy events are dispatched when the `<FeatureLayer>` element is created or destroyed.   

**click**  
**mousemove**  
**mouseenter**  
**mouseleave**  
Mouse events are dispatched when the `<svg>` elements in the `<Featurelayer>` are interacted with. `e.detail` contains the originating event and the feature.
 

### slot
Any SVG elements placed inside the `<FeatureLayer>` element will be rendered as a tooltip with its origin at the position of the mouse pointer. Slot prop `hoveredFeature` is provided and contains the feature.  
