import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

export default {

  getNearbyStations (params) {
    return axios.get(`/nearby_stations`, { params: params })
  },
  getNearbyCrimes (params) {
    return axios.get(`/nearby_crimes`, { params: params })
  },
  getCoordinatesByAddress (params) {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: params })
  }

}
