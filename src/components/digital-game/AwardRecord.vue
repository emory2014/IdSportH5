<template> 
<div>
<BHeader title="Riwayat Menang" />
<div class="record-container">

<div class="data-panel">
    <div class="award-avator-box">
        <img class="award-record-avator" src="../../assets/images/header.png"  />
    </div>
    <p class="name">6208213319443</p>
    <div class="my-data-items">
        <div class="item">
            <i class="icon-rp"></i>
            <p class="text">Limit periode ini</p>
            <p class="num">Rp.1000000.00</p>
        </div>
        <router-link to="/rank">
        <div class="item">
            <i class="icon-chapion"></i>
            <p class="text">Peringkat</p>
            <p class="num">100+</p>
        </div>
        </router-link>
    </div>
</div>
<div class="user-panel">
<router-link to="/detail">
    <p class="text">jumlah saldo</p>
    <p class="num">Rp.16000</p>  
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
                ruleMask: false
            }
        },
        methods: {
            scroll(){
                var scroll = document.getElementById("scroll");
                var step =1,scrollWidth=scroll.scrollWidth-scroll.offsetWidth;
                var timer = setInterval(function () 
                {
                scroll.scrollLeft += step;
                if (step > 0 && scroll.scrollLeft >= scrollWidth) 
                {
                    scroll.scrollLeft = 0
                    }
                else if (step <0 && scroll.scrollLeft <=0) 
                {
                    scroll.scrollLeft = 0
                }
        }, 50)
            },
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            }
        },
        mounted(){
           
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>