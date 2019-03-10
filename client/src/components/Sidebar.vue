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
            {content: 'Statistics', url: '/home'},
            {content: 'Recent Activity', url: '/recentactivity'},
            {content: 'Routes', url: '/routes'}
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
  }
</style>
