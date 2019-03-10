<template>
<page fullWidth>
  <layout>
      <layout-section>
      <b-row class="mb-2 ml-3">
      <div style="width:1290px;">
        <div class="navbar navbar-default navbar-custom">
          <b-navbar-brand tag="h1" class="mb-0 ml-3">
            <strong> SafeZone </strong>
          </b-navbar-brand>
        </div>
      </div>
      <sz-sidebar> </sz-sidebar>

      <b-card class="mb-2" style="min-width:1070px;">
        <b-col :cols="8">
          <div style="padding-bottom:10px;">
            <label for="inputLive">Address</label>
            <b-form-input type="text" :value="'695 Park Ave, New York, NY 10065'" >
            </b-form-input>
            <i class="fa fa-search"></i>
            </div>
        </b-col>

       <b-row>
         <b-col :cols="8">
           <div class="ml-4">
            <!-- <label for="inputLive">Address</label>
            <b-form-input type="text" :value="'test'" >
            </b-form-input> -->
            <GmapMap
              :center="{lat:40.7679, lng:-73.9639}"
              :zoom="16"
              map-type-id="terrain"
              style="width: 750px; height: 400px"
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
           <b-col :cols="3">
             <div class="ml-4">
              <div style="padding-left:40px;">
             <div style="padding-top:5px;">
             <h5> Stations Nearby </h5>
             </div>
            <resource-list
            :items="stations">
           </resource-list>
           </div>
           </div>
          </b-col>
                 </b-row>
         </b-card>
        </b-row>
    </layout-section>
  </layout>
</page>
</template>

<script>
import api from '@/api/api'

export default {
  mounted () {
    this.fetch()
  },
  data () {
    return {
      stations: [
        {
          line: 'F Line',
          stop: 'Lexington Ave. 63',
          risk: 'Low',
          crimeRate: '< 10%'
        },
        {
          line: '6 Line',
          stop: 'Hunter College - 68th Ave',
          risk: 'Low',
          crimeRate: '< 10%'
        },
        {
          line: 'R Line',
          stop: 'Lexington Ave - 59',
          risk: 'Low',
          crimeRate: '< 10%'
        }
      ],
      safestRoute: false,
      longitude: '',
      latitude: '',
      filter: []
    }
  },
  methods: {
    fetch () {
      this.getStations()
    },
    getStations () {
      var params = {
        latitude: this.latitude,
        longitude: this.longitude,
        filter: []
      }
      api.getNearbyStations(params)
        .then(res => {
          this.stations = res.data.map(station => {
            return {
              // line: //station.line 'R Line',
              // stop: //station.stop 'Lexington Ave - 59',
              // risk: //station.risk 'Low',
              // crimeRate: //station.crimerate '< 10%'
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
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
