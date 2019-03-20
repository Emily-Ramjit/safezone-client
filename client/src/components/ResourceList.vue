<template>
  <div class="list-group mb-2">
    <slot/><!-- slot for future search?-->
    <resource-list-item v-for="(item, i) in items" :key="i"
      :shortcutActions="item.shortcutActions"
      :persistentActions="true"
    >

  <b-row style="padding-left:10px;">
      <h5> {{item.line}} - </h5> <div style="padding-left:5px"> {{item.stop}} </div>
  </b-row>
  <sz-button class="float-right" plain> <router-link :to="'recentactivity'">View Crimes</router-link>
 <i class="fas fa-long-arrow-alt-right"></i> </sz-button>
      <!-- <div>Risk - {{item.risk}}</div>
      <div>Crime Rate - {{item.crimeRate}}</div> -->

    </resource-list-item>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>

</style>
