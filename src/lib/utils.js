import Vue from 'vue'
let Base64 = require('js-base64').Base64
import { parseMoney, parseMoneyD } from "../utils/money.js";
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
        if (process.env.NODE_ENV === 'production') {
          // var content = window.AndroidWebView.getAppToken();
          // var token = Base64.decode(content)
          // // window.AndroidWebView.showContent(token)
          // return token

          return "5288dda31450053568852f76773ee386"
        }else {
          return "5288dda31450053568852f76773ee386"
        }
      },
      // 金钱数量 没有小数点
      Vue.prototype.numFormat = function (str) {
        return parseMoney(str)
      },
      // 金钱数量 有小数点
      Vue.prototype.numFormatD = function (str) {
        return parseMoneyD(str)
      },

      Vue.prototype.moneyFormatD = function (str) {
          str = (parseFloat(str) / 100).toFixed(2);
          return parseMoneyD(str);
      }
  }

}
