<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
  import northisland from '../../_geojson/rto2017_ni_simplified_3dp.geojson.json';
	import southisland from '../../_geojson/rto2017_si_simplified_3dp.geojson.json';
	import { scaleLinear } from 'd3-scale';

  let showNorth = true
  let showSouth = false
  let southSelection = []

  let linearscale = scaleLinear().domain([5, 15]);

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"
</script>

<div class = example>
    <!-- <h3>Multiple Layers</h3> -->
    <p>
      You may add multiple layers. The projection bounding box is set to the aggregate of the layer bounding boxes. </p>
    <p>
      Layers emit <code>mount</code> and <code>destroy</code> events.
    </p>
    <p> In this example, we have separate layers for the North and South Islands. They are being created and destroyed when toggled with the checkboxes below the map.</p>
    <p>The current selection will be lost when the layer is destroyed, but you can make it persist by binding it to a variable. 
      Here, the selection for the South Island layer is bound, the North Island one is not.</p>
    <p>Try selecting a few areas on each island, then turning the layers on and off.</p>
    

    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap>
            {#if showNorth} 
              <FeatureLayer
                geojson={northisland}
                styleAccessor={(feature, selected) => ({
                  'fill': selected ? 'blue' : 'grey',
                  'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
                  'stroke': selected ? 'blue' : 'grey',
                  'stroke-width': selected ? 2 : 1,
                  'vector-effect': 'non-scaling-stroke'
                })}
                selectMode={Infinity}
                idAccessor={(feature) => feature.properties.RTO2017__1}
              />
            {/if}
            {#if showSouth}   
              <FeatureLayer
                geojson={southisland}
                styleAccessor={(feature, selected) => ({
                  'fill': selected ? 'green' : 'grey',
                  'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
                  'stroke': selected ? 'green' : 'grey',
                  'stroke-width': selected ? 2 : 1,
                  'vector-effect': 'non-scaling-stroke'
                })}
                selectMode={Infinity}
                idAccessor={(feature) => feature.properties.RTO2017__1}
                bind:selection = {southSelection}
              />
            {/if}
          </BaseMap>
        </div>

        <label>
          Show the North Island
          <input type="checkbox" bind:checked={showNorth} />
        </label><br>
        <label>
          Show the South Island
          <input type="checkbox" bind:checked={showSouth} />
        </label>


      </div>
      <div class = code>
        <SSRPrism language="svelte">
              {`${openScript}
  import BaseMap from '$lib/BaseMap.svelte';
  import FeatureLayer from '$lib/FeatureLayer.svelte';
  import northisland from '../../_geojson/rto2017_ni_simplified_3dp.geojson.json';
  import southisland from '../../_geojson/rto2017_si_simplified_3dp.geojson.json';
  import { scaleLinear } from 'd3-scale';

  let linearscale = scaleLinear().domain([5, 15]);

  let showNorth = true
  let showSouth = false
  let southSelection = []
${closeScript}

<div class="basemap">
  <BaseMap>
    {#if showNorth} 
      <FeatureLayer
        geojson={northisland}
        styleAccessor={(feature, selected) => ({
          'fill': selected ? 'blue' : 'grey',
          'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
          'stroke': selected ? 'blue' : 'grey',
          'stroke-width': selected ? 2 : 1,
          'vector-effect': 'non-scaling-stroke'
        })}
        selectMode={Infinity}
        idAccessor={(feature) => feature.properties.RTO2017__1}
      />
    {/if}
    {#if showSouth}   
      <FeatureLayer
        geojson={southisland}
        styleAccessor={(feature, selected) => ({
          'fill': selected ? 'green' : 'grey',
          'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
          'stroke': selected ? 'green' : 'grey',
          'stroke-width': selected ? 2 : 1,
          'vector-effect': 'non-scaling-stroke'
        })}
        selectMode={Infinity}
        idAccessor={(feature) => feature.properties.RTO2017__1}
        bind:selection = {southSelection}
      />
    {/if}
  </BaseMap>
</div>

<label>
  Show the North Island
  <input type="checkbox" bind:checked={showNorth} />
</label><br>
<label>
  Show the South Island
  <input type="checkbox" bind:checked={showSouth} />
</label>

<style> 
  .basemap {
    border: black solid thin;
    background-color:#f9f9ff;
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