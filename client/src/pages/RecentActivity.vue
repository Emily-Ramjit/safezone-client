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
      <sz-sidebar :sections="sections"> </sz-sidebar>

      <b-card class="mb-2" style="min-width:1070px;" title="Recent Activity" :sub-title="page.subTitle">
        <b-col :cols="24">
           <div class= "float-right pb-2">
           <b-form-select @change="updateFrequency($event)" v-model="selected" :options="options" />
        </div>
          <div style="padding-bottom:10px; width:100%;">
            <div>
                <b-table striped hover :items="items" :fields="fields" />
              </div>
            </div>
        </b-col>
         </b-card>
        </b-row>
    </layout-section>
  </layout>
</page>
</template>

<script>
/* eslint-disable */
import api from '@/api/api'

export default {
  mounted () {
    console.log(this.$route.params.station )
    this.page.subTitle = this.$route.params.station 
    this.fetch()
  },
  data () {
    return {
      fields: {
        Category: {
          key: 'Category',
          label: 'Category',
          sortable: true
        },
        Description: {
          key: 'Description',
          label: 'Description',
          sortable: true
        },
        Date: {
          key: 'Date',
          label: 'Incident Date',
          sortable: true
        }
      },
      items: [
        { Category: 'Rape', Number_of_Occurences: 3, Date: '3/20/2019' },
        { Category: 'Assault', Number_of_Occurences: 5, Date: '3/20/2019' },
        { Category: 'Murder', Number_of_Occurences: 1, Date: '3/20/2019' },
        { Category: 'Robbery', Number_of_Occurences: 3, Date: '3/20/2019' }
      ],
      sections: [
        {
          title: 'Recent Activity',
          items: [
            {content: 'Home', url: '/home'},
            {content: 'Routes', url: '/routes'}
          ]
        }
      ],
      page: {
        subTitle: this.$route.params.station
      },
      selected: 'year',
        options: [
          { value: null, text: 'Please select a frequency' },
          { value: 'week', text: 'Weekly' },
          { value: 'month', text: 'Monthly' },
          { value: 'year', text: 'Yearly' }
        ]
    }
  },
  methods: {
    fetch () {
      this.getCrimes()
    },
    getCrimes () {
      var params = {
        latitude: this.$route.params.latitude,
        longitude: this.$route.params.longitude,
        API_KEY: '',
        timeSpan: this.selected
      }
      console.log(params)
      api.getNearbyCrimes(params)
        .then(res => {
          console.log(res.data)
          this.items = res.data.map(crime => {
            return {
               Category: crime.category, 
               Description: crime.crime_desc, 
               Date: crime.date
            }
          })
        })
    },
    updateFrequency ($event) {
      console.log($event)
      this.selected = $event
      this.getCrimes()
    }
  }
}
</script>

<style>
.navbar-custom {
    color: #FFFFFF;
    background-color: #e4a51e;
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
