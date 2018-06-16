<template> 
<div>
<div class="rank-container">
<BHeader title="peringkat" v-if="isTitle > -1" />
    <div class="rank-panel">
        <img class="rank-title" src="../../assets/images/rank-title.png">
        <p class="rank-data-title">
        <span class="left">peringkat</span>
        <span class="center">Nomor Ponsel</span>
        <span class="right">jumlah saldo</span></p>
        <ul class="rank-ul" v-if="data">
            <li v-for="(item,index) of data" :key="index">
            <span class="left">{{item.rank}}</span>
            <span class="center">{{item.mobile}}</span>
            <span class="right">Rp.{{item.total_win_money}}</span></li>
        </ul>
    </div>
</div>

<div class="footer-data" v-if="myData">
            <span class="left">{{myData.rank}}</span>
            <span class="center">{{myData.mobile}}</span>
            <span class="right">Rp.{{myData.total_win_money}}</span>
</div>




</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'Rank',
        components: {
           BHeader
        },
        data(){
            return {
                ruleMask: false,
                data: null,
                myData: null,
                token: '',
                isTitle: window.location.search.indexOf("title")
            }
        },
        methods: {
             getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
            getData(){
               this.$http({
                    url: 'http://test.jiajiahebao.com/game/get/rank?token='+this.token+'&gameId=1&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data.list
                       this.myData = res.data.data.self
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            
            },
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            }
        },
        mounted(){
            this.token = this.getQueryString("token")
            this.getData()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>