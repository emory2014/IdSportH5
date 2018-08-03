import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Invite from '@/components/invite/Invite'
import InviteRecord from '@/components/invite/InviteRecord'
import Game from '@/components/digital-game/Game'
import Start from '@/components/digital-game/Start'
import AwardRecord from '@/components/digital-game/AwardRecord'
import Rank from '@/components/digital-game/Rank'
import AwardDetail from '@/components/digital-game/AwardDetail'

import Recharge from '@/components/recharge/Recharge'
import Process from '@/components/recharge/Process'
import Record from '@/components/recharge/Record'
import NewsDetail from '@/components/news/NewsDetail'
import News from '@/components/news/News'



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
      path: '/recharge',
      name: 'Recharge',
      component: Recharge
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/process',
      name: 'Process',
      component: Process
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/comment',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/invite',
      name: 'Invite',
      component: Invite
    },
    {
      path: '/invite-record',
      name: 'InviteRecord',
      component: InviteRecord
    },
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
