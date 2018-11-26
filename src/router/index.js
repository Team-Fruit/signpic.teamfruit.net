import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound
    }
  ]
})
