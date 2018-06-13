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
<div class="rule-box" @click="showRuleMask()"></div>
    <router-link to="/start"><div class="game-btn">Mulai Kuis</div></router-link>
    <div class="game-btn">Riwayat Pemenang</div>
</div>
</div>

<div class="rule-mask" :class="{show: ruleMask}">
    <div class="rule-cont">
    <p class="title">Aturan Main</p>
    <ul class="rule-ul">
        <li>
            <i class="order-box">1</i>
            <p class="text">
                Setiap hari per orang hanya bisa mendapatkan 3x kesempatan menjawab kuis
            </p>
        </li>
        <li>
            <i class="order-box">2</i>
            <p class="text">
                Jika kesempatan bermain sudah habis, Anda bisa mendapatkan kesempatan bermain lagi dengan cara: Undang teman untuk bergabung di Newscat (mengundang 1 teman, mendapat 1x kesempatan bermain) ;
                 atau menukarkan 100 koin emas Anda untuk 1x kesempatan bermain.
            </p>
        </li>
         <li>
            <i class="order-box">3</i>
            <p class="text">
                Setiap 1 jam sekali akan diumumkan pemenang, Pemain yang dapat menjawab 50 pertanyaan 
                dengan benar maka akan mendapatkan hadiah Cash.

            </p>
        </li>
        <li>
            <i class="order-box">4</i>
            <p class="text">
                  Cash yang Anda dapatkan, dapat dilihat di “Penghasilan Saya” .
            </p>
        </li>
        <li>
            <i class="order-box">5</i>
            <p class="text">
                  Jika Saldo yang dihasilkan dari bermain mencapai Rp.20.000, 
                  maka Anda dapat melakukan Pencairan Dana tanpa harus mengundang teman.

            </p>
        </li>
         <li>
            <i class="order-box">6</i>
            <p class="text">
                  Menjawab pertanyaan tidak ada batas waktu, setiap pemain bisa menguji 
                  kemampuan kecepatan Anda sendiri dalam menjawab pertanyaan.
            </p>
        </li>
         <li>
            <i class="order-box">7</i>
            <p class="text">
                  Peraturan yang dibuat adalah bagian dari hak penyelenggara permainan.
            </p>
        </li>
    </ul>
    <i @click="closeRuleMask()" class="icon-close">×</i>
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
            this.scroll()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>