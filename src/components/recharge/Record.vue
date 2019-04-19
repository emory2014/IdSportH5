<template>
<div class="vip-container">
<BHeader  title="Riwayat Transaksi" vip={true} />
 <Loading v-if="!data" /> 
<ul v-if="data" class="wd-record-ul">
    <li :class="themeChoice(item.status)" v-for="(item,index) of data.history" :key="index">
        <p>Nama：{{item.username}}</p>
        <p>Nama bank：{{item.bank_code}}</p>
        <p>Nomor kartu bank：{{item.card_no}}</p>
        <p>Jumlah penarikan：Rp.{{item.total_amount}}</p>
        <p>Status pemrosesan：{{item.status}}</p>
        <p>Waktu：{{item.create_time}}</p>
        <p v-if="item.status == 'Gagal'">Saran: <span class="wd-detail">{{item.comment}}</span></p>
    </li>
    
</ul> 

<div :class="[defaultShow ? 'show':'hide']" class="vip-record-default">
    <img src="../../assets/images/vip/vip-default-pic.png" />
    <p>“ Sementara tidak ada konten ”</p>
</div>

</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64

    export default {
        name: 'WDRecord',
         components: {
           BHeader,
           Loading
        },
        data(){
            return {
            data: null,
            msg: '',
            defaultShow: false,
            loading: false,
            totalPage: 1,
            currentPage: 1,
            flag: true,
            page: 1,
            }
        },
        props: {
            title: String
        },
        methods: {
          goBack(){
                window.history.go(-1)
        },
         getAppToken(){
            var content=window.AndroidWebView.getAppToken();
            var token = Base64.decode(content)
            this.token = token
            },
          toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
        },
        themeChoice(status){
            if(status == "Dalam proses"){
                return "yellow"
            }else if(status == "Gagal"){
                return "red"
            }else if(status == "Berhasil"){
                return "green"
            }
        },
           scrollGetData(){
              let _this = this;
               window.addEventListener('scroll',function(){
           
                // 判断是否滚动到底部

                if(document.body.scrollTop + window.innerHeight <= document.body.offsetHeight) {
                    // console.log(sw);
                    // 如果开关打开则加载数据
                    if(_this.flag == true){
                        // 将开关关闭
                        _this.flag = false;
                        _this.page ++;
                        if(_this.currentPage < _this.totalPage){
                             _this.getData(_this.page)
                        }
                    }
                }
            });
          },
          getData(page){
                // var content=window.AndroidWebView.getAppToken();
                var content = 'b10f1d9b43ea42c1bf78269c6b4499d0'
                let token = Base64.decode(content);
               this.$http({
                     url: '/api/recharge/history?t='+(new Date()).getTime(),
                    method: 'post',
                    data: {
                        token: token,
                        type: this.type,
                        page: page
                    }
                }).then((res) => {
                    this.flag = true;
                    this.loading = false
                    if (res.data.status.code == 200) {

                        res.data.data.data.map((item) => {
                                this.data.push(item)
                        })
                       this.currentPage = res.data.data.currentPage
                       this.totalPage = res.data.data.totalPage
                }else if(res.data.status.code == 401){
                  //window.AndroidWebView.closeActivities();
                    window.AndroidWebView.loginApp();
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            }
        },
           mounted(){
            this.getData(1)
            
        }
    }
</script>
<style>
@import  "../../assets/css/vip.css";
</style>