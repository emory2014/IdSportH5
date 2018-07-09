<template> 
<div>
<div class="process-container">
   <BHeader title="Bayar di Alfamart"  /> 
   <div class="tab-cont record">
       <div class="item" :class="[type == 'waiting'?'active':'']" @click="addClass('waiting')">Sedang proses</div>
       <div class="item" :class="[type == 'success'?'active':'']" @click="addClass('success')">Dalam Proses</div>
       <div class="item" :class="[type == 'failed'?'active':'']" @click="addClass('failed')"> Gagal</div>
   </div>
  <Loading v-if="loading" />
  <p class="record-no-data" v-if="!loading && !data.length">暂无数据</p>
  <div v-if="data.length">
    <div class="cont-panel record" v-for="(item,index) of data" :key="index">
        <div class="record-left">
            <span class="num">+{{item.amount}}</span>
            <span>Koin Terbeli (Keping)</span>
        </div>
        <div class="record-left text">
            <span>Isi Ulang Via: {{item.method}}  </span>
            <span>Isi Ulang (Rp): {{item.gold}}</span>
            <span>Waktu: {{item.update_time}}</span>
        </div>
        
    </div>

  </div>
</div>







</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64;


    export default {
        name: 'Record',
        components: {
           BHeader,
           Loading
        },
        data(){
            return {
                data: [],
                totalPage: 1,
                currentPage: 1,
                flag: true,
                page: 1,
                type: 'waiting',//success,failed
                loading: true
            }
        },
        methods: {
             getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
            addClass(type){
                this.type = type
                this.page = 1
                this.data = []
                this.getData(this.page)
            },
            getData(page){
                var content=window.AndroidWebView.getAppToken();
                let token = Base64.decode(content)
                window.AndroidWebView.showContent(token);
                window.AndroidWebView.showContent('/api/recharge/history?token='+token+'&type='+this.type+'&page='+page+'&t='(new Date()).getTime())
               this.$http({
                     url: '/api/recharge/history?token='+token+'&type='+this.type+'&page='+page+'&t='(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    this.flag = true;  
                    this.loading = false
                    if (res.data.status.code == 200) {
                      
                        res.data.data.data.map((item) => {
                                this.data.push(item)
                        })
                       this.currentPage = res.data.data.currentPage
                       this.totalPage = res.data.data.totalPage
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            scrollGetData(){
              let _this = this;
               window.addEventListener('scroll',function(){  
                // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
                // console.log(document.body.scrollTop); // 滚动高度  
                // console.log(document.body.offsetHeight); // 文档高度  
                // 判断是否滚动到底部  
       
                if(document.body.scrollTop + window.innerHeight <= document.body.offsetHeight) {  
                    // console.log(sw);  
                    // 如果开关打开则加载数据  
                    if(_this.flag == true){  
                        // 将开关关闭  
                        _this.flag = false;  
                        _this.page = _this.page + 1
                        if(_this.currentPage < _this.totalPage){
                             _this.getData(_this.page)
                        }  
                    }  
                }  
            });  
          }
        },
        mounted(){
            this.getData(1)
            this.scrollGetData()
        }
    }
</script>
<style>
    @import  "../../assets/css/recharge.css";
</style>