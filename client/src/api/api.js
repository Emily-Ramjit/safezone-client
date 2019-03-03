import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api'

export default {

  getRecentCrimeData (address) {
    return axios.get(`/crime/${address}/images`)
  }

}
