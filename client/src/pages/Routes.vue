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
      <sz-sidebar> </sz-sidebar>

      <b-card class="mb-2" style="width:85%; min-height:200%;">
           <div style="font-size: 25px; font-weight: 200;"> Routes 
               <hr class="my-4" />
           </div>
<b-row>

  <b-col :cols="5">
     <b-row class="mt-2">            
        <b-card class="ml-3" style="width: 600px; height: 100px; background-color:rgb(247, 247, 247);;">
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
        <b-card class="ml-3" style="width: 600px;height: 40px;background-color: rgb(247, 247, 247);;">
          All Routes
          </b-card>
       </b-row>

       <b-row>          
        <b-card class="ml-3" style="width: 600px;height:500%;background-color: #fbf8f8;">
           <b-row>
              <b-col >  

                <div v-for="route in allRoutes">
                  <div v-for="routeInfo in route">
                 <img src='/static/icons8-subway-filled-50.png' height="25" width="25"/>
               {{routeInfo.departure_time.text}} - {{routeInfo.arrival_time.text}}
                <div class="float-right">
                 {{routeInfo.duration.text}}
                  </div>
                <br>
                <div class="pl-5">
                  <div v-for="pathInfo in routeInfo.steps">
                    <!-- <div v-if="pathInfo.travel_mode === 'WALKING'">
                        Walk - 
                      </div> -->
                     <div v-if="pathInfo.travel_mode === 'TRANSIT'">
                       <span>
                        {{pathInfo.transit_details.line.short_name}} TOWARDS {{pathInfo.transit_details.line.name}}
                       </span>
                     </div>
                </div>
                </div>

                <hr>
                </div>
                </div>

              </b-col>
            </b-row>
          </b-card>
       </b-row>
  </b-col>
         <!-- <b-card style="max-width: 35%;min-height: 20%;background-color: rgb(243, 165, 29);">
           <b-row>
              <b-col >
               <p> Safest Route </p>
              </b-col>
               <b-col >
               <p> Fastest Route </p>
              </b-col>
            </b-row>
          </b-card>

         <b-card class="mb-2" style="max-width: 35%;min-height: 170%">
           <b-row class="mb-2">
            </b-row>
          </b-card> -->

         <b-col :cols="6">
           <div>
            <GmapMap ref="mymap"
              :center="{lat:40.7618356, lng:-73.9821805}"
              :zoom="16"
              map-type-id="terrain"
              style="width: 118%; height: 350px"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
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
    this.fetch()
  },
  data () {
    return {
      sections: [
        {
          title: 'Routes',
          items: [
            {content: 'Home', url: '/home'},
            // {content: 'Recent Activity', url: '/recentactivity'}
          ]
        }
      ],
      stations: [],
      originAddress: '',
      destinationAddress: '',

      originLatitude: 0,
      originLongitude: 0,
      destinationLatitude: 0,
      destinationLongitude: 0,
      allRoutes: []
    }
  },
  methods: {
    fetch () {
      this.stations[0] =  {
        line: 'line',
        stop: 'stop',
        latitude: '',
        longitude: ''
      }
    },
    getCoordinatesByAddress(origin, destination) {
      var originParams = {
        address: origin,
        key: ''
      }
      var destinationParams = {
        address: destination,
        key: ''
      }
      api.getCoordinatesByAddress(originParams)
        .then(res => {
          this.originLongitude = res.data.results[0].geometry.location.lng
          this.originLatitude = res.data.results[0].geometry.location.lat
        }).then(res => {
          api.getCoordinatesByAddress(destinationParams)
        .then(res => {
          this.destinationLongitude = res.data.results[0].geometry.location.lng
          this.destinationLatitude = res.data.results[0].geometry.location.lat
        })
       }).then(res => {
         this.getRoutes()
       })
    },
    getRoutes() {
      this.allRoutes = []
      var params = {
        origin_latitude: this.originLatitude,
        origin_longitude: this.originLongitude,
        dest_latitude: this.destinationLatitude,
        dest_longitude: this.destinationLongitude,
        key: ''
      }
      api.getRoutes(params)
        .then(res => {
          console.log(res.data.data.routes)
          res.data.data.routes.forEach(element => {
            this.allRoutes.push(element.legs)
          })
          console.log(this.allRoutes)
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
