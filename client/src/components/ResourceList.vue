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
  <sz-button class="float-right" plain @click.native="setRoute(item.latitude, item.longitude, item.line, item.stop)"> View Crimes
 <i class="fas fa-long-arrow-alt-right"></i> </sz-button>
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
  },
  methods: {
    setRoute (lat, long, line, stop) {
      var station = line + ' - ' + stop
      this.$router.push({name: 'recentactivity', params: { station: station, latitude: lat, longitude: long }})
    }
  }
}
</script>

<style>

</style>
