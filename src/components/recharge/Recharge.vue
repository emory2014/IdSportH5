<template>
<div>
  <!-- <BHeader title="Top Up Koin" recharge={true} /> -->
  <header class="fixHeader" :style="{paddingTop: $route.query.from == 'task' ? '18px': '0px'}">
  　<i class="nc-icon-prev" @click="goBack()" :style="{top: $route.query.from == 'task' ? '38px': '20px'}"></i>
  <div>Top Up Koin</div>
</header>
  <div class="recharge-container" >
    <div class="recharge-balance">
      <span>Saldo Saat Ini(Rp)</span>
      <span>{{balance|thousands}}</span>
    </div>
    <p class="recharge-title">Silakan pilih Nominalnya</p>
    <div class="recharge-panel" v-if="data">
      <div v-for="(item,index) of data.amountInfo" :key="index" v-if="!from || (from && index > 1)" class="recharge-item" :class="[active == index ? 'active':'']" @click="addClass(index,item.money,item.buy,item.gift)">
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
  <!-- <div class="mask" @click="maskPop($event)" :class="[maskShow?'show':'hide']">
    <Picker :columns="dataList" @change="onChange" class="bank-select" :default-index="2" /> -->
    <!-- <ul class="bank-select"   v-if="maskShow && data" >
        <li v-for="(item,key,index) of data.banks" :key="index" @click="selectBank(key)">{{item}}</li>
    </ul> -->
  <!-- </div> -->
  <div @click="closePup($event)">
    <Popup v-model="popupShow" position="bottom">
      <Picker
        :columns="dataList" 
        @change="onChange" 
        :default-index="2" 
        />
    </Popup>
  </div>
</div>
</template>
<script>
import { Picker,Popup } from 'vant'
import 'vant/lib/picker/style';
import 'vant/lib/popup/style';
import BHeader from "../common/BHeader"
let Base64 = require('js-base64').Base64;

export default {
  name: 'Recharge',
  components: {
    BHeader,
    Picker,
    Popup
  },
  data() {
    return {
      keyId:'',
      popupShow: false,
      banks: [],
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
  computed: {
    dataList(){
      let res = Object.keys(this.banks).reduce((r,c) => {
        return [
          ...r,
          {
            text:this.banks[c],
            id: c
          }
        ]      
      },[])
      return res
    }
  },
  methods: {
    goBack(){
        if (this.$route.query.from == 'task') {
          window.history.go(-1)
        } else {
          window.AndroidWebView.closeActivities();
        }
    },
    closePup(e){
      console.log(e.target)
       setTimeout(()=>{ this.popupShow = false},300)
        if(e.target.className.indexOf("van-picker-column__item") > -1){
          if(e.target.innerHTML.indexOf('MANDIRI') > -1){
            this.keyId = 3;
          }
          if (!this.amount) {
            this.amount = this.data.amountInfo[0].money
          }
          this.$router.push("/process?m=" + this.amount + "&method=" + this.keyId)         
        }
       
     
    },
    onChange(picker, value, index) {
      let keyId = value.id;
      this.keyId = keyId
      console.log('当前值'+keyId );
    },
    // hidePanel(event){
    //   if(event.target.className != 'recharge-btn'){
    //     console.log('d',event.target)
    //   this.maskShow = false;
    //   }
    // },
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
          this.banks = this.data.banks
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
      this.popupShow = true 
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
    console.log(this.$route.query.from)
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
    background: #FFFFFF;
    position: fixed;
    width: 100%;
    height: 30%;
    bottom: 0;
}
.bank-select li {
    height: 45px;
    line-height: 45px;
    text-align: center;
}
.bank-select li:hover {
   background-color: #E4B68B;
}
.fixHeader {
  position: fixed;
  top: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: #333333;
  background:rgba(255,255,255,1);
  margin-bottom: 8px;
  width: 100%;
  z-index: 1;
  box-shadow:0px 2px 8px 0px rgba(0,0,0,0.06);
}

.fixHeader div {
  width: 80%;
  margin: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

.fixHeader .nc-icon-prev {
    display: inline-block;
    position:absolute;
    left: 15px;
    top: 20px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #000000;
    border-right: 2px solid #000000;
    transform: rotate(-135deg);
}
</style>
