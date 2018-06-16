<template> 
<div>
<div class="rank-container">
<BHeader title="Riwayat Menang" v-if="isTitle > -1" />
<div class="default-sec hide">
    <img src="../../assets/images/award-detail-bg.png">
    <p>Sementara limit kosong</p>
</div>

<div class="rank-box" :class="[!defaultShow? 'show':'hide']">
 <div class="rank-panel detail">
        
        <p class="rank-data-title">
        <span class="left">Periode</span>
        <span class="center">Waktu</span>
        <span class="right">Limit</span></p>
        <ul class="rank-ul">
            <li v-for="(item,index) of data" :key="index">
                <span class="left">{{item.period}}</span>
                <span class="center">{{item.create_time}}</span>
                <span class="right">Rp.{{item.win_money}}</span></li>
            
        </ul>
    </div>
</div>


<div class="award-detail-box" :class="[defaultShow? 'show':'hide']">
    <img src="../../assets/images/award-detail-bg.png" />
</div>

</div>
</div>
</template>
<script>
import BHeader from "../common/BHeader"

    export default {
        name: 'AwardDetail',
        components: {
           BHeader
        },
        data(){
            return {
                ruleMask: false,
                data: [],
                totalPage: 1,
                currentPage: 1,
                flag: true,
                page: 1,
                token: '',
                isTitle: window.location.search.indexOf("title"),
                defaultShow: true
            }
        },
        methods: {
            getQueryString(name) { 
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
                var r = window.location.search.substr(1).match(reg); 
                if (r != null) return unescape(r[2]); 
                    return null; 
                } ,
            getData(page){
               this.$http({
                    url: 'http://test.jiajiahebao.com/game/success/record?token='+this.token+'&gameId=1&page='+page+'&t='+(new Date()).getTime(),
                    method: 'get',
                }).then((res) => {
                    this.flag = true;  
                    if (res.data.status.code == 200) {
                        if(res.data.data.result.length){
                            this.defaultShow = false
                        }else{
                            this.defaultShow = true
                        }
                        res.data.data.result.map((item) => {
                                this.data.push(item)
                        })
                       this.currentPage = res.data.data.currentPage
                       this.totalPage = res.data.data.totalPage
                }else  {
                   
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
                
                console.log(document.body.scrollTop + window.innerHeight)
                console.log(document.body.offsetHeight)
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
                       
                        // axios.get('http://localhost:3000/proxy?url=http://news.at.zhihu.com/api/4/news/before/20170608')  
                        //     .then(function(response){  
                        //         console.log(JSON.parse(response.data));  
                        //         // 将新获取的数据push到vue中的data，就会反应到视图中了  
                        //         JSON.parse(response.data).stories.forEach(function(val,index){  
                        //             _this.articles.push(val);  
                        //             // console.log(val);  
                        //         });  
                        //         // 数据更新完毕，将开关打开  
                        //         sw = true;  
                        //     })  
                        //     .catch(function(error){  
                        //         console.log(error);  
                        //     });     
                    }  
                }  
            });  
          }
        },
        mounted(){
            this.token = this.getQueryString("token")
            this.getData(1)
            this.scrollGetData()
        }
    }
</script>
<style>
    @import  "../../assets/css/game.css";
</style>