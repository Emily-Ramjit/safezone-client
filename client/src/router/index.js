import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Landing from '../pages/Landing'
import Statistics from '../pages/Statistics'
import RecentActivity from '../pages/RecentActivity'
import Routes from '../pages/Routes'

Vue.use(Router)
function getUrlSubdomain (url) {
  let url1 = url.replace(/(^\w+:|^)\/\//, '')
  return url1.split('.')[0]
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/home/',
      name: 'home',
      component: Home
    },
    {
      path: '/home/:address',
      name: 'home',
      component: Home
    },
    {
      path: '/landing',
      name: 'landing',
      component: Landing,
      props: { domain: getUrlSubdomain(window.location.origin) }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/recentactivity/:station/:latitude/:longitude',
      name: 'recentactivity',
      component: RecentActivity
    },
    {
      path: '/recentactivity/',
      name: 'recentactivity',
      component: RecentActivity
    },
    {
      path: '/routes',
      name: 'routes',
      component: Routes
    }
  ]
})
