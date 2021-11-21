<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
	import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
	import northisland from './_geojson/rto2017_ni_simplified_3dp.geojson.json';
	import southisland from './_geojson/rto2017_si_simplified_3dp.geojson.json';
	import { geoEqualEarth, geoMercator} from 'd3-geo';
	import { scaleOrdinal, scaleLinear } from 'd3-scale';
  import SSRPrism from './_SSRPrism.svelte'
  // import 'prismjs/themes/prism-okaidia.css'

	let selection2, selection3;
	let selectModeValue = 2;
	let selectModeValueIsInfinite = false;
	let clicked;
	let ordinalScale = scaleOrdinal().range([
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

	let linearScale = scaleLinear().domain([5, 15]);
  let projection = geoEqualEarth

</script>
<div class = container>
  <h1>svelte-geo</h1>
  <h2>A basic map library for svelte projects, built using <a href = 'https://d3js.org/'>D3.js</a> </h2>
  <div class = example>
    <h3>Minimum viable</h3>
    <p>The map inherits the size of the container you put it in. 
    The bounding boxes for the layers are calculated and the projection is generated to fit automatically.</p>
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
              {`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';             
  //you can use any geojson. Here we are importing it from a file. 
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
</script>

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

  <div class = example>
    <h3>Projection</h3>

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
          {`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';       
  import { geoMercator, geoEqualEarth } from 'd3-geo';
  import coastline from './_geojson/coastline_simplified_3dp.geojson.json';
  let projection = geoEqualEarth
</script>

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
  <div class = example>
    <h3>Styling areas</h3>

    <p>
      Apply styles to areas based on feature information by supplying a styleAccessor function. The function takes
      a feature and it's selection status, and returns a style object.
    </p>
    <p>
      Areas are styled using a d3-scale linear scale, to change the fill-opacity acccording to the
      length of their names (feature.properties.RTO2017__1). This is one method of creating a choropleth.
    </p>
    <div class = row>
      <div class = output>
        <div class="basemap">
          <BaseMap>
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
            {`<script>
    import { BaseMap, FeatureLayer } from 'svelte-geo';
    import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
    import { scaleLinear } from 'd3-scale';
    let linearScale = scaleLinear().domain([5, 15]);
  </script>  
  <div class="basemap">
    <BaseMap>
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
          {`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  import { scaleOrdinal } from 'd3-scale';
  let ordinalScale = scaleOrdinal()
    .range(['lime','tomato','peachpuff','olive','papayawhip','plum','wheat','orange','salmon','honeydew','lightsalmon','lemonchiffon','blanchedalmond','chocolate']);  
</script>  

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

  <div class = example>
    <h3>Clickable areas</h3>

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
            <SSRPrism language='js'>{JSON.stringify(clicked.properties,undefined,2)}</SSRPrism>
          {:else}
            <p>Click on the map!</p>
          {/if}
        </div>
      </div>
      <div class = code>
        <SSRPrism language="svelte">
          {`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  let clicked  
</script>  

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
  <div class = example>
    <h3>Selectable areas</h3>

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
    <div class = row>
      <div class = output>
        <p>Select up to 3 areas</p>

        <p>Current Selection: {JSON.stringify(selection2)}</p>

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
              bind:selection={selection2}
            />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism>{`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  let selection = [] 
</script>  

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

        <p>Current Selection: {JSON.stringify(selection3)}</p>

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
              bind:selection={selection3}
            />
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism>
    {`<script>
  import { BaseMap, FeatureLayer } from 'svelte-geo';
  import rto from './_geojson/rto2017_simplified_3dp.geojson.json';
  
  let selectModeValue = 2
  let selectModeValueIsInfinite = false
  let selection = [] 
</script>  

<label>
	Selecting up to
	<input type="number" 
    disabled={selectModeValueIsInfinite} 
    bind:value={selectModeValue} 
    min="0"/>
	areas.
</label>
<label>
	<input type="checkbox" bind:checked={nIsInfinite} />
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
</div>



<style>
  .container{
    padding: 10px 100px 10px 100px
  }
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
