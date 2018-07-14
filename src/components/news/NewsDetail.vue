<template>
<div class="news-detail-container">
    <BHeader title="" />
    <Loading v-if="!data" />
    <div class="news-cont last-child" v-if="data">
       
        <div class="comment-user-sec">
            <div class="comment-pic-box">
                <img class="" :src="data.comment.avatar" />
            </div>
            <div class="comment-user-name">
                <p class="name">{{data.comment.username}}</p>
                <p class="date">{{data.comment.create_time}}</p>
            </div>
            <div class="zan-right" :class="[isLike?'active':'']" @click="toLike()">
                <i class="icon-comment-zan"></i>
                <span>{{likeCount}}</span>
            </div>
        </div>
        <div class="comment-text" @click="replyComment()">
            {{data.comment.content}}
        </div>
        <div class="comment-sec">
            <p v-for="(item,index) of data.comment_reply" :key="index">
                <span @click="replyComment(item.from_user_id,item.to_username)">{{item.from_username}}</span><span v-if="item.to_username"  class="reply">Balas</span><span @click="replyComment(item.from_user_id,item.to_username)">{{item.to_username}}</span>: {{item.content}}</p>
             <!-- <p><span>sss&ee</span><span class="reply">Balas</span><span>Rika</span>: wwewe wewe wewe we wewewewewewewewe</p> -->
             <p class="comment-more">Lihat semua </p>
        </div>
    </div>

    <div class="fixed-comment" v-if="data">
        <input readonly ref="replyInput" class="comment-input"  @click="toComment()" :placeholder="holder" /> 
    </div>
    <div>

  <div class="reply-mask" @click="replyMaskHide($event)" :class="[ replyMask? 'show':'hide']">
        <div class="reply-cont">
            <p class="reply-mask-title"><span class="left" @click="cancelMaskShow()">Batal</span><span class="right" @click="submitComment()">Kirim</span></p>
            <textarea ref='textarea' autofocus maxlength="1000" v-model="ctext" placeholder="Komentar..." />
        </div>
    </div>


    </div>
</div>
</template>
<script>
import Loading from '../Loading'
import BHeader from '../common/BHeader'
let Base64 = require('js-base64').Base64;

    export default {
        name: 'NewsDetail',
        data(){
            return {
                data: null,
                isLike: false,
                likeCount: 0,
                from_id: '',
                reply:[],
                token: '',
                ctext:'',
                replyMask: false,
                holder: 'Balas:'
            }
        },
        components: {
           Loading,
           BHeader
        },
        props: {
            title: String
        },
        methods: {
            toComment(){
                this.replyMask = true
            },
            replyMaskHide(e){
                if(e.target.className.indexOf("reply-mask") > -1){
                    this.replyMask = false
                }
            },
            cancelMaskShow(){
                this.replyMask = false
            },
              getToken(){
                if(this.getparam("uAgent")){
                    let content=window.AndroidWebView.getAppToken()
                    let token = Base64.decode(content)
                    return token
                }else{
                    return  ''
                }
            },
            toLike(){
                  if(this.isLike) {
                    this.isLike = false
                    this.likeCount --
                }else {
                    this.isLike = true
                    this.likeCount ++
                }
               this.$http({
                url: '/api/comment/like',
                method: 'post',
                data:{
                    token: this.getToken(),
                    // token: '',
                    comment_id: this.getparam("cid"),
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
               
              
            }
            }).catch((res) => {
                console.log('error: ', res);
            });
            },
          getparam(name){
            let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
            if(reg.test(window.location.href)){
                return unescape(RegExp.$2.replace(/\+/g," "))
            }
            return undefined
            },
          replyComment(id,name){
                this.$refs.replyInput.focus()
                this.$refs.textarea.focus()
                this.holder = "Balas: "+name
                if(id){
                    this.from_id = id
                }
          },
          submitComment(e){
              if(this.ctext){
            this.$http({
                url: '/api/comment/submit',
                method: 'post',
                data:{
                    token: this.getToken(), 
                    // token:'',
                    comment_id: this.getparam("cid"),
                    to_user_id: this.from_id,
                    content: this.ctext
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                this.data.comment_reply.push(res.data.data.current.data)
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
              }else{
                  window.AndroidWebView.showContent('Komentar Tidak boleh Kosong');
              }
              
          },
          dealWithTitle(text){
              let str = ''
              if(text.length > 80) {
                 str = text.substring(0,80)+"..."
              }else {
                  str = text
              }
            return str
         }
        },
      
        mounted(){
            this.$http({
                url: '/api/comment/replyList?cid='+this.getparam("cid"),
                method: 'get',
            }).then((res) => {
            if (res.data.status.code == 200) {
            this.data = res.data.data
            this.likeCount = res.data.data.comment.like_count
            this.isLike = res.data.data.comment.like_active
            this.holder = 'Balas: '+ res.data.data.comment.username
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
        }
    }
</script>
<style>
a {
    text-decoration: none;
}
.header {
    box-shadow: 0 0 1px 1px rgba(255, 192, 0, 0.1)
}
body{
    margin: 0;
    background: #fff!important;
}

.news-detail-container{
    padding-bottom: 40px;
}

.news-cont {
    border-bottom: 10px solid #f5f5f5;
}

.news-cont.last-child {
    border-bottom: none;
    margin-bottom: 70px!important;
}

.text-sec {
    text-align: center
}

.text-sec img {
    width: 100%;
}

.text-sec p {
    color: #333333;
    font-size: 16px;
    margin-bottom: 20px;
    width: 92%;
    margin: 15px auto;
    line-height: 1.5;
    text-align: left;
}

.like-sec {
    text-align: center;
}

.like-num-sec {
    color: #333333;
    font-size: 17px;
    margin: 0 0 12px 0;
    line-height: 1.5;
}

.like-num-sec span {
    display: inline-block;
    margin: 0 35px;
    width: 50px;
}
.recommend-tilte {
    font-size: 17px;
    color: #333333;
    font-family: bold;
    width: 92%;
    margin: 12px auto 0 auto;
    font-weight: bold;
}

.news-items {
    list-style: none;
    padding: 0;
    width: 92%;
    margin: 0 auto 12px auto;
}

.news-items li {
    overflow: hidden;
    border-bottom: 1px solid #dddddd;
    padding: 10px 0;
}

.news-items li:last-child{
    border-bottom: none;
    padding-bottom: 0;
}

.media-left {
    width: 60%;
    float: left;
    color: #333333;
    font-size: 16px;
}

.media-left.full {
    width: 100%;
}

.media-left p {
    margin: 0;
    line-height: 1.5;
}

.media-left .title {
    height: 70px;
    overflow: hidden;
}

.media-right {
    width: 125px;
    height: 95px;
    float: right;
    overflow: hidden;
    margin-top: 5px;
}

.media-right img {
    /* width: 100%; */
}

.news-item-date {
    color: #999999;
    font-size: 14px;
    margin: 8px 0!important;
}

.comment-pic-box {
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 100%;
    float: left;
}

.comment-pic-box img {
    width: 100%;
}

.comment-user-sec {
    width: 92%;
    margin: 10px auto;
    overflow: hidden;
}

.comment-user-name {
    width: 50%;
    float: left;
}

.comment-user-name .name {
    margin: 0 10px 0 10px;
    color: #333333;
    font-size: 16px;
}

.comment-user-name .date {
    margin: 5px 10px 0 10px;
    color: #999;
    font-size: 14px;
}

.zan-right {
    float: right;
    margin-top: 15px;
}

.zan-right.active .icon-comment-zan{
    display: inline-block;
    width: 17px;
    height: 16px;
    background: url(../../assets/images/icon-comment-active-zan.png) no-repeat center;
    background-size: 17px 16px;
    animation: move 0.2s ease-in-out;
}

@keyframes move {
    from {
            transform: scale(1);
            transform: rotate(-30deg)
        }
    to {
            transform: scale(1.1);
            transform: rotate(10deg)
        }
}

.zan-right.active span {
    color: #ffc000;
}

.icon-comment-zan {
    display: inline-block;
    width: 17px;
    height: 16px;
    background: url(../../assets/images/icon-comment-zan.png) no-repeat center;
    background-size: 17px 16px;
    /* animation: move 0.2s ease-in-out; */
}

.comment-text {
    font-size: 16px;
    color: #333333;
    margin-left: 63px;
    margin-right: 20px;
    line-height: 1.5;
    width: 80%;
    word-break: break-word;
}

.comment-sec {
    background: #f5f5f5;
    border-radius: 5px;
    margin-left: 60px;
    margin-right: 20px;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 20px;
}

.comment-sec p {
    margin: 0 5px;
    line-height: 1.5;
    color: #666;
    font-size: 14px;
}

.comment-sec span {
    color: #619cff;
}

.comment-sec .reply {
    color: #333333;
    margin: 0 5px;
}
.comment-more {
    color: #999999!important;
    border-top: 1px solid #dddddd;
    margin: 10px 0 5px 0!important;
    padding-top: 8px;
    font-size: 14px;
}

.icon-comment-more {
    display: inline-block;
    height: 12px;
    width: 8px;
    background: url(../../assets/images/icon-comment-more.png) no-repeat center;
    background-size: 8px 12px;
    vertical-align: middle;
}

.fixed-comment {
    position: fixed;
    left: 0;
    right: 0;
    height: 50px;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #eeeeee;
    text-align: center;
}

.comment-input {
    height: 30px;
    background: #f5f5f5;
    border-radius: 25px;
    border: none;
    margin: 10px auto!important;
    padding: 0 15px;
    width: 90%;
    box-sizing: border-box;
}

::-webkit-input-placeholder {
    color: #ddd;
    font-size: 14px;
}

.comment-msg {
    position: relative;
    margin: 0 25px 0 20px
}

.comment-msg .num {
    color: #619cff;
    font-size: 14px;
    position: absolute;
    right: 0;
    top: -5px;
}

</style>