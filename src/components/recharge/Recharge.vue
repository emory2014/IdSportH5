<template> 
<div>
<BHeader title="Top Up Koin" recharge= {true}  />
<div class="recharge-container">
    <div class="recharge-balance">
        <p class="balance">{{balance}}</p>
         <p>Poin sekarang(Rpc)</p>
    </div>
    <p class="recharge-title">Silakan pilih Nominalnya</p>
    <div class="recharge-panel" v-if="data">
        <div v-for="(item,index) of data.amountInfo" :key="index" class="recharge-item" :class="[active == index ? 'active':'']" @click="addClass(index,item.money,item.buy,item.gift)">
            <span>Rp.{{$utils.parseMoney(item.money)}}</span>
            
        </div>
      
    </div>
    <p class="recharge-text" v-if="buy">Koin yang didapat：<span class="recharge-val">Rpc.{{$utils.parseMoney(buy)}}</span></p>
    <p class="recharge-text" v-if="gift">Bonus pembelian Koin：<span class="recharge-val">Rpc.{{$utils.parseMoney(gift)}}</span></p>
    <div class="recharge-btn" @click="recharge()">BELI</div>

</div>

<div class="mask" @click="maskPop($event)" :class="[maskShow?'show':'hide']">
    <div class="mask-cont">
        <p class="mask-cont-title">Transaksi Via</p>
        <ul v-if="data">
            <li v-for="(item,key,index) of data.banks" :key="index" @click="selectBank(key)">{{item}}</li>
        </ul>
    </div>
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
        data(){
            return {
                data: null,
                myData: null,
                balance: '--',
                maskShow: false,
                active: 0,
                amount: 0,
                method: 1,
                buy:40000,
                gift:0
            }
        },
        methods: {
             getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
            maskPop(e){
                if(e.target.className.indexOf("mask") > -1){
                    this.maskShow = false
                }
            },
          
            getData(){
                var content=window.AndroidWebView.getAppToken();
                let token = Base64.decode(content)
                // let token = '421c8548fa4afcbf6e1635efdac47e82'
               this.$http({
                    url: 'http://test.jiajiahebao.com/api/recharge/bank/list?t='+(new Date()).getTime(),
                    method: 'post',
                    data: {
                        token: token,
                    }
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data
                       this.balance = res.data.data.gold
                       this.buy = this.data.amountInfo[0].buy
                       this.gift = this.data.amountInfo[0].gift
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            
            },
           recharge(){
               this.maskShow = true
           },
           addClass(index,money,buy,gift){
               this.active = index
               this.amount = money
               this.buy = buy
               this.gift = gift
           },
           selectBank(key){
               this.method = key
               if(!this.amount){
                   this.amount = this.data.amountInfo[0].money
               }
               this.$router.push("/process?m="+this.amount+"&method="+this.method)
           }
        },
        mounted(){
            let _this = this;
             this.getData()
            
        }
    }
</script>
<style>
    @import  "../../assets/css/recharge.css";
    body {
    margin: 0;
    background: #fff;
}
</style>