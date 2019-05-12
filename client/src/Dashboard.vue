<template>
  <layout
    :vertical="layout.vertical"
    :white="layout.background"
  >

    <!-- BRAND NAME TEXT  -->
    <template slot='brand'>
      SafeZone 
    </template>


  </layout>

</template>

<script>

export default {
  name: 'App',
  mounted () {
    this.$router.push({ name: `Landing` });
  },
  data () {
    return {
      layout: {
        vertical: true,
        background: false,
        collapsable: true
      }
    }
  },
  methods: {
   }
}
</script>

<style>

</style>
