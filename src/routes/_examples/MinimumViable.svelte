<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import coastline from '../../_geojson/coastline_simplified_3dp.geojson.json';

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"
</script>

<div class = example>
    <!-- <h3>Minimum viable</h3> -->
    <p>The map inherits the size of the container you put it in. 
    The bounding boxes for the layers are calculated and the projection is generated to fit automatically.</p>
    <p>See the <a href="https://svelte.dev/repl/60c8ce8797cf464c8943c2064d379f4d" target="_blank">REPL</a></p>
    <div class = row>
      <div class = output>
        <div class="basemap" >
          <BaseMap>
            <FeatureLayer geojson={coastline} />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism language="svelte">
              {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';             
  //you can use any geojson. Here we are importing it from a file. 
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
  ${closeScript}

<div class = "basemap" >
  <BaseMap>
    <FeatureLayer geojson={coastline} />
  </BaseMap>
</div>

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