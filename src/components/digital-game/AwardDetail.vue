<template> 
<div>
<BHeader title="Riwayat Menang" />
<div class="rank-container">

<div class="default-sec hide">
    <img src="../../assets/images/award-detail-bg.png">
    <p>Sementara limit kosong</p>
</div>

<div class="rank-box">
 <div class="rank-panel detail">
        
        <p class="rank-data-title">
        <span class="left">Periode</span>
        <span class="center">Waktu</span>
        <span class="right">Limit</span></p>
        <ul class="rank-ul">
            <li v-for="(item,index) of data" :key="index">
                <span class="left">{{item.period}}</span>
                <span class="center">{{item.create_time}}</span>
                <span class="right">Rp.{{item.win_money}}</span></li>
            
        </ul>
    </div>
</div>


</div>
</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'AwardDetail',
        components: {
           BHeader
        },
        data(){
            return {
                ruleMask: false,
                data: null,
                totalPage: 1,
                currentPage: 1
            }
        },
        methods: {
            getData(){
               this.$http({
                    url: 'http://test.jiajiahebao.com/game/success/record?token=e798b8a866554cca05c23eb93b5b9261&gameId=1',
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data.result
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
          
        },
        mounted(){
            this.getData()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>