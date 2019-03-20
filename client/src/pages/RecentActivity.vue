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

      <b-card class="mb-2" style="min-width:1070px;" title="Recent Activity" sub-title="6 Line - 68th Street Hunter College">
        <b-col :cols="24">
          <div style="padding-bottom:10px; width:900px;">
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

export default {
  data () {
    return {
      fields: {
        Category: {
          key: 'Category',
          label: 'Category',
          sortable: true
        },
        Number_of_Occurences: {
          key: 'Number_of_Occurences',
          label: 'Number of Occurences',
          sortable: true
        },
        Last_Incident_Date: {
          key: 'Last_Incident_Date',
          label: 'Last Incident Date',
          sortable: true
        }
      },
      items: [
        { Category: 'Rape', Number_of_Occurences: 3, Last_Incident_Date: '3/20/2019' },
        { Category: 'Assault', Number_of_Occurences: 5, Last_Incident_Date: '3/20/2019' },
        { Category: 'Murder', Number_of_Occurences: 1, Last_Incident_Date: '3/20/2019' },
        { Category: 'Robbery', Number_of_Occurences: 3, Last_Incident_Date: '3/20/2019' }
      ],
      sections: [
        {
          title: 'Recent Activity',
          items: [
            {content: 'Home', url: '/home'},
            {content: 'Routes', url: '/routes'}
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
.card-title {
  margin-left:7px;
  font-size:16px;
}
.card-subtitle {
  margin-bottom:10px;
  margin-left:7px;
}
</style>
