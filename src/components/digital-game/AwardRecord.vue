<template> 
<div>
<div class="record-container">

<div class="data-panel" v-if="data">
    <div class="award-avator-box">
        <img class="award-record-avator" src="../../assets/images/header.png"  />
    </div>
    <p class="name">{{data.mobile}}</p>
    <div class="my-data-items">
        <div class="item">
            <i class="icon-rp"></i>
            <p class="text">Limit periode ini</p>
            <p class="num">Rp.{{data.leastPrize}}</p>
        </div>
        <router-link to="/rank">
        <div class="item">
            <i class="icon-chapion"></i>
            <p class="text">Peringkat</p>
            <p class="num">{{data.rank}}</p>
        </div>
        </router-link>
    </div>
</div>
<div class="user-panel">
<router-link to="/detail">
    <p class="text">jumlah saldo</p>
    <p class="num" v-if="data">Rp.{{data.totalWin}}</p>  
    <p class="text-go">lihat lebih banyak<i class="icon-go"></i></p>  
    </router-link>
</div>

</div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'AwardRecord',
        components: {
           BHeader
        },
        data(){
            return {
                ruleMask: false,
                data: null,
                token: 'e798b8a866554cca05c23eb93b5b9261'
            }
        },
        methods: {
             getData(){
               this.$http({
                    url: 'http://test.jiajiahebao.com/game/user/center?token='+this.token+'&gameId=1',
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
        },
        mounted(){
           this.token = window.AndroidWebview.getAppToken()
           this.getData()

        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>