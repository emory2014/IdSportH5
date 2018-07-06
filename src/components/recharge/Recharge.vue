<template> 
<div>
<BHeader title="Top Up Koin" recharge= {true}  />
<div class="recharge-container">
    <div class="recharge-balance" @click="test()">
        <p class="balance">{{balance}}</p>
         <p>Poin sekarang(Rpc)</p>
    </div>
    <p class="recharge-title">Silakan pilih Nominalnya</p>
    <div class="recharge-panel" v-if="data">
        <div v-for="(item,index) of data.amountInfo" :key="index" class="recharge-item" :class="[active == index ? 'active':'']" @click="addClass(index,item.money)">
            <span>Rp.{{item.money}}</span>
            <span>Rpc.{{item.gold}}</span>
        </div>
      
    </div>

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
                method: 1
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
            test(){
                 window.AndroidWebView.showContent("gagsga")
                alert(12)
            },
            getData(){
                window.AndroidWebView.showContent("hahah")
            //     var content=window.AndroidWebView.getAppToken();
			// 	window.AndroidWebView.showContent(content);
            //    this.$http({
            //         url: 'http://test.jiajiahebao.com/api/recharge/bank/list?token='+window.AndroidWebView.getAppToken()+'&t='+(new Date()).getTime(),
            //         method: 'get',
            //     }).then((res) => {
            //         if (res.data.status.code == 200) {
            //            this.data = res.data.data
            //            this.balance = res.data.data.gold
            //     }else  {
                   
            //         }

            //     }).catch((res) => {
            //         console.log('error: ', res);
            //     });
            
            },
           recharge(){
               this.maskShow = true
           },
           addClass(index,money){
               this.active = index
               this.amount = money
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
            this.getData()
        }
    }
</script>
<style>
    @import  "../../assets/css/recharge.css";
</style>