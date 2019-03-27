<template>

<div class="custom-nav">
<polaris-action-list :sections="sections"></polaris-action-list>

</div>

</template>


<script>
export default {
  props: {
    sections: {
      type: Array,
      default: () => [
        {
          title: 'Home',
          items: [
            // {content: 'Home', url: '/landing'},
            // {content: 'Recent Activity', url: '/recentactivity',  icon: 'fas fa-home'},
            // {content: 'Routes', url: '/routes'}
          ]
        }
      ]
    }
  }
}
</script>

<style>
  .custom-nav {
    width: 200px;
    padding-left: 10px;
    background-color:#494e54;
  }
  .Polaris-ActionList__Section{
    color:white;
  }
  .Polaris-ActionList__Item{
    color:white;
  }
  
</style>
