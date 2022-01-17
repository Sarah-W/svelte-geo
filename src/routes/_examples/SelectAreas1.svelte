<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';
  import { scaleLinear } from 'd3-scale';
  
  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"  

  let selection
	let linearScale = scaleLinear().domain([5, 15]);
</script>

<div class = example>
    <!-- <h3>Selectable areas</h3> -->

    <p>Selecting an area adds it's uid to the selection array, which you can bind to.</p>
    <p>
      You can set what is used as the uid via the idAccessor function. This function should take a
      geojson feature and return a uid. It defaults to feature=>JSON.stringify(feature.properties).
    </p>
    <p>
      Set selectMode to the number of areas you wish to be able to select at one time. Oldest selections are discarded as new ones are added.   
    </p>
    <p>
      Use a styleAccessor function to highlight the selected areas. The function should have as 
      its first argument the geojson feature, and as the second a boolean which indicates whether 
      it is selected or not. It should return a style object.   
    </p>

    <p>See the <a href="https://svelte.dev/repl/96c7d74d3c164aca8820d275de32d403" target="_blank">REPL</a></p>
    
    <div class = row>
      <div class = output>
        <p>Select up to 3 areas</p>

        <p>Current Selection: {JSON.stringify(selection)}</p>

        <div class="basemap">
          <BaseMap>
            <FeatureLayer
              styleAccessor={(feature, selected) => ({
                'fill': 'black',
                'stroke': 'black',
                'vector-effect': 'non-scaling-stroke',
                'fill-opacity': selected ? 0.5 : 0.1
              })}
              geojson={rto}
              selectMode={3}
              idAccessor={(feature) => feature.properties.RTO2017__1}
              bind:selection={selection}
            />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism>{`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  let selection = [] 
${closeScript}  

<p>Select up to 3 areas</p>
<p>Current Selection: {JSON.stringify(selection)}</p>   
<div class="basemap">
  <BaseMap>
    <FeatureLayer
      styleAccessor={(feature, selected) => ({
        'fill': 'black',
        'stroke': 'black',
        'vector-effect': 'non-scaling-stroke',
        'fill-opacity': selected ? 0.5 : 0.1
      })}
      geojson={rto}
      selectMode={3}
      idAccessor={(feature) => feature.properties.RTO2017__1}
      bind:selection={selection}
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