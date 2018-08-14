<template> 
<div>
<BHeader title="Kuis" />
<div class="start-container">
     <p class="start-title" :class="[ start ? 'show':'hide']">Periode {{period}}</p>
     <span class="start-num" ref="num" :class="[ !start ? 'show':'hide']">{{count}}</span>
    <div class="start-sec" :class="[ start ? 'show':'hide']">
        
        <div class="question-sec">
            <p class="process-num">{{questionNum}}</p>
           <div class="process-sec">
               <CircleProcess />
           </div>
            <!-- <div class="proccess-bar-box">
                <div ref="bar" class="proccess-ing"></div>
            </div> -->
            <p class="text"> {{questionNum}}/{{questions.length}}</p>
            <div class="qustion-cont">
                <span>{{a}}</span>
                <span class="plus">{{operator}}</span>
                <span>{{b}}</span>
                <br/>
                <span>=</span>
                <span>{{result}}</span>
            </div>
        </div>
            
    </div>

   <div class="answer" :class="[ start ? 'show':'hide']">
                <i id="plus" class="icon-plus" @click="nextQustion(1)"></i>
                <i id="subtraction" class="icon-subtraction" @click="nextQustion(0)"></i>
                <div class="rule-mask " :class="[errMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <span class="mask-game-header">
                            <!-- <img src="../../assets/images/game-header.png"> -->
                             <img :src="avatar">
                        </span>
                        <p class="title">Kamu masih punya <span class="mark">{{gameCount}}x</span> kesempatan</p>
                        <div class="mask-btn" @click="restart()">Coba Lagi</div>
                        <div class="mask-btn" @click="inviteMaskToShow()">Undang teman untuk dapat <br> kesempatan menjawab</div>       
                    </div>
                </div>

                <div class="rule-mask " :class="[noChangeMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <span class="mask-game-header">
                            <!-- <img src="../../assets/images/game-header.png"> -->
                             <img :src="avatar">
                        </span>
                        <p class="title">Kesempatan sudah habis, tidak <br> mendapatkan bonus</p>
                        <p class="tip">Kamu bisa pakai cara lain untuk dapat kesempatan jawab <br>
                                Ayo semangat kamu pasti bisa</p>
                        <div class="mask-btn" @click="inviteMaskToShow()">Undang Teman</div>       
                        <div class="mask-btn" @click="rechargeCoin()">Tukar 100 Koin </div>
                        <!-- <div class="mask-btn" @click="watchADS()">Nonton Iklan </div> -->
                    </div>
                </div>

                 <div class="rule-mask " :class="[confirmMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <span class="mask-game-header">
                            <!-- <img src="../../assets/images/game-header.png"> -->
                            <img :src="avatar">
                            </span>
                        <p class="title">Kamu yakin mau tukar 100 Koin untuk <br> menjawab pertanyaan? </p>
                        <div class="mask-btn" @click="confirmRechargeCoin()">Oke</div>
                        <div class="mask-btn" @click="cancelRechargeCoin()">Tidak</div>       
                        
                    </div>
                </div>

                <div class="rule-mask " :class="[inviteMaskShow ? 'show':'hide']">
                    <div class="invite-mask-cont cont">
                        <p class="text">Setiap mengundang 1 teman, Anda memiliki 
                            1 kali acara untuk mengik-uti kuis.</p>
                        <p class="text">Mengundang semakin banyak teman, kese-
                            mpatan berikut kuis Semakin besar.</p> 
                            <div class="invite-icon-group">
                              <i @click="facebookShare()" class="icon-facebook"></i>
                              <i @click="whatsappShare()" class="icon-whatsapp"></i>
                            </div>
                           <router-link :to="'/game?t='+(new Date()).getTime()+''+(isTitle > -1 ?'&title=1':'')"><p class="invite-cancel-btn">Tidak</p> </router-link>
                    </div>
                </div>
    </div>

    <div class="rule-sec" :class="[ !start ? 'show':'hide']">
        <p>Peraturan main</p>
        <div>Menjawab 50 pertanyaan dengan benar akan <br/>
        mendapatkan total uang cash sebesar<br/> 10.000.000</div>
    </div>

    <div class="rule-mask " :class="[ successShow ? 'show':'hide']">
        <div class="success-mask-cont">
        <img class="icon-award" src="../../assets/images/icon-award.png" />
            <p class="title">Kamu jenius</p>
            <p class="text">{{successMsg}}</p>
        <router-link :to="'/game?t='+(new Date()).getTime()+''+(isTitle > -1 ?'&title=1':'')"><div class="mask-btn">saya tahu</div></router-link>
        </div>
    </div>

    <div class="rule-mask" :class="[ errMsgShow ? 'show': 'hide']">
        <div class="success-mask-cont pt-30">
            {{errMsg}}
            <router-link  :to="'/game?t='+(new Date()).getTime()+''+(isTitle > -1 ?'&title=1':'')"><div class="mask-btn">Oke</div></router-link>
        </div>
    </div>
   

</div>
<p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import CircleProcess from "../common/CircleProcess"
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64

    export default {
        name: 'Start',
        components: {
           BHeader,
           CircleProcess
        },
        data(){
            return {
                ruleMask: false,
                count: 3,
                start: false,
                errMaskShow: false,
                inviteMaskShow: false,
                noChangeMaskShow: false,
                successShow: false,
                confirmMaskShow: false,
                a: '',
                b: '',
                operator: '',
                result: '',
                is_right: false,
                questionNum: 1,
                period: 1,
                avatar: '',
                questions: null,
                gameId: '2',
                gameCount: 3,
                time: 0,
                toastShow: false,
                msg: '',
                token: '',
                errMsgShow: false,
                errMsg: '',
                answer: false,
                timestamp: 0,
                successMsg: '',
                isTitle: window.location.search.indexOf("title"),
                bugChanceFlag: true
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
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            },
            inviteMaskToShow(){
                this.errMaskShow = false
                this.noChangeMaskShow = false
                this.inviteMaskShow = true
            },
            watchADS(){
                window.AndroidWebView.openGoogleRewardAd();
            },
              facebookShare(){ 
               this.getAppToken()
                this.$http({
                    url: '/api/generate/invitation_code',
                    method: 'post',
                    data: {
                        token: this.token,
                        channel: 'facebook'
                    }
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        window.AndroidWebView.shareFacebook(res.data.data.title,res.data.data.link);
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
         },
         whatsappShare(){
               this.getAppToken()
                   this.$http({
                    url: '/api/generate/invitation_code',
                    method: 'post',
                    data: {
                        token: this.token,
                        channel: 'whatsapp'
                    }
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        window.AndroidWebView.shareWhatsApp(res.data.data.title,res.data.data.link);
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
         },
            countDown(){
                    var timeout = setInterval(() => {
                        if(this.count > 1){
                    this.count = this.count - 1
                    // if(this.count == 0){
                    //     this.$refs.num.innerHTML = "<span class='start-text'>开 始</span>"
                    // }
                        }else{
                            this.start = true
                            clearInterval(timeout)
                }
                },1000)
            },
            proccessActive(time){
                 clearTimeout(timeout1)
                 clearTimeout(timeout2)
                  
                        
                        document.querySelector("#circle").setAttribute("stroke-dasharray", "0,10000");
                        document.querySelector("#circle").style.transition = 'all 0s ease'
                      
                    
                               
                    // document.querySelector(".proccess-ing").style.width = '100%'
                var timeout1= setTimeout(() => {
                    document.querySelector("#circle").style.transition = 'all '+time+'s ease'
                    document.querySelector("#circle").setAttribute("stroke-dasharray", "200,10000");
                
                },50);
                let t = (time)*1000;
                var timeout2 = setTimeout(() => {
                    let t_str = (new Date).getTime() - this.timestamp
                    // if(this.$refs.bar.style.width == "0px" && t_str > time*1000){
                    //     this.answerErr()
                    // }
                     if(document.querySelector("#circle").getAttribute("stroke-dasharray") == "200,10000" && t_str > time*1000){
                         this.answerErr()
                     }
                },t-100)
               
            },
            closeErrMask(){
                this.errMaskShow = false
            },
            showErrMask(){
                this.errMaskShow = true
            },
            setData(){
                this.a = this.questions[this.questionNum - 1].arithmetic_number_first
                this.b = this.questions[this.questionNum - 1].arithmetic_number_second
                this.operator = this.questions[this.questionNum - 1].operator
                this.result = this.questions[this.questionNum - 1].result
                this.questionNum = this.questions[this.questionNum - 1].number
                this.is_right = this.questions[this.questionNum - 1].if_right
                this.time = this.questions[this.questionNum - 1].answer_time
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
             toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
                },

            toMD5(gameId,ifWin,period,token){
                
                return md5("gameId="+gameId+"&ifWin="+ifWin+"&period="+period+"&token="+token+"&key=cangque666").toUpperCase()
                },
            successAjax(){
                 this.getAppToken()
                 this.$http({
                url: '/game/record/result?token='+this.token+'&gameId='+this.gameId+'&period='+this.period+'&ifWin=1&sign='+this.toMD5(this.gameId,1,this.period,this.token)+'&t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.successShow = true
                       this.successMsg = res.data.data.popInfo
                }else  {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            nextQustion(item){
                    this.timestamp = (new Date()).getTime()
                if(parseInt(this.is_right) == item){
                    if(this.questionNum <= this.questions.length - 1){
                        this.questionNum++
                        this.setData()
                        this.proccessActive(this.time)
                        // this.answerFlag = true
                    }else{
                        this.successAjax()
                    }
                    
                }else{
                    document.getElementById("plus").addEventListener("click",function(e){
                        e.preventDefault()
                    },false)
                    document.getElementById("subtraction").addEventListener("click",function(e){
                        e.preventDefault()
                    },false)
                    this.answerErr()
                }
                
               
            },
            restart(){
                // this.$router.go(0)
                // window.location.reload()
                this.$router.push("/game")
            },
            answerErr(){
                this.getAppToken();
                this.$http({
                url: '/game/record/result?token='+this.token+'&gameId='+this.gameId+'&period='+this.period+'&ifWin=0&sign='+this.toMD5(this.gameId,0,this.period,this.token)+'&t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        // document.getElementById("plus").addEventListener("click",this.nextQustion(),false)
                        // document.getElementById("subtraction").addEventListener("click",this.nextQustion(),false)
                        this.gameCount = res.data.data.chance 
                        if(res.data.data.chance){
                            this.errMaskShow = true
                        }else{
                            this.noChangeMaskShow = true
                        }
                }else  {
                   this.errMsgShow = true
                   this.errMsg = res.data.status.message
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            rechargeCoin(){
                   this.noChangeMaskShow = false
                   this.confirmMaskShow = true 
            },
            confirmRechargeCoin(){
                    this.getAppToken();
                    if(!this.bugChanceFlag) {
                        return false;
                    }
                    this.bugChanceFlag = false
                    this.$http({
                    url: '/game/buy/chance?token='+this.token+'&gameId='+this.gameId+'&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    this.bugChanceFlag = true
                    if (res.data.status.code == 200) {
                        // this.$router.go(0)
                        this.$router.push('/game?t='+(new Date()).getTime()+''+(this.isTitle > -1 ?'&title=1':''))
                }else {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            cancelRechargeCoin(){
                this.$router.push("/game?t="+(new Date()).getTime()+""+(this.isTitle > -1 ? "&title=1":""))
            },
            getData(){
                this.$http({
                url: '/game/get/question?token='+this.token+'&gameId='+this.gameId+'&t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    let data = res.data.data;
                    if (res.data.status.code == 200) {
                        this.gameId = data.gameId
                        this.period = data.period
                        this.avatar = data.avatar
                        this.questions = data.list
                        this.setData()
                }else if (res.data.status.code == 2105) {
                        this.noChangeMaskShow = true
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
        },
        mounted(){
            // this.token = this.getQueryString("token");
            //  this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
             this.getAppToken();
            this.countDown();
           // document.querySelector(".start-num").className = "animation start-num"
            this.getData();
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>