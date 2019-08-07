import Vue from 'vue'
let Base64 = require('js-base64').Base64

export default {
  install: function() {
    Vue.prototype.parseMoney = function(str) {
        str = str.toString()
        let i = str.length
        if (i <= 3) {
          return str;
        } else if (i > 3 && i <= 6) {
          return str.substring(0, i - 3) + "," + str.substring(i - 3)
        } else if (i > 6 && i <= 9) {
          return str.substring(0, i - 6) + "," + str.substring(i - 6, i - 3) + "," + str.substring(i - 3)  
        } else {
          return str
        }
      },
      Vue.prototype.getAppToken = function() {
        // var content = window.AndroidWebView.getAppToken();
        // var token = Base64.decode(content)
        // return token
        return 'eeaa4f1e5c3ed0d5b08626f001d9af1f'
      }
  }

}