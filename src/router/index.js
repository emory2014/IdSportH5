import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Game from '@/components/digital-game/Game'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'User',
    //   component: User
    // },
    {
      path: '/',
      name: 'Game',
      component: Game
    },
  ]
})
