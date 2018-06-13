<template> 
<div>
<BHeader title="开斋节答题" />
<div class="start-container">
    <div class="start-sec">
        <span class="num" :class="[ !start ? 'show':'hide']">{{count}}</span>
        <div class="question-sec" :class="[ start ? 'show':'hide']">
            <p class="title">Periode 1</p>
            <div class="proccess-bar-box">
                <div ref="bar" class="proccess-ing"></div>
            </div>
            <p class="text">Pertanyaan 1</p>
            <div class="qustion-cont">
                <span>4</span>
                <span class="plus">+</span>
                <span>2</span>
                <br/>
                <span>=</span>
                <span>6</span>
            </div>
            
        </div>
            
    </div>

   <div class="answer" :class="[ start ? 'show':'hide']">
                <i class="icon-plus"></i>
                <i class="icon-subtraction" @click="showErrMask()"></i>
                <div class="rule-mask " :class="[errMaskShow? 'show':'hide']">
                    <div class="err-mask-cont">
                        <p class="title">Anda Punya 2 kali ksempatan</p>
                        <div class="mask-btn">Coba Lagi</div>
                        <div class="mask-btn">Undang Teman Ikut Bermain</div>
                        <i @click="closeErrMask()" class="icon-close">×</i>        
                    </div>
                </div>
                <div class="rule-mask show" :class="[inviteMaskShow ? 'show':'show']">
                    <div class="invite-mask-cont">
                        <p class="text">Setiap mengundang 1 teman, Anda memiliki 
                            1 kali acara untuk mengik-uti kuis.</p>
                        <p class="text">Mengundang semakin banyak teman, kese-
                            mpatan berikut kuis Semakin besar.</p> 
                            <div class="invite-icon-group">
                                <i class="icon-facebook"></i>
                                <i class="icon-whatsapp"></i>
                            </div>
                    </div>
                </div>
    </div>

    <div class="rule-sec" :class="[ !start ? 'show':'hide']">
        <p>Peraturan main</p>
        <div>Menjawab 50 pertanyaan dengan benar akan <br/>
        mendapatkan total uang cash sebesar<br/> 1.000.000</div>
    </div>

   

</div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'Start',
        components: {
           BHeader
        },
        data(){
            return {
                ruleMask: false,
                count: 3,
                start: false,
                errMaskShow: false,
                inviteMaskShow: false
            }
        },
        methods: {
           
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            },
            countDown(){
                    var timeout = setInterval(() => {
                        if(this.count > 1){
                    this.count = this.count - 1
                        }else{
                        this.start = true
                        clearInterval(timeout)
                }
                },1000)
            },
            proccessActive(time){
                console.log(this.$refs.bar.style.width)
                this.$refs.bar.style.width = 10+"px"
               
            },
            closeErrMask(){
                this.errMaskShow = false
            },
            showErrMask(){
                this.errMaskShow = true
            },
        },
        mounted(){
            this.countDown();
            setTimeout(() => {
            this.proccessActive()
            },3200)
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>