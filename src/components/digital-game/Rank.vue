<template> 
<div>
<div class="rank-container">
    <BHeader title="Riwayat Menang" />

    <div class="rank-panel">
        <img class="rank-title" src="../../assets/images/rank-title.png">
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

<div class="footer-data">
            <span class="left">3</span>
            <span class="center">62121***1566</span>
            <span class="right">Rp.50000</span>
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