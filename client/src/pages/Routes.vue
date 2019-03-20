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

           <!-- <b-card class="mb-2" >
            <b-row class="mb-2">
              <b-col >
                <label for="inputLive">Starting Point</label>
                <b-form-input type="text" :value="'695 Park Ave, New York, NY 10065'" >
                </b-form-input>
              </b-col>
            </b-row>
             <b-row class="mb-2">
              <b-col >
                <label for="inputLive">Destination</label>
                <b-form-input type="text" :value="'695 Park Ave, New York, NY 10065'" >
                </b-form-input>
              </b-col>
            </b-row>
            <b-tabs>
              <b-tab title="All">
                 <p> --- some sort of list displaying high risk zones user will be travelling sorted highest to lowest --- </p>
                </b-tab>
              <b-tab title="Safest">
                 <p> --- displays safest route w/ lowest risk zones --- </p>
                </b-tab>
            </b-tabs>
            </b-card> -->

     </b-row>

      <sz-sidebar :sections="sections"> </sz-sidebar>
    </layout-section>
  </layout>
</page>
</template>

<script>
export default {
  data () {
    return {
      sections: [
        {
          title: 'Routes',
          items: [
            {content: 'Home', url: '/home'},
            {content: 'Recent Activity', url: '/recentactivity'}
          ]
        }
      ]
    }
  }
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
