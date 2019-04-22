<template>
<div class="vip-container" style="padding-top:50px">
<BHeader  title="Riwayat Transaksi" vip={true} />
 <Loading v-if="!data" /> 
 <div v-if="data.length">
      <div class="task-record-panel" v-for="(item,index) of data" :key="index">
        <div class="title">
          <span class="koin">
              <span> Terbeli(Keping)</span>
              <span class="gold">&nbsp+{{item.gold|thousands}}</span>
         </span>
          <span v-if="item.status == 2">Gagal</span>
          <span v-else-if="item.status == 1" class="red">Berhasil</span>
          <span v-else-if="item.status == 0" >Dalam proses</span>
        </div>
        <!-- <p>Nama Tugas: <span class="bold">{{item.title}}</span> </p> -->
        <p>Isi UlangVia: <span class="bold">{{item.method}}</span></p>      
        <p>Isi Ulang(Rp): <span class="bold">{{item.amount|thousands}}</span></p>
        <p>Cara:<span class="bold">Top Up Member</span></p>
        <p>Waktu: <span class="bold">{{item.update_time}}</span></p>
      </div>

    </div>

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
            data: [],
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
            // this.token = 'c5c312847b1234d93417a47b314cd763'
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
                // var content=window.AndroidWebView.getAppToken(
                   
                // );
                // let token = Base64.decode(content);
                this.$http({
                     url: '/api/recharge/history?t='+(new Date()).getTime(),
                    method: 'post',
                    data: {
                        token:'c5c312847b1234d93417a47b314cd763',
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
        created(){
            this.getData(1)
        },
    }
</script>
<style>
    .koin{
        color:#999999;
        font-size: 12px;
    }
    .koin span:first-child {
        position: relative;
        top: -1px;
    }
    .gold{
        color: #333333;
        font-size: 16px;
    }
</style>
<style>
@import  "../../assets/css/task.css";
</style>