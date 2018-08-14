<template> 
<div>
<!-- <BHeader v-if=" isTitle > -1" title="Mari kita sambut Ramadhan yang mendekat,
jawab pertanyaan menangkan Bonus" /> -->
<BHeader title="Tantangan Untuk Dapat Uang Tunai" />
<div class="game-container" :class="[isTitle > -1?'top-50':'']">
<div class="scroll-box">
<i class="icon-tip"></i>
<ul class="scroll-ul" id="scroll">
    <li v-for = "(item,index) of data" :key="index">{{item}}</li>
</ul>
</div>
<div class="rule-box" @click="showRuleMask()">Aturan Main</div>
<div class="game-text-sec">
    <div class="game-text-title">
        <span>Raih Total Rp.10.000.000 <br/>Bonus Uang Tunai Tanpa Henti</span>
    </div>
    <p v-if="userInfo" class="game-text-tip"> orang sedang main   sudah dibagikan <span class="color">Rp.{{userInfo.player_win_money}}</span></p>
</div>

<div class="game-start-btn" @click="startGame()" >
    Mulai Jawab
</div>
<p class="game-change-tip">Dapatkan 3x kesempatan menjawab</p>

<div class="game-award-sec" v-if="userInfo">
    <div class="head-sec"> 
        <span class="game-header">
            <img v-if="userInfo.avatar" :src="userInfo.avatar">
            <img v-else src="../../assets/images/game-header.png">
        </span>
        {{userInfo.mobile}}</div>
        <div class="game-items">
            <div class="game-item">
                <p>Bonus Periode Terakhir  (Rp.)</p>
                <span>{{userInfo.leastPrize}}</span>
                <p class="text">Penarikan min.Rp. 20.000</p>
            </div>
            
             <div class="game-item">
                  <router-link :to="'/rank?t='+(new Date()).getTime()+''+(isTitle > -1 ? '&title=1':'')">
                <p>Daftar Peringkat</p>
                <span>{{userInfo.rank}}</span>
                <p class="text">Menangkan hadiah besar</p>
                </router-link>
            </div>
        </div>  
        
</div>
<router-link :to="'/detail?t='+(new Date()).getTime()+''+(isTitle > -1 ? '&title=1':'')">
<div class="game-fixed-info" v-if="userInfo">
    Jumlah Saldo :  <span class="num">Rp.{{userInfo.totalWin}}</span>
    <span class="fixed-next">Lihat detail <i class="icon-fixed-next"></i></span>
</div>
</router-link>

<!-- <div class="btn-group">

    <div @click="startGame()" class="game-btn">Mulai Kuis</div>
    <router-link :to="'/award-record?token='+token+'&t='+(new Date()).getTime()+''+(isTitle > -1 ? '&title=1':'')">
    <div class="game-btn">Riwayat Pemenang</div></router-link>
</div> -->
</div>

<div class="rule-mask pb-45" :class="{show: ruleMask}">
    <div class="rule-cont">
    <img class="title" src="../../assets/images/rule-title.png">
    <ul class="rule-ul">
        <li>
            <i class="order-box">1</i>
            <p class="text">
                Setiap hari 1 orang hanya bisa mendapatkan 3x kesempatan menjawab kuis;
            </p>
        </li>
        <li>
            <i class="order-box">2</i>
            <p class="text">
                Jika kesempatan jawaban harian habis, Anda bisa mengundang teman. Setiap kali Anda mengundang teman dan mengunduh lalu login aplikasi Newscat, anda diberikan kesempatan 1x lagi untuk menjawab kuis, atau menggunakan Koin untuk mendapatkan kesempatan menjawab. Tukar 1x dapat 1x kesempatan, jumlah koin yang dibutuhkan 100 Koin;
            </p>
        </li>
         <li>
            <i class="order-box">3</i>
            <p class="text">
                 Setiap 1 jam sekali akan diumumkan pemenang. Para pemain yang menjawab 50 pertanyaan dengan benar maka akan mendapatkan hadiah uang tunai;

            </p>
        </li>
        <li>
            <i class="order-box">4</i>
            <p class="text">
                  Jika Saldo Anda mencapai Rp. 20.000 pada Saya-Pencairan Cepat, Anda tidak perlu mengundang teman dan bisa langsung menarik uang tunai;

            </p>
        </li>
        <li>
            <i class="order-box">5</i>
            <p class="text">
                 Undang teman anda untuk mendapatkan kesempatan menjawab pertanyaan atau tukar koin emas untuk mendapatkan kesempatan menjadi pertanyaan. WAJIB digunakan dihari yang sama, tidak dapat digabungkan pada hari berikutnya;
            </p>
        </li>
        <li>
            <i class="order-box">6</i>
            <p class="text">
                  Menjawab pertanyaan tidak ada batas waktu, setiap pemain bisa menguji kemampuan kecepatan Anda sendiri dalam menjawab pertanyaan;
            </p>
        </li>
         <li>
            <i class="order-box">7</i>
            <p class="text">
                  Jika ada pelanggaran terhadap partisipasin dalam permainan, NewsCat berhak membatalkan partisipasin dari event, dan jika perlu berhak untuk mengambil langkah hukum;
            </p>
        </li>
         <li>
            <i class="order-box">8</i>
            <p class="text">
                  Peraturan yang dibuat adalah bagian dari hak penyelenggara permainan;
            </p>
        </li>
    </ul>
    <i @click="closeRuleMask()" class="icon-close">×</i>
    </div>
</div>
 <div class="rule-mask " :class="[noChangeMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <p class="title">Anda Pyakin mau tukarkan 100 koin Emas untuk menjawab peranyaan? </p>
                        <div class="mask-btn" @click="confirmRechargeCoin()">Oke</div>
                        <div class="mask-btn" @click="cancelRechargeCoin()">Tidak</div>       
                        
                    </div>
                </div>
<p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>

</div>
</template>
<script>
import BHeader from "../common/BHeader";
let Base64 = require('js-base64').Base64;

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
                userInfo: null,
                gameId: '2',
                token: '',
                noChangeMaskShow: false,
                isTitle: window.location.search.indexOf("title")
            }
        },
        methods: {
             getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
                 getAppToken(){
                 try{
                    if(this.getQueryString("token")){
                        this.token = this.getQueryString("token")
                    }else{
                        var content=window.AndroidWebView.getAppToken();
                        var token = Base64.decode(content)
                        this.token = token
                    }

                }
                catch(err){
                    console.log(err)
                }
            },
            startGame(){
                this.getAppToken()
                  this.$http({
                        url: '/game/check?token='+this.token+'&gameId='+this.gameId+'&t='+(new Date()).getTime(),
                        method: 'get',
                }).then((res) => {
                if (res.data.status.code == 200) {
                       this.$router.push("/start?t="+(new Date()).getTime()+""+((this.isTitle > -1) ? "&title=1":""))
                }else if(res.data.status.code == 2105){
                        this.noChangeMaskShow = true
                }
                else{
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            confirmRechargeCoin(){
                   this.getAppToken();
                    this.$http({
                    url: '/game/buy/chance?token='+this.token+'&gameId='+this.gameId+'&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        this.$router.push("/start?t="+(new Date()).getTime()+""+(this.isTitle > -1 ? "&title=1":""))
                }else {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            cancelRechargeCoin(){
                //this.$router.push("/game?token=ewaeaeu"+this.token+"&t="+(new Date()).getTime())
                this.noChangeMaskShow = false
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
                        url: '/game/home?gameId='+this.gameId+'&t='+(new Date()).getTime(),
                        method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data
                       this.scroll()
                }
                else {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
                },
        },
        mounted(){
            // let token = this.getQueryString("token")
            // this.token = token ? token.substring(7) : "";
            
            // window.AndroidWebView.showContent(123)
            // this.token = window.AndroidWebview.getAppToken()
            window.AndroidWebView.showContent(window.AndroidWebview.getAppToken())
               this.getAppToken()
            
                this.getData();
         
                this.$http({
                    url: '/game/user/center?token='+this.token+'&gameId='+this.gameId+'&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                if (res.data.status.code == 200) {
                       this.userInfo = res.data.data
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
        },
        beforeDestroy(){
            clearInterval(this.timer)
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>