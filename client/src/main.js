import Vue from 'vue'
import Router from './router'
import Store from './store'
import Vuex from 'vuex'
// import App from './App'
// Third party
import BootstrapVue from 'bootstrap-vue'

import PortalVue from 'portal-vue'
import * as fns from 'date-fns'
import * as _ from 'lodash'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PolarisVue from '@eastsideco/polaris-vue'
import '@eastsideco/polaris-vue/lib/polaris-vue.css'

// Proprietary Components Import
import Avatar from 'vue-avatar'
import SZButton from './components/SZButton'
import Layout from './components/Layout'
import LayoutSection from './components/LayoutSection'
import ResourceList from './components/ResourceList.vue'
import ResourceListItem from './components/ResourceListItem.vue'
import Sidebar from './components/Sidebar.vue'
import Searchbar from './components/Searchbar.vue'
import MenuItem from './components/MenuItem.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.component('avatar', Avatar)
Vue.component('sz-button', SZButton)
Vue.component('layout-section', LayoutSection)
Vue.component('layout', Layout)
Vue.component('resource-list', ResourceList)
Vue.component('resource-list-item', ResourceListItem)
Vue.component('sz-sidebar', Sidebar)
Vue.component('sz-searchbar', Searchbar)
Vue.component('sz-menu-item', MenuItem)

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(PortalVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBxh9rcz8ITn8kGErhOCFPO5JXgBKBZpGM',
    libraries: 'places'
  }
})
// google places key -- AIzaSyD5LlWvE-1JFXMOsw0kyLutXObCfJk5ndc

Vue.use(PolarisVue)

// Doing this to make it read only
Object.defineProperty(Vue.prototype, 'fns', { value: fns })
Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.config.productionTip = false
function getUrlSubdomain (url) {
  let url1 = url.replace(/(^\w+:|^)\/\//, '')
  return url1.split('.')[0]
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  template: `
    <router-view></router-view>
  `,
  data: { domain: getUrlSubdomain(window.location.origin) }
})
