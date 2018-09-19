<template>
    <div class="follow-container">
        <BHeader title="Yang Saya Ikuti" backToApp={true} />
        <ul class="my-follow-ul" v-if="list.length">
            <li v-for="(item,index) of list" :key="index" :id="'follow_'+item.follow_user_id">
                <div class="avatar-box" @click="toFollowList(item.follow_user_id)">
                    <img :src="item.avatar" />
                </div>
                <span class="name">{{item.username}}</span>
                <img v-if="item.gender == 1" src="../../assets/images/male@2x.png" class="gender" />
                <img v-else-if="item.gender == 2" src="../../assets/images/female@2x.png" class="gender" />
               
                <span class="follow-btn" @click="cancelFollow(item.follow_user_id)">Berhenti Ikut</span>
            </li>
           
        </ul>
        <div class="follow-default" v-if="!totalPage">
            <img src="../../assets/images/recharge/recharge-default.png" />
            <p>“ Belum ada orang yang diikuti ”</p>
            <div class="follow-btn-large" @click="backToFollow()">Lihat Goretan</div>
        </div>
    </div>
</template>
<script>
import BHeader from "../common/BHeader"
import md5 from 'js-md5'
    export default {
        name: "MyFollow",
        components: {
            BHeader
        },
        data(){
            return {
                data: null,
                page: 1,
                list: [],
                totalPage: 1,
                currentPage: 1,
            }
        },
        methods:{
            toFollowList(id){
             window.AndroidWebView.gotoTopicDetail(id)
            },
             scrollGetData(){
              let _this = this;
               window.addEventListener('scroll',function(){  
                if(document.body.scrollTop + window.innerHeight <= document.body.offsetHeight) {  
                    // console.log(sw);  
                    // 如果开关打开则加载数据  
                    if(_this.flag == true){  
                        // 将开关关闭  
                        _this.flag = false;  
                        _this.page = _this.page + 1
                        if(_this.currentPage < _this.totalPage){
                             _this.getData()
                        }    
                    }  
                }  
            });  
          },
          backToFollow(){
              window.AndroidWebView.closeActivities()
              window.AndroidWebView.gotoTopics()
          },
             getData(){
                this.$http({
                url: '/post/myfollow?t='+(new Date()).getTime(),
                method: 'post',
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                   token: this.getAppToken(),
                   page: this.page
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
                         res.data.data.list.map((item) => {
                                this.list.push(item)
                        })
                       this.currentPage = res.data.data.page_info.current_page
                       this.totalPage = res.data.data.page_info.total_page
                        
                }else if (res.data.status.code == 401) {
                        
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
        },
        toMD5(id){
            return md5("followUserId="+id+"&time="+(new Date).getTime()+"&token="+this.getAppToken()+"&key=cangque666").toUpperCase()
        },
        cancelFollow(id){
             this.$http({
                url: '/post/unfollow/user?t='+(new Date()).getTime(),
                method: 'post',
                headers:{
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data:{
                   token: this.getAppToken(),
                   time: (new Date).getTime(),
                   followUserId: id,
                   sign: this.toMD5(id)
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
                      
                      document.querySelector("#follow_"+id).remove()
                        
                }else if (res.data.status.code == 401) {
                        
                    }else{
                        window.AndroidWebView.showContent(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
        }
        },
     
        mounted() {
            
          this.getData()
          this.scrollGetData()
             
        }
    }
</script>
<style>
@import "../../assets/css/post.css";
</style>
