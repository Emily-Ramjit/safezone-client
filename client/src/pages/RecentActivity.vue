<template>
<div id=recentactivity>
      <b-row class="mb-2 ml-0">
      <div style="width:100%;">
        <div class="navbar navbar-default navbar-custom">
          <b-navbar-brand tag="h1" class="mb-0 ml-3">
            <strong> SafeZone </strong>
          </b-navbar-brand>
        </div>
      </div>
      <b-card class="mb-2" style="width:100%; height:200%;" title="Recent Activity" :sub-title="page.subTitle">
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
        </div>
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
      page: {
        subTitle: this.$route.params.station
      },
      selected: 'year',
        options: [
          { value: null, text: 'Please select a frequency' },
          { value: 'week', text: 'Weekly' },
          { value: 'month', text: 'Monthly' },
          { value: 'year', text: 'Yearly' },
          { value: '3 month', text: 'Last 3 Months'},
          { value: '6 month', text: 'Last 6 Months'},
          { value: '9 month', text: 'Last 9 Months'}
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
          this.items = res.data.results.map(crime => {
            return {
               Category: crime.category, 
               Description: crime.pd_desc, 
               Date: crime.date
            }
          })
        })
    },
    updateFrequency ($event) {
      this.selected = $event
      this.getCrimes()
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
.card-title {
  margin-left:7px;
  font-size:16px;
}
.card-subtitle {
  margin-bottom:10px;
  margin-left:7px;
}
</style>
