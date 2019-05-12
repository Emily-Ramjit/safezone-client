<template>
<div id=main>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#"> SafeZone </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="home">Home</b-nav-item>
        <!-- <b-nav-item href="recentactivity">Recent Activity</b-nav-item> -->
        <!-- <b-nav-item href="routes">Routes</b-nav-item> -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

<div id="jumbo">
  <b-jumbotron text-variant="black" border-variant="dark" id="jumbotron">
      <template slot="header" id=header>SafeZone</template>
      <template slot="lead">Getting you home on your own</template>
  </b-jumbotron>
</div>

    <!-- <input ref="autocomplete"
        placeholder="Search by address..."
        class="search-location"
        onfocus="value = ''"
        v-model="searchValue"
        @keydown.enter.native="handleClick(searchValue)"
        type="text" /> -->

        <b-form-input class="search-location" ref="autocomplete" type="text" v-model="searchValue"  
        :placeholder="'Search by address...'" @keydown.enter.native="handleClick(searchValue)" >
        </b-form-input>


</div>
</template>

<style>
#main {
  height: 100%;
  background-image: url(https://images.unsplash.com/photo-1484689228555-fd6bc1b28b7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  position: center;
}

#buttonGo {
  display: inline-block;
}

.jumbotron {
  margin: auto;
  background: rgba(204, 204, 204, 0.4);
  max-height: 150px;
  margin-top: 150px;
  text-align: center;
  width: 75%;
}

#app {
  text-align: center;
}

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

.search-location {
  display: inline-block;
  width: 60vw;
  margin: 0 auto;
  margin-top: 5vw;
  font-size: 20px;
  font-weight: 400;
  outline: none;
  height: 35px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
.form-control {
    display: block;
    width: 60% !important;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmvziUzhoWOK_EVHOc4wPS3eVhK4V7qTw&libraries=places&callback=initAutocomplete" async defer></script>

<script>
export default {
  mounted () {
    this.autocomplete = new google.maps.places.Autocomplete(
      (this.$refs.autocomplete),
      {types: ['geocode']}
    )
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    handleClick(search) {
      console.log(search)
      this.$router.push({name: 'home', params: { address: search}});
    }
  }
}
</script>
