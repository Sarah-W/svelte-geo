<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import coastline from '../../_geojson/coastline_simplified_3dp.geojson.json';

	import { geoEqualEarth, geoMercator} from 'd3-geo';
	
  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"

  let projection = geoEqualEarth

</script>

<div class = example>
    <!-- <h3>Projection</h3> -->

    <p> The default projection is geoMercator, but you can use any <a href = "https://github.com/d3/d3-geo">d3-geo</a> projection function that works for your geojson.</p>
    <p> You may switch between projections on the fly. </p>

    <div class = row> 
      <div class = output>
        <input type="radio" id="geoEqualEarth" name="projection" on:click={()=>projection = geoEqualEarth} checked>
        <label for="geoEqualEarth">geoEqualEarth</label> 
        <input type="radio" id="geoMercator" name="projection" on:click={()=>projection = geoMercator} >
        <label for="geoMercator">geoMercator</label>
        <div class="basemap">
          <BaseMap projection = { projection } >
            <FeatureLayer geojson={coastline} />
          </BaseMap>
        </div>  
      </div>
      <div class = code>
        <SSRPrism language="svelte">
          {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';       
  import { geoMercator, geoEqualEarth } from 'd3-geo';
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
  let projection = geoEqualEarth
${closeScript}

<input type="radio" id="geoEqualEarth" name="projection" 
  on:click={()=>projection = geoEqualEarth} checked>
<label for="geoEqualEarth">geoEqualEarth</label> 
<input type="radio" id="geoMercator" name="projection" 
  on:click={()=>projection = geoMercator} >
<label for="geoMercator">geoMercator</label>

<div class = basemap>
  <BaseMap projection = { geoEqualEarth } >
    <FeatureLayer geojson={coastline} />
  </BaseMap>
<div>

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