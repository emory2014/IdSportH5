<template>
<div v-on:click="hidePanel">
  <BHeader title="Top Up Koin" recharge={true} />
  <div class="recharge-container">
    <!-- <div class="recharge-balance">
      <p class="balance">{{balance}}</p>
      <p>Poin sekarang(Rpc)</p>
    </div> -->
    <div class="recharge-balance">
      <span>Saldo Saat Ini(Rp)</span>
      <span>{{balance|thousands}}</span>
    </div>
    <p class="recharge-title">Silakan pilih Nominalnya</p>
    <div class="recharge-panel" v-if="data">
      <div v-for="(item,index) of data.amountInfo" :key="index" v-if="!from || from && index > 1" class="recharge-item" :class="[active == index ? 'active':'']" @click="addClass(index,item.money,item.buy,item.gift)">
        <span>Rp.{{parseMoney(item.money)}}</span>

      </div>

    </div>
    <p class="recharge-text" v-if="buy">Koin yang didapat：<span class="recharge-val">Rpc.{{parseMoney(buy)}}</span></p>
    <p class="recharge-text" v-if="gift">Bonus pembelian Koin：<span class="recharge-val">Rpc.{{parseMoney(gift)}}</span></p>
    <div class="recharge-btn" @click="recharge()">Beil</div>

  </div>

  <!-- <div class="mask" @click="maskPop($event)" :class="[maskShow?'show':'hide']">
    <div class="mask-cont">
      <p class="mask-cont-title">Transaksi Via</p>
      <ul v-if="data">
        <li v-for="(item,key,index) of data.banks" :key="index" @click="selectBank(key)">{{item}}</li>
      </ul>
    </div>
  </div> -->
  <div class="mask" @click="maskPop($event)" :class="[maskShow?'show':'hide']">
    <ul class="bank-select"   v-if="maskShow && data" >
        <li v-for="(item,key,index) of data.banks" :key="index" @click="selectBank(key)">{{item}}</li>
    </ul>
  </div>




</div>
</template>
<script>
import BHeader from "../common/BHeader"
let Base64 = require('js-base64').Base64;

export default {
  name: 'Recharge',
  components: {
    BHeader
  },
  data() {
    return {
      panelShow:true,
      data: null,
      myData: null,
      balance: '--',
      maskShow: false,
      active: this.$route.query.vip ? 2 : 0,
      amount: 0,
      method: 1,
      buy: 40000,
      gift: 0,
      from: this.$route.query.vip
    }
  },
  methods: {
    hidePanel(event){
      if(event.target.className != 'recharge-btn'){
        console.log(event.target)
      this.maskShow = false;
      }
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    maskPop(e) {
      if (e.target.className.indexOf("mask") > -1) {
        this.maskShow = false
      }
    },

    getData() {
      this.$http({
        url: '/api/recharge/bank/list?t=' + (new Date()).getTime(),
        method: 'post',
        data: {
          token: this.getAppToken(),
        }
      }).then((res) => {

        if (res.data.status.code == 200) {
          this.data = res.data.data
          this.balance = res.data.data.gold
          if (this.from) {
            this.buy = this.data.amountInfo[2].buy
            this.gift = this.data.amountInfo[2].gift
          } else {
            this.buy = this.data.amountInfo[0].buy
            this.gift = this.data.amountInfo[0].gift
          }

        } else if (res.data.status.code == 401) {
          window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();
        } else {
          window.AndroidWebView.showContent(res.data.status.message);
        }

      }).catch((res) => {
        console.log('error: ', res);
      });

    },
    recharge() {   
      this.maskShow = true 
      console.log('this.maskShow',this.maskShow)  
    },
    addClass(index, money, buy, gift) {
      this.active = index
      this.amount = money
      this.buy = buy
      this.gift = gift
    },
    selectBank(key) {
      this.method = key
      if (!this.amount) {
        this.amount = this.data.amountInfo[0].money
      }
      this.$router.push("/process?m=" + this.amount + "&method=" + this.method)
    }
  },
  created() {
    let _this = this;
    this.getData()

  },
}
</script>
<style>
@import "../../assets/css/recharge.css";

body {
  margin: 0;
  background: #fff;
}
.bank-select{
    background: #f5f5f5;
    position: fixed;
    width: 100%;
    height: 170px;
    left:0;
    padding: 0px;
    margin: 0px;
    bottom: 0;
    z-index: 1;
    box-sizing: border-box;
    padding: 0px;
    list-style: none;
}
.bank-select li {
    height: 45px;
    line-height: 45px;
    text-align: center;
}
.bank-select li:hover {
   background-color: #E4B68B;
}
</style>
