<template>
<page fullWidth>
  <layout>
      <layout-section>

      <row>
      <div style="width:1270px;">
        <b-navbar type="light" variant="light">
          <b-navbar-brand tag="h1" class="mb-0">
          <img src="../assets/trainstop2.png" class="d-inline-block align-top" alt="BV" width="60" height="40" >
            <strong> SafeZone </strong>  |
          </b-navbar-brand>
        </b-navbar>
      </div>
      </row>

      <row>
      <div v-if="!safestRoute">
      <b-card class="mb-2" >
        <b-row class="mb-2">
          <b-col >
            <label for="inputLive">Address</label>
            <b-form-input type="text" :value="'695 Park Ave, New York, NY 10065'" >
            </b-form-input>
          </b-col>
        </b-row>
        </b-card>
      </div>
      </row>

      <row>
      <div>
      <b-card class="mb-2" >
        <b-tabs>
          <b-tab title="Statistics" active>
        <b-row class="mb-2">
          <b-col :cols="9">
            <!-- <label for="inputLive">Address</label>
            <b-form-input type="text" :value="'test'" >
            </b-form-input> -->
            <GmapMap
              :center="{lat:40.7679, lng:-73.9639}"
              :zoom="16"
              map-type-id="terrain"
              style="width: 900px; height: 500px"
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

          </b-col>
           <b-col :cols="3">
             <div style="padding-top:5px;">
             <h5> Stations Nearby </h5>
             </div>
            <resource-list
            :items="trains">
           </resource-list>
          </b-col>
        </b-row>
          </b-tab>
          <b-tab title="Recent Activity">
          </b-tab>
          <b-tab title="Routes" @click="safestRoute =! safestRoute">
          <b-card class="mb-2" >
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
            </b-card>
          </b-tab>
        </b-tabs>
        </b-card>
      </div>
      </row>
    </layout-section>
  </layout>
</page>
</template>

<script>
import api from '@/api/api'
import {format} from 'date-fns'

export default {
  mounted () {
    this.fetch()
  },
  data () {
    return {
      trains: [
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
      safestRoute: false
    }
  },
  methods: {
    fetch () {

    }
  }
}
</script>
