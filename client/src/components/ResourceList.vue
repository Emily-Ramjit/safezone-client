<template>
  <div class="list-group mb-2">
    <slot/><!-- slot for future search?-->
    <resource-list-item v-for="(item, i) in items.slice(0, 6)" :key="i"
      :shortcutActions="item.shortcutActions"
      :persistentActions="true"
    >

  <b-row style="padding-left:10px;">
      <div style="padding-left:5px font-size: 10px; font-weight: 200;">
          <span v-html="item.icon"/> 
                {{item.stop}} 
             </span>
          <hr/>
       Percentile: {{item.percentile}}
      </div>
       
  </b-row>
  <sz-button class="float-right" plain @click.native="setRoute(item.latitude, item.longitude, item.icon, item.stop)"> View Crimes
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
    setRoute (lat, long, icon, stop) {
      var station = icon + ' - ' + stop
      this.$router.push({name: 'recentactivity', params: { station: station, latitude: lat, longitude: long }})
    }
  }
}
</script>

<style>

</style>
