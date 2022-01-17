<script>
	import BaseMap from '$lib/BaseMap.svelte';
	import FeatureLayer from '$lib/FeatureLayer.svelte';
	import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';


  // bind:clientWidth does not work with svg elements

  let textElement
  $:textBoxWidth = textElement ? textElement.getComputedTextLength()+10 : 0

  import SSRPrism from '../_SSRPrism.svelte'
  const openScript = "<scri" + "pt>"
  const closeScript = "</scri" + "pt>"
</script>

<div class = example>
    <!-- <h3>Tooltip</h3> -->
    <p>Place SVG elements inside a FeatureLayer tag to create a tooltip. The origin of the tooltip is at the position of the pointer, so you can transform your SVG elements accordingly. </p>
    <div class = row>
      <div class = output>
        <div class="basemap" >
          <BaseMap>
            <FeatureLayer
              geojson={rto}
              styleAccessor={(feature) => ({
                'fill': 'black',
                'fill-opacity': 0.4,
                'stroke':'black',
                'stroke-width': 1,
                'vector-effect': 'non-scaling-stroke'
              })}
              let:hoveredFeature
            >
              <rect 
                width={textBoxWidth} 
                height = 21 
                x={-0.5*textBoxWidth} 
                y = -15
                rx = 10  
                fill="white" 
                opacity=0.8
              />
              <text 
                text-anchor="middle" 
                bind:this={textElement}>
                  {hoveredFeature?.properties.RTO2017__1}
              </text>
          </FeatureLayer>
          
          </BaseMap>
        </div>
      </div>
      <div class = code>
        <SSRPrism language="svelte">
{`${openScript}	
  import BaseMap from '$lib/BaseMap.svelte';
  import FeatureLayer from '$lib/FeatureLayer.svelte';
  import rto from '../../_geojson/rto2017_simplified_3dp.geojson.json';

  // bind:clientWidth does not work with svg elements, so we do this the long way. 
  let textElement
  $:textBoxWidth = textElement ? textElement.getComputedTextLength()+10 : 0
${closeScript}

<div class="basemap" >
  <BaseMap>
    <FeatureLayer
      geojson={rto}
      styleAccessor={(feature) => ({
        'fill': 'black',
        'fill-opacity': 0.4,
        'stroke':'black',
        'stroke-width': 1,
        'vector-effect': 'non-scaling-stroke'
      })}
      let:hoveredFeature >
      <rect 
        width={textBoxWidth} 
        height = 21 
        x={-0.5*textBoxWidth} 
        y = -15
        rx = 10  
        fill="white" 
        opacity=0.8
      />
      <text text-anchor="middle" bind:this={textElement} >
        {hoveredFeature?.properties.RTO2017__1}
      </text>
    </FeatureLayer>
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