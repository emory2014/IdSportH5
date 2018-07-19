// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import App from './App'
import router from './router'
import utils from './lib/utils.js'

Vue.prototype.$utils = utils

Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.Cancel = [];
router.beforeEach((to, from, next) => {
    while (Vue.Cancel.length > 0) {
        Vue.Cancel.shift()('cancel');
    }
    next();
})

 /* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   template: '<App />',
  components: { App }
 })

