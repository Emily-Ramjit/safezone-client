<template>
<div id=statis>
      <b-row class="mb-2 ml-0">
      <div style="width:100%;">
        <div class="navbar navbar-default navbar-custom">
          <b-navbar-brand tag="h1" class="mb-0 ml-3">
            <strong> SafeZone </strong>
          </b-navbar-brand>
        </div>
      </div>
      <sz-sidebar > </sz-sidebar>

      <b-card class="mb-2" style="width:85%; height:200%;" title="Recent Activity">
        <b-col :cols="3">
             <b-card style="background-color: rgb(249, 193, 27);">
           <b-row>
              <b-col >
                <div class="pt-4">
                <b-form-input type="text" :value="'Choose a starting point...'" >
                </b-form-input>
                 <b-form-input type="text" :value="'Choose destination...'" >
                </b-form-input>
                </div>
              </b-col>
            </b-row>
          </b-card>
         <b-card style="background-color: rgb(243, 165, 29);">
           <b-row>
              <b-col >
               <p> Safest Route </p>
              </b-col>
               <b-col >
               <p> Fastest Route </p>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
         </b-card>

        </b-row>
        </div>
</template>

<script>
/* eslint-disable */
import api from '@/api/api'

export default {
  mounted () {

  },
  data () {
    return {
    }
  },
  methods: {
    
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
.card-title {
  margin-left:7px;
  font-size:16px;
}
.card-subtitle {
  margin-bottom:10px;
  margin-left:7px;
}
</style>
