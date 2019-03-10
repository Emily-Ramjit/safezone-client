<template>
<page fullWidth>
  <layout>
      <layout-section>
      <b-row class="mb-2 ml-3">
      <div style="width:1270px;">
        <div class="navbar navbar-default navbar-custom">
          <b-navbar-brand tag="h1" class="mb-0 ml-3">
            <strong> SafeZone </strong>
          </b-navbar-brand>
        </div>
      </div>
      </b-row>
      <sz-sidebar> </sz-sidebar>
    </layout-section>
  </layout>
</page>
</template>

<script>

export default {

}
</script>

<style>
.navbar-custom {
    color: #FFFFFF;
    background-color: #ffc107;
    height:50px;
}
.navbar-brand
{
  font-family: 'Lato', sans-serif;
  font-size: 20px;
}
</style>
