<script>

  import MinimumViable from './_examples/MinimumViable.svelte';
  import SelectAreas1 from './_examples/SelectAreas1.svelte';
  import ClickableAreas from './_examples/ClickableAreas.svelte';
  import ColorStyle from './_examples/ColorStyle.svelte';
  import Projection from './_examples/Projection.svelte';
  import SelectAreas2 from './_examples/SelectAreas2.svelte';
  import LayerBehavior from './_examples/LayerBehavior.svelte';

</script>
<div class = container>
  <a href= https://github.com/Sarah-W/svelte-geo><h1>svelte-geo</h1></a>
  <h2>A basic map library for svelte projects, built using <a href = 'https://d3js.org/'>D3.js</a> </h2>
  
  <MinimumViable></MinimumViable>
  <Projection></Projection>
  <ColorStyle></ColorStyle>
  <ClickableAreas></ClickableAreas>
  <SelectAreas1></SelectAreas1>
  <SelectAreas2></SelectAreas2>
  <LayerBehavior></LayerBehavior>

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