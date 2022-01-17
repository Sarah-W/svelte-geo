<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';

  import { scaleOrdinal, scaleLinear } from 'd3-scale';

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"

  let linearScale = scaleLinear().domain([5, 15]).range([0,1]);

	let ordinalScale = scaleOrdinal()
    .range([ // array of valid html colors.
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

 
</script>

<div class = example>
    <!-- <h3>Color and Style </h3> -->

    <p>
      Apply styles to areas based on feature information by supplying a styleAccessor function. The function takes
      a feature and it's selection status, and returns a style object.
    </p>
    <p>Setting background on the BaseMap component to any valid html color sets the background-color style of the .svg. <p>
    <p>
      Areas are styled using a d3-scale linear scale, to change the fill-opacity acccording to the
      length of their names (feature.properties.RTO2017__1). This is one method of creating a choropleth.
    </p>
    <p>See the <a href="https://svelte.dev/repl/8bcf4c9230fc479995440e5a6597f87e" target="_blank">REPL</a></p>
    
    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap background = {'#fbf9e4'}>
            <FeatureLayer
              geojson={rto}
              styleAccessor={(feature) => ({
                fill: 'tomato',
                'fill-opacity': linearScale(feature.properties.RTO2017__1.length),
                stroke: 'tomato',
                'vector-effect': 'non-scaling-stroke'
              })}
            />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism language="svelte">
            {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  import { scaleLinear } from 'd3-scale';
  let linearScale = scaleLinear().domain([5, 15]);
${closeScript}  
<div class="basemap">
  <BaseMap background = {'#fbf9e4'}>
    <FeatureLayer
      geojson={rto}
      styleAccessor={(feature) => ({
        'fill': 'tomato',
        'fill-opacity': linearScale(feature.properties.RTO2017__1.length),
        'stroke': 'tomato',
        'vector-effect': 'non-scaling-stroke'
      })}
    />
  </BaseMap>
</div>  

<style> 
.basemap {
  border: black solid thin;
  background-color: #f9f9ff;
  width: 400px;
  height: 400px;
  margin: 20px;
}
<\/style>`}
        </SSRPrism>
      </div>
    </div>

    <p>
      Areas are styled using a d3-scale ordinal scale, acccording to the first letter of their name.
    </p>
    <p>See the <a href="https://svelte.dev/repl/4de88c11797a4cb78e92aff8f7745ab8" target="_blank">REPL</a></p>
    
    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap>
            <FeatureLayer
              geojson={rto}
              styleAccessor={(feature) => ({
                'fill': ordinalScale(feature.properties.RTO2017__1[0]),
                'stroke': 'olive',
                'vector-effect': 'non-scaling-stroke'
              })}
            />
          </BaseMap>
        </div>
      </div>  
      <div class = code>
        <SSRPrism language="svelte">
          {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  import { scaleOrdinal } from 'd3-scale';
  let ordinalScale = scaleOrdinal()
    .range(['lime','tomato','peachpuff','olive','papayawhip','plum','wheat','orange','salmon','honeydew','lightsalmon','lemonchiffon','blanchedalmond','chocolate']);  
${closeScript}  

<div class="basemap">
  <BaseMap>
    <FeatureLayer
      geojson={rto}
      styleAccessor={(feature) => ({
        "fill": ordinalScale(feature.properties.RTO2017__1[0]),
        "stroke": 'olive',
        "vector-effect": 'non-scaling-stroke'
      })}
    />
  </BaseMap>
</div>

<style> 
  .basemap {
    border: black solid thin;
    background-color: #f9f9ff;
    width: 400px;
    height: 400px;
    margin: 20px;
  }
<\/style>`}
        </SSRPrism>
      </div>
    </div>
  </div>

  <style>
    .example{
      padding-bottom: 10px; 
    }
    .row{
      display:flex
    }
    div.output{
      border: black solid thin;
      background-color:#efeeee;
      margin:28px 20px;
      padding:10px 10px 10px 10px;
    }
    div.basemap {
      border: black solid thin;
      width: 400px;
      height: 400px;
      margin: 20px;
      background-color:#f9f9ff;
    }
    div.code{
      width: 800px;
      margin: 20px;
    }
  </style>