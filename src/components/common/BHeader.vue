<template>
<header class="header">
  　<i class="nc-icon-prev" @click="goBack()"></i>
  <div>{{title}}</div>
  <router-link to="/record" v-if="recharge">
    <span class="recharge-record">Riwayat Transaksi</span>
  </router-link>
  <!-- <router-link to="/vip-recharge-record" v-if="vipRechargeRecord">
              <span  class="recharge-record vip-record">Riwayat Transaksi</span>
              </router-link> -->
</header>
</template>
<script>
export default {
  name: 'BHeader',
  data() {
    return {

    }
  },
  props: {
    title: String,
    recharge: false,
    backToApp: false,
    backToActivity: false,
    vip: false,
    vipRechargeRecord: false
  },
  methods: {
    goBack() {
      if (this.recharge || this.backToApp || this.getparam('push')) {
        if (this.$route.query.from == 'task') {
          window.history.go(-1)
        } else {
          window.AndroidWebView.closeActivities();
        }

      } else if (this.backToActivity) {
        this.$router.push("/activity")
      } else {
        window.history.go(-1)

      }
    },
    getparam(name) {
      let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(window.location.href)) {
        let str = unescape(RegExp.$2.replace(/\+/g, " "))
        if (str.indexOf("#") > -1) {
          let i = str.indexOf("#")
          return str.substring(0, i)
        } else {
          return unescape(RegExp.$2.replace(/\+/g, " "))
        }
      }
      return undefined
    },
  }
}
</script>
<style>
.header {
  position: fixed;
  top: 0;
  height: 70px;
  text-align: center;
  line-height: 85px;
  font-size: 16px;
  color: #333333;
  background: #fff;
  margin-bottom: 8px;
  width: 100%;
  z-index: 1;
}

.header div {
  width: 80%;
  margin: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  /* height: 50px;
  line-height: 50px; */
}

.nc-icon-prev {
    display: inline-block;
    position:absolute;
    left: 15px;
    top: 38px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #000000;
    border-right: 2px solid #000000;
    transform: rotate(-135deg);
  /* position: absolute;
  left: 15px;
  top: 13px;
  display: block;
  background: url(../../assets/images/prev.png);
  height: 25px;
  width: 20px;
  background-size: 20px 25px; */
}

.recharge-record {
  position: absolute;
  color: #999999;
  font-size: 12px;
  right: 10px;
  top: 1px;
}
</style>
