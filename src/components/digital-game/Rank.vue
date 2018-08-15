<template> 
<div>
<div class="rank-container">
<BHeader title="Riwayat Menang"  />
<Loading v-if="!data" />
    <div class="rank-panel" v-if="!defaultShow && data">
        <img class="rank-title" src="../../assets/images/rank-title.png">
        <p class="rank-data-title">
        <span class="left">Peringkat</span>
        <span class="center">Nama</span>
        <span class="right">jumlah saldo</span></p>
        <ul class="rank-ul" v-if="data">
            <li v-for="(item,index) of data" :key="index">
            <span class="left" v-if="item.rank == 1"><img src="../../assets/images/icon-one.png" /></span>
            <span class="left" v-else-if="item.rank == 2"><img src="../../assets/images/icon-two.png" /></span>
            <span class="left" v-else-if="item.rank == 3"><img src="../../assets/images/icon-three.png" /></span>
            <span class="left" v-else>{{item.rank}}</span>
            <span class="center"><span class="rank-head-box">
                <img v-if="item.avatar" :src="item.avatar" /> 
                <img v-if="!item.avatar" src="../../assets/images/rank-default.png" />
                </span>{{item.mobile}}</span>
            <span class="right">Rp.{{item.total_win_money}}</span></li>
        </ul>
    </div>
    <div class="game-dafault" v-if="defaultShow">
        <img class="" src="../../assets/images/game-default-pic.png">
        <p class="default-text">“ Sementara tidak ada konten ”</p>
    </div>
</div>

<div class="footer-data" v-if="myData">
            <span class="left">{{myData.rank}}</span>
            <span class="center"><span class="rank-head-box">
                 <img v-if="myData.avatar" :src="myData.avatar" /> 
                <img v-if="!myData.avatar" src="../../assets/images/rank-default.png" />
                </span>{{myData.mobile}}</span>
            <span class="right">Rp.{{myData.total_win_money}}</span>
</div>




</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
import avatar from "../../assets/images/rank-default.png"
let Base64 = require('js-base64').Base64

    export default {
        name: 'Rank',
        components: {
           BHeader,
           Loading
        },
        data(){
            return {
                ruleMask: false,
                data: null,
                myData: null,
                token: '',
                isTitle: window.location.search.indexOf("title"),
                defaultShow: false
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
            getData(){
               this.$http({
                    url: '/game/get/rank?token='+this.token+'&gameId=2&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data.list
                       if(!this.data.length){
                            this.defaultShow = true
                       }
                       this.myData = res.data.data.self
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            
            },
            closeRuleMask(){
                this.ruleMask = false
            },
             showRuleMask(){
                this.ruleMask = true
            }
        },
        mounted(){
            // this.token = this.getQueryString("token")
            // this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
            this.getAppToken()
            this.getData()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>