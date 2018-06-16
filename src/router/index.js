import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/web/',
  routes: [
    {
      path: '/',
      name: 'User',
      component: User
    },

  ]
})
