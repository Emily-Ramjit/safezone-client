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
      <b-card class="mb-2" style="width:100%; height:200%; background-color:#f9f9f9;">
         <b-col :cols="10">
            <div style="font-size: 18px; font-weight: 200;">
               <b-tabs content-class="mt-3">
                  <b-tab active title="Statistics"></b-tab>
                  <b-tab @click="routeTo" title="Routes"></b-tab>
               </b-tabs>
            </div>
            <div>
               <b-row class="mt-2 pb-3" style="width:100%;">
                  <div class="col-sm-4">
                     <b-card  style="height:120px; border-top: 3px solid #ea974d" >
                        <div class="infocard-header">
                           SAFEST STATION
                           <hr>
                           <div class="highestCrimeStation">
                              <div v-if="stations.length > 0">
                                 <span  v-html="stations[0].icon">
                                 </span> 
                                 {{stations[0].stop}}
                                 <p> Percentile: {{ stations[0].percentile }} % </p>
                              </div>
                              <div v-else>
                                 n/a
                              </div>
                           </div>
                        </div>
                     </b-card>
                  </div>
                  <div class="col-sm-4">
                     <b-card style="height:120px; border-top: 3px solid #ea974d" >
                        <div class="infocard-header">
                           TOTAL CRIMES (YTD)
                           <hr>
                           <div class="totalCrimes">
                              {{totalCrimes}}
                           </div>
                        </div>
                     </b-card>
                  </div>
                  <div class="col-sm-4">
                     <b-card  style="height:120px; border-top: 3px solid #ea974d" >
                        <div class="infocard-header">
                           HIGHEST CRIME STATION
                           <hr>
                           <div class="highestCrimeStation">
                              <div v-html="highestCrimeStation"/>
                                 <p> Total Crimes: {{ maxCrimes }} </p>
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
                style="width: 118%; height: 500px"
                >
            <GmapMarker
                :key="index"
                :position="{lat:this.latitude, lng:this.longitude}"
                :clickable="true"
                :draggable="true"
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
          <b-card class="mb-2" style="width:96%; height:200%;" title="Frequency of Crimes">
          <b-col :cols="24">  
            <div style="padding-bottom:10px; width:100%;">
              <div>
                <div v-if="crimeTypes.length > 0">
                  <b-table striped hover :items="crimeTypes" :fields="fields">
                  <span slot="Station" slot-scope="data" v-html="data.value"></span>
                  </b-table>
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
            var icons = ''
            for(var i = 0; i < station.lines.length; i++) {
              icons = icons + this.setIcons(station.lines[i])
              lines = lines + station.lines[i] + "," 
            }
            station.lines = lines
            station.icons = icons
            return {
               line: station.lines,
               icon: station.icons,
               stop: station.name, 
               longitude: station.longitude,
               latitude: station.latitude,
               percentile: station.percentile
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
              this.highestCrimeStation = station.icon + ' ' + station.stop
            }
            var field = {
              Station: station.icon + station.stop
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
   },
   routeTo() {
     this.$router.push({name: 'routes'})
   },
   setIcons(line) {
     switch(line) { 
        case "1": { 
            return "<img src='/static/NYCS-bull-trans-1.svg' height='20' width='20'/>"
            break; 
        } 
        case "2": { 
            return "<img src='/static/NYCS-bull-trans-2.svg' height='20' width='20'/>"
            break; 
        } 
        case "3": {
            return "<img src='/static/NYCS-bull-trans-3.svg' height='20' width='20'/>"
            break;    
        } 
        case "4": { 
            return "<img src='/static/NYCS-bull-trans-4.svg' height='20' width='20'/>"
            break; 
        }
        case "5": { 
            return  "<img src='/static/NYCS-bull-trans-5.svg' height='20' width='20'/>"
            break; 
        }          
        case "6": { 
            return "<img src='/static/NYCS-bull-trans-6.svg' height='20' width='20'/>"
            break; 
        }    
        case "7": { 
            return "<img src='/static/NYCS-bull-trans-7.svg' height='20' width='20'/>"
            break; 
        } 
        case "A": {
            return "<img src='/static/NYCS-bull-trans-A.svg' height='20' width='20'/>"
            break;    
        } 
        case "B": { 
            return "<img src='/static/NYCS-bull-trans-B.svg' height='20' width='20'/>"
            break; 
        }
        case "C": { 
            return  "<img src='/static/NYCS-bull-trans-C.svg' height='20' width='20'/>" 
            break; 
        }          
        case "D": { 
           return "<img src='/static/NYCS-bull-trans-D.svg' height='20' width='20'/>"
            break; 
        }  
        case "E": { 
            return  "<img src='/static/NYCS-bull-trans-E.svg' height='20' width='20'/>"
            break; 
        } 
        case "F": { 
            return "<img src='/static/NYCS-bull-trans-F.svg' height='20' width='20'/>"
            break; 
        } 
        case "G": {
            return "<img src='/static/NYCS-bull-trans-G.svg' height='20' width='20'/>"
            break;    
        } 
        case "J": { 
            return "<img src='/static/NYCS-bull-trans-J.svg' height='20' width='20'/>"
            break; 
        }
        case "L": { 
            return "<img src='/static/NYCS-bull-trans-L.svg' height='20' width='20'/>"
            break; 
        }          
        case "M": { 
            return "<img src='/static/NYCS-bull-trans-M.svg' height='20' width='20'/>"
            break; 
        }   
        case "N": { 
            return "<img src='/static/NYCS-bull-trans-N.svg' height='20' width='20'/>"
            break; 
        }
        case "Q": { 
            return "<img src='/static/NYCS-bull-trans-Q.svg' height='20' width='20'/>"
            break; 
        }          
        case "R": { 
            return "<img src='/static/NYCS-bull-trans-R.svg' height='20' width='20'/>"
            break; 
        }  
        case "S": { 
            return "<img src='/static/NYCS-bull-trans-S.svg' height='20' width='20'/>"
            break; 
        }  
        case "W": { 
            return "<img src='/static/NYCS-bull-trans-W.svg' height='20' width='20'/>"
            break; 
        }
        case "Z": { 
            return "<img src='/static/NYCS-bull-trans-Z.svg' height='20' width='20'/>"
            break; 
        }
      }
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
  font-weight: 500;
}

.totalCrimes {
  color:black;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 1px;
}
.highestCrimeStation {
  color:black;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 1px;
}
</style>
