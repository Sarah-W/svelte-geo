<script>

  import Section from './_examples/Section.svelte'
  import MinimumViable from './_examples/MinimumViable.svelte';
  import SelectAreas1 from './_examples/SelectAreas1.svelte';
  import ClickableAreas from './_examples/ClickableAreas.svelte';
  import ColorStyle from './_examples/ColorStyle.svelte';
  import Projection from './_examples/Projection.svelte';
  import SelectAreas2 from './_examples/SelectAreas2.svelte';
  import LayerBehavior from './_examples/LayerBehavior.svelte';
  import ZoomBehavior from './_examples/ZoomBehavior.svelte';
  import Tooltip from './_examples/Tooltip.svelte';

</script>
<div class = container>
  <a href= https://github.com/Sarah-W/svelte-geo><h1>svelte-geo</h1></a>
  <h2>A basic map library for svelte projects, built using <a href = 'https://d3js.org/'>D3.js</a> </h2>
  <div class = collapsable>
    <Section title="Minimum Viable Map" active={true}>
      <MinimumViable></MinimumViable>
    </Section>
    <Section title="Using Projections"> 
      <Projection></Projection>
    </Section>
    <Section title="Color and Style"> 
      <ColorStyle></ColorStyle>
    </Section>
    <Section title="Clickable Areas"> 
      <ClickableAreas></ClickableAreas>
    </Section>
    <Section title="Selecting Areas"> 
      <SelectAreas1></SelectAreas1>
      <SelectAreas2></SelectAreas2>
    </Section>
    <Section title="Interacting with Layers"> 
      <LayerBehavior></LayerBehavior>
    </Section>
    <Section title="Zooming"> 
      <ZoomBehavior></ZoomBehavior>
    </Section>
    <Section title="Adding a Tooltip"> 
      <Tooltip></Tooltip>
    </Section> 
  </div>
</div>

  <style>

    .container{
      padding: 10px 100px 10px 100px
    }
    .collapsable{
      border-bottom: thin solid black;
      padding-bottom: 10px;
    }

  </style>