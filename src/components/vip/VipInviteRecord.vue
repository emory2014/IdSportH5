<template>
<div class="vip-container">
<BHeader  title="Undangan Member Saya" vip={true} />
<!-- <Loading v-if="!data" /> -->
<div class="vip-invite-record" v-if="info">
    <p class="num"><span>Rp.</span>{{info.vip_bonus|thousands}}</p>
    <p class="text">Jumlah uang dari undangan member (Rp)</p>
    <div class="item">
        <p>{{info.today_vip_total_number|thousands}}
            <span>orang</span>
        </p>
        <span>Undangan Member Hari Ini </span>
    </div>
    <div class="item">
        <p>{{info.vip_total_number|thousands}}
            <span>orang</span>
        </p>
        <span>Jumlah Undangan Member </span>
    </div>
</div>

<!-- <p  :class="[defaultShow?'show':'hide']" class="vip-default-text">Sementara tidak ada konten</p> -->
<ul class="vip-invite-record-ul" v-if="data">
    <li>
        <span class="name">Nama</span>
        <span class="rp">Bonus saya (Rp.)</span>
        <span class="date">Wakut</span>
    </li>
    <li v-for="(item,index) of data" :key="index">
        <span class="name">{{item.username}}</span>
        <span class="rp">{{item.prize_money}}</span>
        <span class="date">{{item.create_time}}</span>
    </li>
</ul>
<div v-if="defaultShow" class="vip-default-text">
    <img src="../../assets/images/vip/noVipRecord.png" />
    <p>Sementara tidak ada konten</p>
</div>
</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64

    export default {
        name: 'VipInviteRecord',
         components: {
           BHeader,
           Loading
        },
        data(){
            return {
            info: null,
            data: null,
            msg: '',
            defaultShow: false,
            token: '',
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
              this.token = this.getAppToken()
              this.$http({
                url: '/api/vip/invitee/prizelist?t='+(new Date()).getTime(),
                method: 'post',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                        token: this.token,
                        type: 3,
                        page:page
                    },
                    // transformRequest: [function (data) {
                    //     let ret = ''
                    //     for (let it in data) {
                    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    // }
                    // return ret
                    // }],
                }).then((res) => {

                    if (res.data.status.code == 200) {
                        this.data = res.data.data.list
                        if(!this.data.length){
                            this.defaultShow = true
                        }
                        this.totalPage = res.data.data.page_info.total_page
                        this.currentPage = res.data.data.page_info.current_page

                }else if (res.data.status.code == 401) {

                    }else{
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
        },
           mounted(){
            this.token = this.getAppToken()
              this.$http({
                url: '/api/vip/invitee/info?t='+(new Date()).getTime(),
                  method: 'post',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                        token: this.token,
                    },
                    // transformRequest: [function (data) {
                    //     let ret = ''
                    //     for (let it in data) {
                    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    // }
                    // return ret
                    // }],
                }).then((res) => {

                    if (res.data.status.code == 200) {
                        this.info = res.data.data


                }else if (res.data.status.code == 401) {

                    }else{
                        this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });

                this.getData(1)
        }
    }
</script>
<style>
    .vip-default-text{
        padding-top: 65px;
        text-align: center;
        color:#999999;
        font-size: 14px;
    }
    .vip-default-text img {
        width: 76px;
        height: 118px;
    }
</style>
<style>
    @import  "../../assets/css/vip.css";
</style>
