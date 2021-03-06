// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import App from './App'
import router from './router'
import store from "./store";
import utils from './lib/utils.js'
import 'lib-flexible/flexible'
// Vue.prototype.$utils = utils


const api = location.hostname == 'idsporth5.jiajiahebao.com' ? 'http://idsport.jiajiahebao.com' : 'http://api.ayolariapp.com'
const host = process.env.NODE_ENV == "production" ? api : ""
// const host = process.env.NODE_ENV == "production" ? "http://api.ayolariapp.com" : ""

const instance = axios.create({
  baseURL: host
})

Vue.prototype.$http = instance;

Vue.config.productionTip = false

Vue.use(utils)

Vue.Cancel = [];
router.beforeEach((to, from, next) => {
    while (Vue.Cancel.length > 0) {
        Vue.Cancel.shift()('cancel');
    }
    next();
})
//千分位过滤器
Vue.filter('thousands',function(num) {
    num = Math.round(num)
    var str = num+'';
    return str.split("").reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev;
    })
})
 /* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
    store,
   template: '<App />',
  components: { App }
 })
