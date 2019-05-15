<template>
  <div id=routes>
    <b-row class="ml-0">
      <div style="width:100%; height:100%;">
        <div class="navbar navbar-default navbar-custom">
          <b-navbar-brand tag="h1" class="mb-0 ml-3">
            <strong> SafeZone </strong>
          </b-navbar-brand>
        </div>
      </div>
    </b-row>
    <b-row class="mb-2 ml-0">
      <b-card class="mb-2" style="width:100%; min-height:200%;">
        <div style="font-size: 25px; font-weight: 200;">
          Routes 
          <hr class="my-4" />
        </div>
        <b-row>
          <b-col :cols="4">
            <b-row class="mt-2">
              <b-card class="ml-4" style="width: 103%; height: 100px; background-color:rgb(247, 247, 247);;">
                <b-row>
                  <b-col :cols="1">
                    <div class="pt-4">
                      <img src='/static/icons8-track-order-64.png' height="28" width="28"/>
                    </div>
                  </b-col >
                  <b-col :cols="11" >
                    <div class="pt-4">
                      <b-form-input type="text"  v-model="originAddress" :placeholder="'Choose a starting point...'" >
                      </b-form-input>
                      <b-form-input type="text" v-model="destinationAddress"  :placeholder="'Choose destination...'" @keydown.enter.native="getCoordinatesByAddress(originAddress, destinationAddress)" >
                      </b-form-input>
                    </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-row>
            <b-row>
              <b-card class="ml-4" style="width: 103%;height: 40px;background-color: rgb(247, 247, 247);;">
                All Routes
              </b-card>
            </b-row>
            <div v-if="isLoaded && allRoutes.length > 0">
              <b-row>
                <b-card class="ml-4" style="width: 103%;height:500%;background-color: rgb(255, 255, 255)">
                  <b-row>
                    <b-col >
                      <div v-for="route in allRoutes">
                        Rating: {{route.rating}}
                        <br>
                        <img src='/static/icons8-subway-filled-50.png' height="25" width="25"/>
                        {{route.leg.departure_time.text}} - {{route.leg.arrival_time.text}}
                        <div class="float-right">
                          {{route.leg.duration.text}}
                        </div>
                        <br>
                        <div class="pl-5">
                          <div v-for="pathInfo in route.leg.steps">
                            <div v-if="pathInfo.travel_mode === 'TRANSIT'">
                              <span v-if="pathInfo.transit_details.line.short_name">
                              {{pathInfo.transit_details.line.short_name}} TOWARDS {{pathInfo.transit_details.line.name}}
                              </span>
                              <span v-else>
                              LIRR TOWARDS {{pathInfo.transit_details.line.name}}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr>
                      </div>
                    </b-col>
                  </b-row>
                </b-card>
              </b-row>
            </div>
            <div v-else>
              <b-card style="width: 103%;">
                <div style="padding-top:1px;font-size: 14px; font-weight: 200;">
                  <center><b> No Routes Found! </b> </center>
                </div>
                <div style="padding-top:1px;font-size: 12px; font-weight: 200;">
                  <center> Please type in a valid address. </center>
                </div>
              </b-card>
            </div>
          </b-col>
          <b-col :cols="8">
            <div>
              <GmapMap ref="map" id="map"
                :center="{lat:this.destinationLatitude, lng:this.destinationLongitude}"
                :zoom="zoom"
                map-type-id="terrain"
                style="width: 100%; height: 550px"
                >
                <GmapMarker
                  :key="index"
                  :position="{lat:this.destinationLatitude, lng:this.destinationLongitude}"
                  :clickable="true"
                  :draggable="true"
                  />
                <GmapMarker
                  :key="index"
                  :position="{lat:this.originLatitude, lng:this.originLongitude}"
                  :clickable="true"
                  :draggable="true"
                  />
              </GmapMap>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-row>
  </div>
</template>
<script>

/* eslint-disable */
import api from '@/api/api'
export default {
  mounted () {
    // fetch data for routes 
    this.fetch()
  },
  data () {
    return {
      // default/initial values for address/route information
      isLoaded: false,
      originAddress: '',
      destinationAddress: '',

      originLatitude: 0,
      originLongitude: 0,

      destinationLatitude: 40.7618356,
      destinationLongitude: -73.9821805,

      allRoutes: [],
      zoom: 16
    }
  },
  methods: {
    // function to get coordinates 
    getCoordinatesByAddress(origin, destination) {
      // set parameters for request to getCoordinates endpoint
      var originParams = {
        address: origin,
        key: ''
      }
      var destinationParams = {
        address: destination,
        key: ''
      }
       // asynchronous call to api server endpoint
      api.getCoordinatesByAddress(originParams)
        .then(res => {
          // map origin latitude and longitude from response data
          this.originLongitude = res.data.results[0].geometry.location.lng
          this.originLatitude = res.data.results[0].geometry.location.lat
        }).then(res => {
           // asynchronous call to api server endpoint
          api.getCoordinatesByAddress(destinationParams)
        .then(res => {
          // map destination latitude and longitude from response data
          this.destinationLongitude = res.data.results[0].geometry.location.lng
          this.destinationLatitude = res.data.results[0].geometry.location.lat
        }).then(res => {
          // reformat google maps
          this.zoom = 14
          // get routes
          this.getRoutes()
         })
       })
    },
    // function to get routes
    getRoutes() {
      // initialize allRoutes array
      this.allRoutes = []
       // set parameters for request to getRoutes endpoint
      var params = {
        origin_latitude: this.originLatitude,
        origin_longitude: this.originLongitude,
        dest_latitude: this.destinationLatitude,
        dest_longitude: this.destinationLongitude,
        key: ''
      }
       // asynchronous call to api server endpoint
      api.getRoutes(params)
        .then(res => {
          // map allRoutes to response data
          this.allRoutes = res.data
        }).then(res => {
          // set isLoaded to true so that page can populate all data
         this.isLoaded = true
        })
    }
  }
}

</script>
<style>
.navbar-custom {
  color: #FFFFFF;
  background-color: #ffc107;
  height:60px;
}
.navbar-brand
{
  font-family: 'Lato', sans-serif;
  font-size: 20px;
}
</style>
