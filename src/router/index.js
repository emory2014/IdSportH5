import Vue from 'vue'
import Router from 'vue-router'

// import User from '@/components/User'
//
// import Activity from '@/components/Activity'
//
// import Questions from '@/components/questions/Questions'
// import HowInvite from '@/components/questions/HowInvite'
// import HowPlay from '@/components/questions/HowPlay'
//
//
// import Invite from '@/components/invite/Invite'
// import InviteRecord from '@/components/invite/InviteRecord'
//
// import Game from '@/components/digital-game/Game'
// import Start from '@/components/digital-game/Start'
// import AwardRecord from '@/components/digital-game/AwardRecord'
// import Rank from '@/components/digital-game/Rank'
// import AwardDetail from '@/components/digital-game/AwardDetail'
//
// import Recharge from '@/components/recharge/Recharge'
// import Process from '@/components/recharge/Process'
// import Record from '@/components/recharge/Record'
//
// import NewsDetail from '@/components/news/NewsDetail'
// import News from '@/components/news/News'
//
// import VipCenter from '@/components/vip/VipCenter'
// import VipRechargeRecord from '@/components/vip/VipRechargeRecord'
// import WthdrawDeposit from '@/components/vip/WthdrawDeposit'
// import WDRecord from '@/components/vip/WDRecord'
// import VipRank from '@/components/vip/VipRank'
// import VipInviteRecord from '@/components/vip/VipInviteRecord'
//
//
// import Task from '@/components/task/Task'
// import Rule from '@/components/task/Rule'
// import SignRule from '@/components/task/SignRule'
//
// import MyFollow from '@/components/post/MyFollow'


Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
  base: '/web/',
  routes: [
    // {
    //   path: '/',
    //   name: 'User',
    //   component: User
    // },
    {
      path: '/my-follow',
      name: 'MyFollow',
      component: resolve => require(['@/components/post/MyFollow'], resolve)
    },
    {
      path: '/task',
      name: 'Task',
      meta: {
        keepAlive: true
      },
      component: resolve => require(['@/components/task/Task'], resolve)
    },
    {
      path: '/sign-rule',
      name: 'SignRule',
      component: resolve => require(['@/components/task/SignRule'], resolve)
    },
    {
      path: '/task-rule',
      name: 'Rule',
      component: resolve => require(['@/components/task/Rule'], resolve)
    },
    {
      path: '/task-record',
      name: 'TaskRecord',
      component: resolve => require(['@/components/task/TaskRecord'], resolve)
    },
    {
      path: '/ad',
      name: 'AD',
      component: resolve => require(['@/components/task/AD'], resolve)
    },
    {
      path: '/vip-rank',
      name: 'VipRank',
      component: resolve => require(['@/components/vip/VipRank'], resolve)
    },
    {
      path: '/vip-center',
      name: 'VipCenter',
      component: resolve => require(['@/components/vip/VipCenter'], resolve)
    },
    {
      path: '/wthdraw-deposit',
      name: 'WthdrawDeposit',
      component: resolve => require(['@/components/vip/WthdrawDeposit'], resolve)
    },
    {
      path: '/wd-record',
      name: 'WDRecord',
      component: resolve => require(['@/components/vip/WDRecord'], resolve)
    },
    {
      path: '/vip-invite-record',
      name: 'VipInviteRecord',
      component: resolve => require(['@/components/vip/VipInviteRecord'], resolve)
    },
    {
      path: '/vip-recharge-record',
      name: 'VipRechargeRecord',
      component: resolve => require(['@/components/vip/VipRechargeRecord'], resolve)
    },
    {
      path: '/activity',
      name: 'Activity',
      component: resolve => require(['@/components/Activity'], resolve)
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: resolve => require(['@/components/recharge/Recharge'], resolve)
    },
    {
      path: '/record',
      name: 'Record',
      component: resolve => require(['@/components/recharge/Record'], resolve)
    },
    {
      path: '/process',
      name: 'Process',
      component: resolve => require(['@/components/recharge/Process'], resolve)
    },
    {
      path: '/news',
      name: 'News',
      component: resolve => require(['@/components/news/News'], resolve)
    },
    {
      path: '/comment',
      name: 'NewsDetail',
      component: resolve => require(['@/components/news/NewsDetail'], resolve)
    },
    {
      path: '/user',
      name: 'User',
      component: resolve => require(['@/components/User'], resolve)
    },
    {
      path: '/invite',
      name: 'Invite',
      component: resolve => require(['@/components/invite/Invite'], resolve)
    },
    {
      path: '/invite-record',
      name: 'InviteRecord',
      component: resolve => require(['@/components/invite/InviteRecord'], resolve)
    },
    {
      path: '/game',
      name: 'Game',
      component: resolve => require(['@/components/digital-game/Game'], resolve)
    },
    {
      path: '/start',
      name: 'Start',
      component: resolve => require(['@/components/digital-game/Start'], resolve)
    },
    {
      path: '/award-record',
      name: 'AwardRecord',
      component: resolve => require(['@/components/digital-game/AwardRecord'], resolve)
    },
    {
      path: '/rank',
      name: 'Rank',
      component: resolve => require(['@/components/digital-game/Rank'], resolve)
    },
    {
      path: '/detail',
      name: 'AwardDetail',
      component: resolve => require(['@/components/digital-game/AwardDetail'], resolve)
    },
    {
      path: '/question',
      name: 'Questions',
      component: resolve => require(['@/components/questions/Questions'], resolve)
    },
    {
      path: '/how-invite',
      name: 'HowInvite',
      component: resolve => require(['@/components/questions/HowInvite'], resolve)
    },
    {
      path: '/how-play',
      name: 'HowPlay',
      component: resolve => require(['@/components/questions/HowPlay'], resolve)
    },
  ]
})