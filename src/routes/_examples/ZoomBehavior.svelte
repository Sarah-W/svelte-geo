<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
  import northisland from '../../_geojson/rto2017_ni_simplified_3dp.geojson.json';
	import southisland from '../../_geojson/rto2017_si_simplified_3dp.geojson.json';
	import { scaleLinear } from 'd3-scale';

  let linearscale = scaleLinear().domain([5, 15]);

  let showNorth = true
  let showSouth = false

  let zoomReset

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"
</script>

<div class = example>
    <!-- <h3>Zoom/pan behavior and Zoom Reset</h3> -->
    <p>
      Zooming is enabled by default. 
      Zoom behavior is provided using <a href=https://github.com/d3/d3-zoom>d3-zoom</a>. It scales and translates the <code>&lt;g&gt;</code> elements containing the map paths, and does not affect the projection.  
    </p>
    <p>
      BaseMap exports the function <code>zoomReset()</code> which takes no arguments and resets zoom and pan. 
    </p>
    <p>
      Since this may interact strangely with changes in projection, you may want to reset the zoom when adding or removing a layer. 
      In this example, zoom is reset when adding or removing the North Island layer.
    </p>
  
    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap bind:zoomReset>
            {#if showNorth} 
              <FeatureLayer
                geojson={northisland}
                styleAccessor={(feature, selected) => ({
                  'fill': 'grey',
                  'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
                  'stroke': 'grey',
                  'stroke-width': 1,
                  'vector-effect': 'non-scaling-stroke'
                })}
                on:mount ={zoomReset}
                on:destroy = {zoomReset}
              />
            {/if}
            {#if showSouth}   
              <FeatureLayer
                geojson={southisland}
                styleAccessor={(feature, selected) => ({
                  'fill': 'grey',
                  'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
                  'stroke':'grey',
                  'stroke-width': 1,
                  'vector-effect': 'non-scaling-stroke'
                })}
              />
            {/if}
          </BaseMap>
        </div>
        <br/>
        <button on:click={zoomReset} >reset zoom</button>
        <br/>
        <br/>
        <label>
          {showNorth?"Destroy":"Create"} the North Island and reset the zoom:
          <input type="checkbox" bind:checked={showNorth} />
        </label><br/>
        <label>
          {showSouth?"Destroy":"Create"} the South Island and <b>DON'T</b> reset the zoom. 
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

  let zoomReset
${closeScript}

<div class="basemap">
  <BaseMap bind:zoomReset>
    {#if showNorth} 
      <FeatureLayer
        geojson={northisland}
        styleAccessor={(feature, selected) => ({
          'fill': 'grey',
          'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
          'stroke': 'grey',
          'stroke-width': 1,
          'vector-effect': 'non-scaling-stroke'
        })}
        on:mount ={zoomReset}
        on:destroy = {zoomReset}
      />
    {/if}
    {#if showSouth}   
      <FeatureLayer
        geojson={southisland}
        styleAccessor={(feature, selected) => ({
          'fill': 'grey',
          'fill-opacity': linearscale(feature.properties.RTO2017__1.length),
          'stroke':'grey',
          'stroke-width': 1,
          'vector-effect': 'non-scaling-stroke'
        })}
      />
    {/if}
  </BaseMap>
</div>

<br/>
<button on:click={zoomReset} >reset zoom</button>
<br/>
<br/>
<label>
  {showNorth?"Destroy":"Create"} the North Island and reset the zoom:
  <input type="checkbox" bind:checked={showNorth} />
</label><br/>
<label>
  {showSouth?"Destroy":"Create"} the South Island and <b>DON'T</b> reset the zoom. 
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