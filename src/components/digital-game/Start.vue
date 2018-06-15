<template> 
<div>
<div class="start-container">
    <div class="start-sec">
        <span class="num" ref="num" :class="[ !start ? 'show':'hide']">{{count}}</span>
        <div class="question-sec" :class="[ start ? 'show':'hide']">
            <p class="title">Periode {{period}}</p>
            <div class="proccess-bar-box">
                <div ref="bar" class="proccess-ing"></div>
            </div>
            <p class="text">Pertanyaan {{questionNum}}</p>
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
                        <p class="title">Anda Punya {{gameCount}} kali ksempatan</p>
                        <div class="mask-btn" @click="restart()">Coba Lagi</div>
                        <div class="mask-btn" @click="inviteMaskToShow()">Undang Teman Ikut Bermain</div>       
                    </div>
                </div>

                <div class="rule-mask " :class="[noChangeMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <p class="title">Anda Punya 0 kali ksempatan</p>
                        
                        <div class="mask-btn" @click="inviteMaskToShow()">Undang Teman Ikut Bermain</div>       
                        <div class="mask-btn" @click="rechargeCoin()">Tukarkan 100 koin emasmu untuk jawab pertanyaan</div>
                    </div>
                </div>

                 <div class="rule-mask " :class="[noChangeMaskShow? 'show':'hide']">
                    <div class="err-mask-cont cont">
                        <p class="title">Anda Pyakin mau tukarkan 100 koin Emas untuk menjawab peranyaan? </p>
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
                              
                            </div>
                    </div>
                </div>
    </div>

    <div class="rule-sec" :class="[ !start ? 'show':'hide']">
        <p>Peraturan main</p>
        <div>Menjawab 50 pertanyaan dengan benar akan <br/>
        mendapatkan total uang cash sebesar<br/> 10.000.000</div>
    </div>

    <div class="rule-mask ":class="[ successShow ? 'show':'hide']">
        <div class="success-mask-cont">
        <img class="icon-award" src="../../assets/images/icon-award.png" />
            <p class="title">Kamu jenius</p>
            <p class="text">Selamat Anda telah menjawab benar semua 
        pertanyaan, Anda akan mendapatkan bonus 
        sebesar Rp. 5000 Jam pengambilan bonus 
        paling terakhir jam 5 sore</p>
        <router-link :to="'/game?token=qwaseqa'+this.token+'&t='+(new Date()).getTime()"><div class="mask-btn">saya tahu</div></router-link>
        </div>
    </div>

    <div class="rule-mask" :class="[ errMsgShow ? 'show': 'hide']">
        <div class="success-mask-cont pt-30">
            {{errMsg}}
        </div>
    </div>
   

</div>
<p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import md5 from 'js-md5'

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
                questions: null,
                gameId: '',
                gameCount: 3,
                time: 0,
                toastShow: false,
                msg: '',
                token: '',
                errMsgShow: false,
                errMsg: '',
                answer: false,
                timestamp: 0,
            }
        },
        methods: {
           getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
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
                
                document.querySelector(".proccess-ing").style.transition = 'none'                
                    document.querySelector(".proccess-ing").style.width = '100%'
                setTimeout(() => {
                    document.querySelector(".proccess-ing").style.transition = 'width '+time+'s'
                    document.querySelector(".proccess-ing").style.width = '0'   
                },500);
                let t = (time+1)*1000;
                setTimeout(() => {
                    let t_str = (new Date).getTime() - this.timestamp
                    if(this.$refs.bar.style.width == "0px" && t_str > time*1000){
                        this.answerErr()
                    }
                },t)
               
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
                 this.$http({
                url: 'http://test.jiajiahebao.com/game/record/result?token='+this.token+'&gameId=1&period='+this.period+'&ifWin=1&sign='+this.toMD5(1,1,this.period,this.token)+'&t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.successShow = true
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
                window.location.reload()
            },
            answerErr(){
                this.$http({
                url: 'http://test.jiajiahebao.com/game/record/result?token='+this.token+'&gameId=1&period='+this.period+'&ifWin=0&sign='+this.toMD5(1,0,this.period,this.token)+'&t='+(new Date()).getTime(),
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
                    this.$http({
                    url: 'http://test.jiajiahebao.com/game/buy/chance?token='+this.token+'&gameId=1&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        this.$router.go(0)
                }else {
                   this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            cancelRechargeCoin(){
                this.$router.push("/game?token=ewaeaeu"+this.token+"&t="+(new Date()).getTime())
            },
            getData(){
                this.$http({
                url: 'http://test.jiajiahebao.com/game/get/question?token='+this.token+'&gameId=1&t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    let data = res.data.data;
                    if (res.data.status.code == 200) {
                        this.gameId = data.gameId
                        this.period = data.period
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
            this.token = this.getQueryString("token");
            this.countDown();
            this.getData()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>