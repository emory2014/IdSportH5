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
                <i class="icon-plus" @click="nextQustion()"></i>
                <i class="icon-subtraction" @click="showErrMask()"></i>
                <div class="rule-mask " :class="[errMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <p class="title">Anda Punya 2 kali ksempatan</p>
                        <div class="mask-btn">Coba Lagi</div>
                        <div class="mask-btn" @click="inviteMaskToShow()">Undang Teman Ikut Bermain</div>
                        <i @click="closeErrMask()" class="icon-close">×</i>        
                    </div>
                </div>
                <div class="rule-mask " :class="[inviteMaskShow ? 'show':'hide']">
                    <div class="invite-mask-cont cont">
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

    <div class="rule-mask ">
        <div class="success-mask-cont">
        <img class="icon-award" src="../../assets/images/icon-award.png" />
            <p class="title">Kamu jenius</p>
            <p class="text">Selamat Anda telah menjawab benar semua 
        pertanyaan, Anda akan mendapatkan bonus 
        sebesar Rp. 5000 Jam pengambilan bonus 
        paling terakhir jam 5 sore</p>
        </div>
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
            inviteMaskToShow(){
                this.errMaskShow = false
                this.inviteMaskShow = true
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
                //this.$refs.bar.style.width = 10+"px"
               
            },
            closeErrMask(){
                this.errMaskShow = false
            },
            showErrMask(){
                this.errMaskShow = true
            },
            maskSpaceClick(){
                var mask = document.querySelector(".rule-mask")
                var cont = document.querySelector(".cont")
                mask.addEventListener("click",(e) =>{
                    if(!cont.contains(e.target)){
                        this.errMaskShow = false
                        this.inviteMaskShow = false
                    }
                })
                document.getElementsByClassName("rule-mask")[1].addEventListener("click",(e) =>{
                    if(!cont.contains(e.target)){
                        this.errMaskShow = false
                        this.inviteMaskShow = false
                    }
                })
            },
            nextQustion(){
                document.querySelector(".proccess-ing").style.transition = 'none'                
                 document.querySelector(".proccess-ing").style.width = '100%'
                setTimeout(() => {
                document.querySelector(".proccess-ing").style.transition = 'width 5s'
                 document.querySelector(".proccess-ing").style.width = '0'
                    
                },500)
               
            },
            getDate(){
                this.$http({
                url: '/game/get/question?token=e798b8a866554cca05c23eb93b5b9261&gameId=1',
                method: 'get',
                data: {
                
                }
                }).then((res) => {
                    if (res.data.status.code == 200) {
                    
                }else if (res.data.status.code == 401) {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
        },
        mounted(){
            this.countDown();
            this.maskSpaceClick()
            this.getDate()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>