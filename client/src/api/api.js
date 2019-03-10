import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

export default {

  getNearbyStations (params) {
    return axios.get(`/nearby_stations`, { params: params })
  },

  getNearbyCrimes (params) {
    return axios.get(`/nearby_crimes`, { params: params })
  }

  // getCoordinates(address){
  //   return googleSVC.get(`/geocode/json,` { address: address } )
  // }

}
