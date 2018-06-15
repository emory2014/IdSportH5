import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Game from '@/components/digital-game/Game'
import Start from '@/components/digital-game/Start'
import AwardRecord from '@/components/digital-game/AwardRecord'
import Rank from '@/components/digital-game/Rank'
import AwardDetail from '@/components/digital-game/AwardDetail'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/web/',
  routes: [
    // {
    //   path: '/',
    //   name: 'User',
    //   component: User
    // },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/award-record',
      name: 'AwardRecord',
      component: AwardRecord
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/detail',
      name: 'AwardDetail',
      component: AwardDetail
    },
  ]
})
