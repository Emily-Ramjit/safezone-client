<template>
<div id=home>

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

      <b-card class="mb-2" style="width:85%; height:200%;">
        
        <b-col :cols="10">
           <div style="font-size: 25px; font-weight: 200;"> Statistics 
               <hr class="my-4" />
           </div>
           <div>
            <b-row class="mt-2 pb-3" style="width:100%;">
                <div class="col-sm-4">
                  <b-card style="height:100px; border-top: 3px solid purple;" >
                 <div class="infocard-header">
                  Total Crimes (YTD)
                  <div class="totalCrimes">
                  {{totalCrimes}}
                  </div>
                  </div>
                 </b-card>
                </div>
                <!-- <div class="col-sm-3">
                <b-card  style="height:100px;border-top: 3px solid red;" >
                  <div class="infocard-header">
                  Overall Risk
                 </div>
                 </b-card>
                </div>
                <div class="col-sm-3">
                  <b-card  style="height:100px; border-top: 3px solid purple;" >
                      <div class="infocard-header">
                  Top Crime Categories
                      </div>
                  </b-card>
                  </div> -->
                <div class="col-sm-4">
                  <b-card  style="height:100px; border-top: 3px solid red;" >
                  <div class="infocard-header">
                  Highest Crime Station
                  <div class="highestCrimeStation">
                  {{highestCrimeStation}} ( {{ maxCrimes }} )
                  </div>
                   </div>
                  </b-card>
                 </div>
              </b-row>
            </div>

          <div style="padding-bottom:10px; width:90%;">
            <b-form-input type="text" :value="inputAddress" v-model="inputAddress" :placeholder="'Type in an address...'" @keydown.enter.native="getCoordinatesByAddress(inputAddress)">
            </b-form-input>
            </div>
        </b-col>


       <b-row>
         <b-col :cols="8">
           <div class="ml-4">
            <GmapMap ref="mymap"
              :center="{lat:this.latitude, lng:this.longitude}"
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
           <b-col :cols="4">
             <div class="ml-4">
              <div style="padding-left: 160px; width: 88%;">
             <div style="padding-top:1px; padding-bottom:1px; font-size: 18px; font-weight: 200;" >
             <img src='/static/icons8-train-64.png' height="20" width="20"/>
              Stations Nearby 
             </div>

           <div v-if="stations.length > 0">
            <resource-list
            :items="stations">
           </resource-list>
           </div>

         <div v-else>
           <b-card>
           <div style="padding-top:1px;font-size: 14px; font-weight: 200;">
               <center><b> No Stations Found! </b> </center>
          </div>
          <div style="padding-top:1px;font-size: 12px; font-weight: 200;">
               <center> Please type in a valid address. </center>
             </div>
           </b-card>
        </div>

           </div>
           </div>
          </b-col>
          
          </b-row>
          <div class="pt-2 pl-3">
           <b-card class="mb-2" style="width:78%; height:200%;" title="Frequency of Crimes">
             <b-col :cols="24">  
              <div style="padding-bottom:10px; width:100%;">
                <div>
                  <div v-if="crimeTypes.length > 0">
                    <b-table striped hover :items="crimeTypes" :fields="fields"/>
                      </div>
                      <div v-else>
                        <div style="padding-top:1px;font-size: 14px; font-weight: 200;">
                              <center><b> No Crimes Found! </b> </center>
                        </div>
                          <div style="padding-top:1px;font-size: 12px; font-weight: 200;">
                              <center> Please type in an address to view crimes. </center>
                          </div>
                      </div>
                  </div>
                </div>
             </b-col>
          </b-card>
          </div>
         </b-card>
        </b-row>
</div>
</template>

<script>
/* eslint-disable */
import api from '@/api/api'

export default {
  mounted () {
    this.$router.push({address: ''})
    this.fetch()
  },
  data () {
    return {
      stations: [],
      safestRoute: false,
      longitude: -73.9639,
      latitude: 40.7679,
      filter: [],
      inputAddress: '695 Park Ave, New York, NY 10065',
      highestCrimeStation: '',
      maxCrimes: 0,
      crimeTypes: [],
      totalCrimes: 0,
      fields: {
        Station: {
          key: 'Station',
          label: 'Station',
          sortable: true
        },
        Burglary: {
          key: 'Burglary',
          label: 'Burglary',
          sortable: true
        },
        Felony_Assault: {
          key: 'Felony Assault',
          label: 'Felony Assault',
          sortable: true
        },
        Grand_Larceny: {
          key: 'Grand Larceny',
          label: 'Grand Larceny',
          sortable: true
        },
         Kidnapping: {
          key: 'Kidnapping',
          label: 'Kidnapping',
          sortable: true
        },
        Misdemeanor_Assault: {
          key: 'Misdemeanor Assault',
          label: 'Misdemeanor Assault',
          sortable: true
        },
        Misdemeanor_Sex_Crimes: {
          key: 'Misdemeanor Sex Crimes',
          label: 'Misdemeanor Sex Crimes',
          sortable: true
        },
        Murder: {
          key: 'Murder',
          label: 'Murder',
          sortable: true
        },
         Offenses_against_Public_Order: {
          key: 'Offenses against Public Order',
          label: 'Offenses against Public Order',
          sortable: true
        },
        Petit_Larceny: {
          key: 'Petit Larceny',
          label: 'Petit Larceny',
          sortable: true
        },
        Rape: {
          key: 'Rape',
          label: 'Rape',
          sortable: true
        },
        Robbery: {
          key: 'Robbery',
          label: 'Robbery',
          sortable: true
        },
        Shootings: {
          key: 'Shootings',
          label: 'Shootings',
          sortable: true
        }
      },
    }
  },
  methods: {
    fetch () {
      this.inputAddress = this.$route.params.address
      if (this.inputAddress !== null || this.inputAddress !== undefined) {
        this.getCoordinatesByAddress(this.inputAddress)
      } else {
        this.getCoordinatesByAddress('695 Park Ave, New York, NY 10065')
      }
    },
    getStations () {
      var params = {
        latitude: this.latitude,
        longitude: this.longitude,
        API_KEY: ''
      }
      api.getNearbyStations(params)
        .then(res => {  
          console.log(res.data)
          this.stations = res.data.map(station => {
            var lines = ''
            for(var i = 0; i < station.lines.length; i++){
              lines = lines + station.lines[i] + "," 
            }
            station.lines = lines
            return {
               line: station.lines,
               stop: station.name, 
               longitude: station.longitude,
               latitude: station.latitude
            }
          })
        }).then(res => {
          this.getCrimes()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCoordinatesByAddress (addr) {
      var params = {
        address: addr,
        key: ''
      }
      api.getCoordinatesByAddress(params)
        .then(res => {
          console.log(res)
          this.longitude = res.data.results[0].geometry.location.lng
          this.latitude = res.data.results[0].geometry.location.lat
          console.log(this.longitude, this.latitude)
        }).then(res => {
          this.getStations()
        })
    },
    getCrimes() {
      this.totalCrimes = 0
      this.maxCrimes = 0
      this.crimeTypes = []
      this.stations.forEach(station => {
        var params = {
          latitude: station.latitude,
          longitude: station.longitude,
          API_KEY: '',
          timeSpan: 'year'
        }
        api.getNearbyCrimes(params)
          .then(res => {
            console.log(res.data.results)
            this.totalCrimes = this.totalCrimes + res.data.results.length;
            if(res.data.results.length > this.maxCrimes) {
              this.maxCrimes = res.data.results.length
              this.highestCrimeStation = station.line + station.stop
            }
            var field = {
              Station: station.line + station.stop
            }
            var result = res.data.frequencies
            var array = []
            array.push(result)
            
            var newArray = this.appendObjTo(array, field);
            newArray[0].Station = newArray[1].Station
            this.crimeTypes.push(newArray[0])
            console.log(this.crimeTypes)
          })
      })
    },
  appendObjTo(thatArray, newObj) {
    var frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
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
  font-weight: 200;
  font-size: 20px;
}

.infocard-header {
  font-size: 16px;
  padding-left: 15px;
  font-weight: 200;
}

.totalCrimes {
  font-size:35px;
  padding-top:14px;
  color:purple;
  position:absolute;
}
.highestCrimeStation {
  font-size:20px;
  padding-top:14px;
  position:absolute;
  color:red;
}
</style>
