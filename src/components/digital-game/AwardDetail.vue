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
        <span class="left">peringkat</span>
        <span class="center">Nomor Ponsel</span>
        <span class="right">jumlah saldo</span></p>
        <ul class="rank-ul">
            <li>
            <span class="left">1</span>
            <span class="center">62121***1566</span>
            <span class="right">Rp.50000</span></li>
             <li>
            <span class="left">2</span>
            <span class="center">62121***1566</span>
            <span class="right">Rp.50000</span></li>
             <li>
            <span class="left">3</span>
            <span class="center">62121***1566</span>
            <span class="right">Rp.50000</span></li>
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
                ruleMask: false
            }
        },
        methods: {
            scroll(){
            
            },
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            }
        },
        mounted(){
            this.scroll()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>