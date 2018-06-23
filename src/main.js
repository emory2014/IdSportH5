// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios';
import App from './App'
import router from './router'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App />',
//   components: { App }
// })


    new Vue({
     created: function() {
      window.setPhotoData =this.setPhotoData;
     },
     methods:{
      setPhotoData:function(dataStr){
     window.AndroidWebView.showContent("头像Base64数据:");
      }
     }
   });
  