<template> 
<div>
<BHeader title="Mari kita sambut Ramadhan yang mendekat,
jawab pertanyaan menangkan Bonus" />
<div class="game-container">
<div class="scroll-box">
<i class="icon-tip"></i>
<ul class="scroll-ul" id="scroll">
    <li>62813****1886获得现金奖励</li>
    <li>62813****1886获得现金奖励</li>
    <li>62813****1886获得现金奖励</li>
    <li>62813****1886获得现金奖励</li>
</ul>
</div>

<div class="btn-group">
<div class="rule-box"></div>
    <div class="game-btn">Mulai Kuis</div>
    <div class="game-btn">Riwayat Pemenang</div>
</div>
</div>

<div class="rule-mask">
    <div class="rule-cont">
    <p class="title">Aturan Main</p>
    <ol>
        <li></li>
        <li></li>
    </ol>
    </div>
</div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'Game',
        components: {
           BHeader
        },
        data(){
            return {

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
        },
        mounted(){
            this.scroll()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>