<template> 
<div>
<div class="game-container">
<div class="scroll-box">
<i class="icon-tip"></i>
<ul class="scroll-ul" id="scroll">
    <li v-for = "(item,index) of data" :key="index">{{item}}</li>
</ul>
</div>

<div class="btn-group">
<div class="rule-box" @click="showRuleMask()"></div>
    <div @click="startGame()" class="game-btn">Mulai Kuis</div>
    <router-link :to="'/award-record?token='+this.token"><div class="game-btn">Riwayat Pemenang</div></router-link>
</div>
</div>

<div class="rule-mask pb-45" :class="{show: ruleMask}">
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
                Jika slot permainan habis,Anda bisa mengundang teman,jika teman yang Anda undang download aplikasi NewsCat dan daftar maka 
                Anda punya kesempatan untuk sekali untuk menjawab pertanyaan dan bonus Rp.1000.atau bisa menggunakan 100 koin emas untuk menukarkan sekali pertanyaan.
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
                  Kalian dapat melihat hadiah uang tunai kalian di daftar pemenang hadiah
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
                Undang teman anda untuk mendapatkan kesempatan menjawab pertanyaan atau tukar koin emas untuk mendapatkan kesempatan menjadi pertanyaan, 
                wajib digunakan dihari yang sama, tidak dapat gabungkan pada hari berikutnya.
            </p>
        </li>
         <li>
            <i class="order-box">7</i>
            <p class="text">
                  Menjawab pertanyaan tidak ada batas waktu, setiap pemain bisa menguji 
                  kemampuan kecepatan Anda sendiri dalam menjawab pertanyaan.
            </p>
        </li>
         <li>
            <i class="order-box">8</i>
            <p class="text">
                  Peraturan yang dibuat adalah bagian dari hak penyelenggara permainan.
            </p>
        </li>
    </ul>
    <i @click="closeRuleMask()" class="icon-close">×</i>
    </div>
</div>
<p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>

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
                ruleMask: false,
                timer: null,
                toastShow: false,
                msg: '',
                data: null,
                token: ''
            }
        },
        methods: {
             getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
            startGame(){
                  this.$http({
                        url: 'http://test.jiajiahebao.com/game/check?token='+this.token+'&gameId=1&t=(new Date()).getTime()',
                        method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.$router.push("/start?token="+this.token)
                }else {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
             toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
                },
            scroll(){
                var scroll = document.getElementById("scroll");
                var step =1;
                var w = scroll.scrollWidth - scroll.offsetWidth;
                this.timer = setInterval(function () 
                {
                    scroll.scrollLeft += step;
                if (scroll.scrollLeft != 0 && scroll.scrollLeft == scroll.scrollWidth - scroll.offsetWidth) 
                {
                    scroll.scrollLeft = 0
                    }
                
                //  console.log(scroll.scrollLeft)
                }, 50)
            },
            showRuleMask(){
                this.ruleMask = true
            },
            closeRuleMask(){
                this.ruleMask = false
            },
          getData(){
                     this.$http({
                        url: 'http://test.jiajiahebao.com/game/home?gameId=1&t=(new Date()).getTime()',
                        method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data
                       this.scroll()
                }else  {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
                },
        },
        mounted(){
            this.token = getQueryString("token").substring(7);
            // alert(123)
            // this.token = window.AndroidWebview.getAppToken()
            //  alert('aa:'+this.token)
            // alert('bb'+window.AndroidWebview.getAppToken())
            this.getData()
         

        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>