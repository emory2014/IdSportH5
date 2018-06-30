<template>
<div class="news-detail-container">
    <Loading v-if="!data" />
    <div class="news-cont" v-if="data">
        <p id="title" class="news-title">
            {{data.article.title}}
        </p>
        <p class="date-sec">
            <span >{{data.article.create_time}}</span>
            <span class="text-right">Sumber: {{data.article.source}}</span>
        </p>
        <div class="text-sec" v-html="data.article.body">
        </div>
        <div class="like-sec">
            <i class="icon-zan" :class="[pickShow ? 'active':'']" @click="toPick()"></i>
            <i class="icon-cai" :class="[dissShow ? 'active':'']" @click="toDiss()"></i>
            <p class="like-num-sec">
                <span @click="toPick()" :class="[pickShow ? 'active':'']">{{pick}}</span>
                <span @click="toDiss()" :class="[dissShow ? 'active':'']">{{diss}}</span>
            </p>
        </div>
    </div>


    <div class="news-cont " v-if="data && data.recommends.length">
        <p class="recommend-tilte">Terkait Rekomendasi</p>
        <ul class="news-items">
            <li class="news-item" v-for="(item,index) of data.recommends" :key="index">
                <div class="media-left" :class="[item.images.length ? '':'full']">
                    <p class="title">
                        {{dealWithTitle(item.title)}}
                    </p>
                    <p class="news-item-date"> {{item.author}}</p>
                </div>
                <div class="media-right" v-if="item.images.length">
                    <img class="img" @load="dealWithImg($event)"  :src="item.images[0]" />
                </div>
            </li>
           
        </ul>
    </div>

    <div class="news-cont last-child" v-if="data">
        <p class="recommend-tilte">Latest Comments</p>
        <div class="comment-user-sec">
            <div class="comment-pic-box">
                <img class="" src="../../assets/images/header.png" />
            </div>
            <div class="comment-user-name">
                <p class="name">Wintersweet</p>
                <p class="date">05-30 16:00</p>
            </div>
            <div class="zan-right" :class="[isLike?'active':'']" @click="toLike()">
                <i class="icon-comment-zan"></i>
                <span>{{commentLike}}</span>
            </div>
        </div>
        <div class="comment-text">
            Yang mengalami depresiasi itu tidak hanya rupiah, jadi semua negara berpikir yang sama saat ini. Jadi kalau kita berfikir wah rupiah murah, 
            itu ya orang Thailand juga berpikir bath juga murah," jelasnya.
        </div>
        <div class="comment-sec">
            <p><span>sss&ee</span>: wwewe wewe wewe we we we wewewewewewewewe</p>
             <p><span>sss&ee</span><span class="reply">Balas</span><span>Rika</span>: wwewe wewe wewe we wewewewewewewewe</p>
             <router-link :to="'/news-detail?aid='+ data.article.id "> <p class="comment-more">Lihat semua 10 ulasan <i class="icon-comment-more"></i></p></router-link>
        </div>
    </div>

    <div class="fixed-comment" v-if="data">
        <input class="comment-input" v-model="commentText" @keyup.enter="submitComment()" placeholder="Komentar…" /> 
        <a href="#title"><span class="comment-msg">
            <i class="icon-msg"></i>
            <span class="num">68</span>
        </span>
        </a>
        <i @click="sharePop()" class="icon-export"></i>
    </div>
    <div class="share-pop" :class="[maskShow ? 'show':'hide']" @click="popShow($event)">
        <div class="share-cont" >
            <p class="share-title">分享</p>
            <i class="icon-facebook"></i>
            <i class="icon-whatsapp"></i>
            <p class="share-text"><span>Facebook邀请</span><span>WhatsApp邀请</span></p>
        </div>
    </div>
    <div>

    </div>
</div>
</template>
<script>
import Loading from '../Loading'
import Toast from '../common/Toast'

    export default {
        name: 'News',
        data(){
            return {
                data: null,
                isLike: false,
                pick: 0,
                diss: 0,
                pickShow: false,
                dissShow: false,
                commentLike: 0,
                commentText:'',
                maskShow: false
            }
        },
        components: {
           Loading,
           Toast
        },
        props: {
            title: String
        },
        methods: {
            popShow(e){
                if(e.target.className.indexOf("share-pop") > -1 ){
                    this.maskShow = false
                }else{
                    this.maskShow = true
                }
            },
            sharePop(){
                this.maskShow = true
            },
            toLike(){
                this.$http({
                url: '/api/comment//like',
                method: 'post',
                data:{
                    // token: window.AndroidWebView.getAppToken(),
                    token: '',
                    comment_id: 1,
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                 if(this.isLike) {
                    this.isLike = false
                    this.commentLike --
                }else {
                    this.isLike = true
                    this.commentLike ++
                }
              
            }
            }).catch((res) => {
                console.log('error: ', res);
            });
            },

            toPick(){
                 if(this.pickShow) {
                    this.pickShow = false
                    this.ajaxNewsLike(1,2)
                }else {
                    this.pickShow = true
                    this.ajaxNewsLike(1,1)
                    if(this.dissShow) {
                        this.dissShow = false
                        this.ajaxNewsLike(2,1)
                    }
                }
            },
            ajaxNewsLike(type,action){
             this.$http({
                url: '/api/article/like',
                method: 'post',
                data:{
                    aid: parseInt(this.getparam("aid")),
                    // token: window.AndroidWebView.getAppToken(),
                    token:'',
                    type: type,
                    action: action
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                if(type == 1) {
                    if(action == 1) {
                        this.pick ++
                    }else{
                        this.pick --
                    }
                    
                }else{
                      if(action == 1) {
                        this.diss ++
                    }else{
                        this.diss --
                    }
                    
                }
            }
            }).catch((res) => {
                console.log('error: ', res);
            });
            },
            toDiss(){
                 if(this.dissShow) {
                    this.dissShow = false
                    this.ajaxNewsLike(2,2)
                }else {
                    this.dissShow = true
                    this.ajaxNewsLike(2,1)
                    if(this.pickShow){
                        this.pickShow = false
                        this.ajaxNewsLike(1,2)
                    }
                }
            },
          getparam(name){
            let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)","i");
            if(reg.test(window.location.href)){
                return unescape(RegExp.$2.replace(/\+/g," "))
            }
            return undefined
            },
          dealWithImg(e){
            let img = e.currentTarget
            let my_retio = 125/95
            let retio = img.width/img.height
            if(retio > my_retio) {
                img.style.height = '100%'
            }else{
                img.style.width = '100%'
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
         },
         submitComment(){
             if(this.commentText){
                 this.$http({
                url: '/api/comment/submit',
                method: 'post',
                data:{
                    // token: window.AndroidWebView.getAppToken, 
                    token:'',
                    comment_id: 1,
                    aid: this.getparam("aid"),
                    content: this.commentText
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
           
            
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
             }else{
                window.AndroidWebView.showContent("请填写内容")
             }
              
         }
        },
      
        mounted(){
            this.$http({
                url: '/article/detail?aid='+this.getparam("aid"),
                method: 'get',
            }).then((res) => {
            if (res.data.status.code == 200) {
            this.data = res.data.data
            this.pick = res.data.data.article.like 
            this.diss = res.data.data.article.dislike
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
body{
    margin: 0;
}

.hide{
    display: none;
}

.show{
    display: block;
}

.news-title {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    text-align: left;
    width: 92%;
    margin: 15px auto;
}
.date-sec {
    font-size: 14px;
    color: #999999;
    width: 92%;
    margin: 15px auto;
}

.text-right {
    float: right;
}
.news-cont {
    border-bottom: 10px solid #f5f5f5;
}

.news-cont.last-child {
    border-bottom: none;
    margin-bottom: 70px!important;
}


.no-border {
    border-bottom: none;
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
.icon-zan, .icon-cai {
    display: inline-block;
    width: 50px;
    height: 50px;
    
}

.icon-zan {
    background: url(../../assets/images/icon-zan.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
}

.icon-zan.active {
    background: url(../../assets/images/icon-zan-active.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
    animation: scale 0.2s ease;
}


.icon-cai {
    background: url(../../assets/images/icon-cai.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
   
}

.icon-cai.active {
    background: url(../../assets/images/icon-cai-active.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
    animation: scale 0.2s ease;
   
}

@keyframes scale {
        from {
            transform: scale(1);
        }
    to {
            transform: scale(1.1);
        }
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
    color: #333333;
}

.like-num-sec span.active {
    color: #ffc000
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
    margin-left: 60px;
    margin-right: 20px;
    line-height: 1.5;
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
}

.icon-msg {
    display: inline-block;
    height: 20px;
    width: 22px;
    background: url(../../assets/images/icon-msg.png) no-repeat center;
    background-size: 20px 20px;
    vertical-align: middle;
    
}

.icon-export {
    display: inline-block;
    height: 20px;
    width: 22px;
    background: url(../../assets/images/icon-export.png) no-repeat center;
    background-size: 22px 18px;
    vertical-align: middle;
}
.comment-input {
    height: 30px;
    background: #f5f5f5;
    border-radius: 25px;
    border: none;
    margin: 10px 15px;
    padding: 0 15px;
    width: 50%;
}

::-webkit-input-placeholder {
    color: #999;
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

.share-pop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
}

.share-cont {
    width: 80%;
    margin: 30% auto;
    background: #fff;
    border-radius: 5px;
    padding: 20px 0;
}

.icon-facebook {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url(../../assets/images/icon-facebook.png) center no-repeat;
    background-size: 45px 45px;
    margin:  10px 50px 0 50px;
}

.icon-whatsapp {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url(../../assets/images/icon-whatsapp.png) center no-repeat;
    background-size: 45px 45px;
    margin: 10px 50px 0 50px;
}

.share-title {
    text-align: center;
    font-size: 18px;
    color: #333333;
    margin: 0;
}

.share-text span{
    display: inline-block;
    color: #333333;
    width: 50%;
    text-align: center;
    font-size: 16px;
}
</style>