<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';
  import { scaleLinear } from 'd3-scale';
  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"  

  let selection
	let selectModeValue = 2;
	let selectModeValueIsInfinite = false;



</script>

<div class = example>
    <p>
      You can change the number of areas you are choosing to select programmatically. Changing to a
      smaller number discards the oldest selections first.
    </p>

    <div class = row>
      <div class = output>
        <label>
          Selecting up to
          <input type="number" 
            disabled={selectModeValueIsInfinite} 
            bind:value={selectModeValue} 
            min="0" max="30" />
          areas.
        </label>
        <label>
          <input type="checkbox" bind:checked={selectModeValueIsInfinite} />
          Infinite
        </label> <br />

        <p>Current Selection: {JSON.stringify(selection)}</p>

        <div class="basemap">
          <BaseMap>
            <FeatureLayer
              geojson={rto}
              styleAccessor={(feature, selected) => ({
                fill: 'red',
                stroke: 'black',
                'vector-effect': 'non-scaling-stroke',
                'fill-opacity': selected ? 0.9 : 0.1
              })}
              selectMode={selectModeValueIsInfinite ? Infinity : selectModeValue}
              idAccessor={(feature) => feature.properties.OBJECTID}
              bind:selection={selection}
            />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism>
    {`${openScript}
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  
  let selectModeValue = 2
  let selectModeValueIsInfinite = false
  let selection = [] 
${closeScript}  

<label>
	Selecting up to
	<input type="number" 
    disabled={selectModeValueIsInfinite} 
    bind:value={selectModeValue} 
    min="0"/>
	areas.
</label>
<label>
	<input type="checkbox" bind:checked={selectModeValueIsInfinite} />
	Infinite
</label> <br />
<p>Current Selection: {JSON.stringify(selection)}</p>   
<div class="basemap">
  <BaseMap>
    <FeatureLayer
      styleAccessor={(feature, selected) => ({
        'fill': 'red',
        'stroke': 'black',
        'vector-effect': 'non-scaling-stroke',
        'fill-opacity': selected ? 0.5 : 0.1
      })}
      geojson={rto}
			selectMode={selectModeValueIsInfinite ? Infinity : selectModeValue}
			idAccessor={(feature) => feature.properties.OBJECTID}
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

