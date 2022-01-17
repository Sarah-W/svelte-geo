<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"

	let clicked;
  $: console.log(clicked?.properties.RTO2017__1)

</script>

<div class = example>
    <!-- <h3>Clickable areas</h3> -->

    <p>Clicking on an area dispatches a click event. e.detail contains the geojson feature object.</p>
    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap>
            <FeatureLayer
              geojson={rto}
              on:click={(e) => (clicked = e.detail.feature)}
            />
          </BaseMap>
        </div>
        <div>
          {#if clicked}
            <p>The last thing you clicked was:</p>
            <!-- <SSRPrism language='js'>{JSON.stringify(clicked.properties,undefined,2)}</SSRPrism> -->
            <pre>{JSON.stringify(clicked.properties,undefined,2)}</pre>
            {:else}
            <p>Click on the map!</p>
          {/if}
        </div>
      </div>
      <div class = code>
        <SSRPrism language="svelte">
          {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  let clicked  
${closeScript}  

<div class="basemap">
  <BaseMap>
    <FeatureLayer
      geojson={rto}
      on:click={(e) => (clicked = e.detail.feature)}
    />
  </BaseMap>
</div>
<div>
  {#if clicked}
    <p>The last thing you clicked was:</p>
    <pre>{JSON.stringify(clicked.properties,undefined,2)}</pre>
  {:else}
    <p>Click on the map!</p>
  {/if}
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
      padding:10px;
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
    pre{
      padding:10px;
      background-color:#f9f9ff;
      border: black solid thin;
      margin: 20px;
    }
  </style>