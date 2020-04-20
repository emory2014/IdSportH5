import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rechargeInfo: null
  },
  mutations: {
    changeRechargeInfo (state, val){
       state.rechargeInfo = val
    }
  },
  actions: {
    changeRechargeInfo (context,user){
      context.commit('changeRechargeInfo',user)
    }
  },
  modules: {}
});
