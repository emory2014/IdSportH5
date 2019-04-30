<template>
<div class="vip-container background">
<BHeader  title="Penarikan" vip={true} />
 <Loading v-if="!data" /> 
<ul v-if="data" class="wd-record-ul">
    <li :class="themeChoice(item.status)" v-for="(item,index) of data.history" :key="index">
        <div>
            <span>Jumlah penarikan</span>
            <span class="money">+{{item.total_amount|thousands}}</span> 
            <span class="name" :class="[item.status == 'Berhasil'?'success':'']">{{item.status}}</span>
        </div>
        <p>Nama：<span>{{item.username}}</span></p>
        <p>Nama bank：<span>{{item.bank_code}}</span></p>
        <p>Nomor kartu bank：<span>{{item.card_no}}</span></p>
        <p>Waktu：<span>{{item.create_time}}</span></p>
        <p v-if="item.status == 'Gagal'">Saran: <span class="wd-detail">{{item.comment}}</span></p>
    </li>
    
</ul> 

<div :class="[defaultShow ? 'show':'hide']" class="vip-record-default">
    <!-- <img src="../../assets/images/vip/vip-default-pic.png" /> -->
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
            this.token = this.getAppToken();
              this.$http({
                url: '/api/user/redeem/history?t='+(new Date()).getTime(),
                method: 'post',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                        token: this.token,
                        type: 3,
                        page:page
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                    }],
                }).then((res) => {
                   
                    if (res.data.status.code == 200) {
                        this.data = res.data.data
                        this.totalPage = res.data.data.page_info.total_page
                        this.currentPage = res.data.data.page_info.current_page

                        if(!this.data.history.length){
                            this.defaultShow = true
                        }else{
                            this.defaultShow = false
                        }
                        
                }else if (res.data.status.code == 401) {
                        
                    }else{
                        this.toastPop(res.data.status.message)
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
<style scoped>
    .vip-record-default {
        padding-top: 270px;
        color:#999999;
        font-size: 14px;
    }
    .background {
       background-color: rgb(248, 248, 248);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        }
</style>

