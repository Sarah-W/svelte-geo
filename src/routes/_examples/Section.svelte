<script>
export let title = 'title'
export let active = false
</script>

<div class = control on:click={()=>active=!active}>
  <h3>{title}</h3> 
</div>

{#if active}
  <div class = content>
    <slot></slot>
  </div>
{:else}
<div class = inactive></div>  
{/if}


<style>
  h3{
    margin: 0;
  }
  div{
    border: thin solid black;
    padding:10px;
  }
  .control{
    display:flex;
    justify-content: space-between;
    border-top-right-radius:10px;
    border-top-left-radius:10px; 
    border-bottom: none;
    cursor:pointer;
  }
  .content{
    border-top: none;
    border-bottom: none;
    margin-bottom: -10px;
  }
  .inactive{
    border-top: none;
    border-bottom: none;
    height:10px;
    margin-bottom: -10px;
    padding:0;
  }

</style>