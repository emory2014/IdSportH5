<template>
<div class="news-detail-container">
    <BHeader title="" backToApp={true} /> 
    <Loading v-if="!data" />
    <div class="news-cont " ref="article" v-if="data">
       
        <p id="title" class="news-title title" index="01">
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
    <div class="last-child" v-if="data && comments.length">
    <p id="comment" class="recommend-tilte title" index="02">Komentar terbaru</p>
    <div class="news-cont " v-for="(item,index) of comments" :key='index'>
        
        <div class="comment-user-sec">
            <div class="comment-pic-box">
                <img class="" :src="item.avatar" />
            </div>
            <div class="comment-user-name">
                <p class="name">{{item.username}}</p>
                <p class="date">{{item.create_time}}</p>
            </div>
            <div class="zan-right" :data-index="index" :class="[item.like_active?'active':'']"  @click="toLike(item.cid,$event)">
                <i class="icon-comment-zan"></i>
                <span>{{item.like_count}}</span>
            </div>
        </div>
        <div class="comment-text" @click="toReplyShow(item.cid,null,item.username)">
            {{item.content}}
        </div>
        <div class="comment-sec" v-if="item.reply.length">
            <p  v-for="(v,i) of item.reply" :key="i"><span @click="toReplyShow(item.cid,v.from_user_id,v.from_username)">{{v.from_username}}</span><span  v-if="v.to_username" class="reply">Balas</span><span @click="toReplyShow(item.cid,v.from_user_id,v.from_username)">{{v.to_username}}</span>: {{v.content}}</p>
             <!-- <p><span>sss&ee</span><span class="reply">Balas</span><span>Rika</span>: wwewe wewe wewe we wewewewewewewewe</p> -->
              <p v-if="parseInt(item.reply_count) > 4" class="comment-more" @click="goToDetail(item.cid)">Lihat semua {{item.reply_count}} ulasan <i class="icon-comment-more"></i></p>
        </div>
     </div>
  </div>
    <div class="fixed-comment" v-if="data">
        <input readonly class="comment-input" @click="toComment('comment')" v-model="commentText"  placeholder="Komentar…" /> 
        <input readonly class="comment-input reply" @click="toComment('reply')" :class="[replyShow? 'show':'hide']" v-model="replyText"    :placeholder="holder"  />
        <a id="navigation" href="javascript:void(0)" @click="goAnchor()">
            <span  class="comment-msg" :class="[!commentLink ? 'show':'hide']">
              <i class="icon-msg"></i>
              <span class="num">{{commentCount}}</span>
           </span>
           <span class="comment-footer-text" :class="[commentLink? 'show':'hide']">原文</span>
        </a>
        <i @click="sharePop()" class="icon-export"></i>
    </div>
    <div class="share-pop" :class="[maskShow ? 'show':'hide']" @click="popShow($event)">
        <div class="share-cont" >
            <p class="share-title">分享</p>
            <i class="icon-facebook" @click="facebookShare()"></i>
            <i class="icon-whatsapp" @click="whatsappShare()"></i>
            <p class="share-text"><span>Facebook邀请</span><span>WhatsApp邀请</span></p>
        </div>
    </div>

    <div class="reply-mask" @click="replyMaskHide($event)" :class="[ replyMask? 'show':'hide']">
        <div class="reply-cont">
            <p class="reply-mask-title"><span class="left" @click="cancelMaskShow()">Batal</span><span class="right" @click="submitInfo()">Kirim</span></p>
            <textarea autofocus maxlength="1000" v-model="ctext" placeholder="Komentar..." />
        </div>
    </div>

    <router-link to="/invite"><img class="qianbao" src="../../assets/images/qianbao.png" /></router-link>

    <div>

    </div>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from '../Loading'
import Toast from '../common/Toast'

let Base64 = require('js-base64').Base64;

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
                replyText:'',
                replyShow: false,
                replyId: '',
                replyArr:[],
                maskShow: false,
                comments: [],
                cid:'',
                from_id: '',
                like_active: null,
                currentPage: 1,
                totalPage: 1,
                page: 1,
                flag: true,
                commentLink: false,
                commentCount: 0,
                holder: 'Balas:',
                ctext: '',
                replyMask: false,
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
            getToken(){
                if(this.getparam("uAgent")){
                    let content=window.AndroidWebView.getAppToken()
                    let token = Base64.decode(content)
                    return token
                }else{
                    return  ''
                }
            },
            replyMaskHide(e){
                if(e.target.className.indexOf("reply-mask") > -1){
                    this.replyMask = false
                    this.replyShow = false
                }
            },
            cancelMaskShow(){
                this.replyMask = false
                this.replyShow = false
            },
            submitInfo(){
                this.replyMask = false
                if(this.ctext) {
                    if(this.type=="comment"){
                        this.submitComment()
                    }else if(this.type == "reply"){
                        this.replyComment()
                    }
                   
                }else{
                    window.AndroidWebView.showContent('Komentar Tidak boleh Kosong');
                }
            },
            toComment(type){
                this.replyMask = true
                this.ctext = ''
                this.type = type
            },
            goToDetail(cid){
                if(this.getparam("uAgent")){
                    this.$router.push("/comment?cid="+cid+"&uAgent=newscat")
                }else{
                    this.$router.push("/comment?cid="+cid)
                }
            },
            insertMeta(title,img){
                var oMeta = document.createElement('meta');
                oMeta.setAttribute('name',"description");
                oMeta.setAttribute('content',title);
                var tMeta = document.createElement('meta');
                tMeta.setAttribute('property',"og:title");
                tMeta.setAttribute('content',title);
                var sMeta = document.createElement('meta');
                sMeta.setAttribute('property',"og:description");
                sMeta.setAttribute('content',title);
                var fMeta = document.createElement('meta');
                fMeta.setAttribute('property',"og:image");
                fMeta.setAttribute('content',img);
                document.title = title
                document.getElementsByTagName('head')[0].appendChild(oMeta);
                document.getElementsByTagName('head')[0].appendChild(tMeta);
                document.getElementsByTagName('head')[0].appendChild(sMeta);
                document.getElementsByTagName('head')[0].appendChild(fMeta);
            },
            facebookShare(){
            var img = document.querySelector("img").src
            this.$http({
                    url: '/api/article/share',
                    method: 'post',
                    data: {
                        aid: parseInt(this.getparam("aid")),
                        token: this.getToken(),
                    }
                }).then((res) => {
                if (res.data.status.code == 200) {
                     this.insertMeta(this.data.article.title,img)
                     window.AndroidWebView.shareFacebook(this.data.article.title,res.data.data);
                    
                }else{
                    //this.$router.push({path: '/login'});
                    window.AndroidWebView.showContent(res.data.status.message);
                }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            whatsappShare(){
                var img = document.querySelector("img")
             
                 this.$http({
                    url: '/api/article/share',
                    method: 'post',
                    data: {
                        aid: parseInt(this.getparam("aid")),
                        token: this.getToken(),
                    }
                }).then((res) => {
                if (res.data.status.code == 200) {
                    if(img){
                    window.AndroidWebView.shareWhatsAppWithPic('',img.src,this.data.article.title,res.data.data);
                    }else{
                    window.AndroidWebView.shareWhatsApp(this.data.article.title,res.data.data);
                    }
                    
                    
                }else{
                    //this.$router.push({path: '/login'});
                    window.AndroidWebView.showContent(res.data.status.message);
                }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
              getBase64Image(img) {
                  document.querySelector("img").setAttribute("crossOrigin",'anonymous');
                 
                    var canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext("2d"); 
                    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();//图片格式
                    
                    img.onload = function () {
                        //画图
                      ctx.drawImage(img, 0, 0, img.width, img.height);
                    var dataURL = canvas.toDataURL("image/"+ext);
                    }
                    // return dataURL
                     return dataURL.replace("data:image/"+ext+";base64,", "");
                    },
            toReplyShow(cid,from_id,name){
                this.replyShow = true
                this.cid = cid
                this.holder = "Balas: "+name
                if(from_id){
                this.from_id = from_id
                }
            },
            popShow(e){
                if(e.target.className.indexOf("share-pop") > -1 ){
                    this.maskShow = false
                     if(document.querySelector("img")){
                            window.AndroidWebView.clearWhatAppCurrentPic();
                        }
                }else{
                    this.maskShow = true
                }
            },
            sharePop(){
                this.maskShow = true
            },
            toLike(cid,e){
               var target = e.currentTarget
                //e.currentTarget.className = "zan-right active"
                 if(target.className.indexOf("active") > -1) {
                    target.className = "zan-right"
                    target.children[1].innerHTML = parseInt(target.children[1].innerHTML) - 1
                }else {
                    target.className = "zan-right active"
                    target.children[1].innerHTML = parseInt(target.children[1].innerHTML) + 1
                }
                this.$http({
                url: '/api/comment/like',
                method: 'post',
                data:{
                     token: this.getToken(),
                    // token: '',
                    comment_id: cid,
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                
              
            }else if(res.data.status.code == 401){
                   // window.AndroidWebView.loginApp();
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
                        this.ajaxNewsLike(2,2)
                    }
                }
            },
            ajaxNewsLike(type,action){
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
             this.$http({
                url: '/api/article/like',
                method: 'post',
                data:{
                    aid: parseInt(this.getparam("aid")),
                    token: this.getToken(),
                    // token:'',
                    type: type,
                    action: action
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
               
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
                let str = unescape(RegExp.$2.replace(/\+/g," "))
                if(str.indexOf("#") > -1) {
                    let i = str.indexOf("#")
                    return str.substring(0,i)
                }else{
                    return unescape(RegExp.$2.replace(/\+/g," "))
                }
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
             var arr = 
                 {
                     avatar:"http://test.jiajiahebao.com/images/avatar.png",
                     cid:"5",
                     content:"test test test",
                     create_time:"2018-06-29 17:42:28",
                     like_active:false,
                     like_count:"0",
                     reply:[],
                     reply_count:"0",
                     username:"87****464"
                 }
             
             if(this.ctext){
                 this.$http({
                url: '/api/comment/submit',
                method: 'post',
                data:{
                    token: this.getToken(), 
                    // token:'',
                    aid: this.getparam("aid"),
                    content: this.ctext
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                this.comments.push(res.data.data.current.data)
                this.commentCount = res.data.data.comment_count
                window.AndroidWebView.showContent("Komenter berhasil dikirim");
            }else if(res.data.status.code == 401){
                window.AndroidWebView.loginApp();
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
             }else{
                window.AndroidWebView.showContent("Komentar Tidak boleh Kosong")
             }
              
         },
         replyComment(e){
             var _this = this;
             var arr = {
                content:"wo shi test test",
                from_user_id:"9",
                from_username:"82****443",
                to_username:null
             }
             this.$http({
                url: '/api/comment/submit',
                method: 'post',
                data:{
                     token: this.getToken(), 
                    // token:'',
                    comment_id: this.cid,
                    to_user_id: this.from_id,
                    content: this.ctext
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
                this.replyShow = false
                this.comments.map((item,index) => {
                    if(item.cid == _this.cid){
                        item.reply.push(res.data.data.current.data)
                    }
                })
            window.AndroidWebView.showContent("Komenter berhasil dikirim");
            }else if(res.data.status.code == 401){
                window.AndroidWebView.loginApp();
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
         },
          getData(page){
               this.$http({
                    url: '/api/comments?aid='+this.getparam("aid")+'&page='+page,
                    method: 'post',
                    data:{
                        token: this.getToken()
                    }
                }).then((res) => {
                    this.flag = true;  
                    if (res.data.status.code == 200) {
                        
                        res.data.data.comments.map((item) => {
                                this.comments.push(item)
                        })
                       this.currentPage = res.data.data.page_info.current_page
                       this.totalPage = res.data.data.page_info.total_page
                }else  {
                   window.AndroidWebView.showContent(res.data.status.message);
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
            },
            goAnchor(){
                let scrollObj = document.querySelectorAll(".title")
                if(!this.commentLink) {
                    document.documentElement.scrollTop = scrollObj[1].offsetTop
                     document.body.scrollTop = scrollObj[1].offsetTop
                    this.anchorFlag = 0
                }else{
                    document.documentElement.scrollTop = scrollObj[0].offsetTop
                    document.body.scrollTop = scrollObj[0].offsetTop
                     this.anchorFlag = 1
                }
                
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
                             _this.getData(_this.page)
                        }
                        
                    }  
                }  
//window.AndroidWebView.showContent('height:'+document.querySelector(".news-cont").clientHeight)



                if(document.querySelector(".news-cont")){
                    
                    if(document.body.scrollTop >= document.querySelector(".news-cont").clientHeight){
                       // window.AndroidWebView.showContent(document.documentElement.scrollTop)
                        _this.commentLink = true
                        //document.querySelector('#navigation').setAttribute("href","#title")
                    }else{
                        _this.commentLink = false
                       // document.querySelector('#navigation').setAttribute("href","#comment")
                    }
                    
                }
            });  
          }
        },
      
        mounted(){
            this.$http({
                url: '/article/detail?aid='+this.getparam("aid"),
                method: 'post',
                data: {
                    token: this.getToken()
                }
            }).then((res) => {
            if (res.data.status.code == 200) {
            this.data = res.data.data
            this.pickShow = res.data.data.like_active 
            this.dissShow = res.data.data.dislike_active 
            this.pick = res.data.data.article.like 
            this.diss = res.data.data.article.dislike
            this.commentCount = this.data.article.comment_count
            }else{
                //this.$router.push({path: '/login'});
                window.AndroidWebView.showContent(res.data.status.message);
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
     
        this.getData(1);
        
         this.$nextTick(function () {
                this.scrollGetData();
        })
        },
       beforeDestroy(){
          
       }
    }
</script>
<style>
a {
    text-decoration: none;
}
body{
    margin: 0;
    background: #fff;
}
.header {
    box-shadow: 0 0 0 1px rgba(255,192,0,0.1);
    margin-bottom: 0!important;
    border-top: none!important;
}
.news-detail-container{
    padding-bottom: 40px;
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
    font-size: 12px;
    color: #999999;
    width: 92%;
    margin: 15px auto;
}

.text-right {
    float: right;
}
.news-cont {
    border-bottom: 10px solid #f5f5f5;
    min-height: 10px;
}

.news-cont:last-child{
    border-bottom: none;    
}

.last-child  .news-cont{
    border-bottom: none;
    /* margin-bottom: 70px!important; */
}

.last-child {
    margin-bottom: 70px!important;
}
.no-border {
    border-bottom: none;
}

.text-sec {
    text-align: center;
    width: 92%;
    margin: 15px auto;
}

.text-sec img {
    width: 100%;
}

.text-sec p{
    color: #333333;
    font-size: 16px;
    margin-bottom: 20px;
    /* width: 92%!important;
    margin: 15px auto; */
    line-height: 1.5;
    text-align: left;
    word-break: break-word;
}

.text-sec div{
    color: #333333;
    font-size: 16px;
    word-break: break-word;
}

.text-sec iframe,.text-sec pre,.text-sec section{
    width: 100%;
    overflow: auto;
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
    margin: 20px auto 10px auto;
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

.comment-text input {
    font-size: 16px;
    color: #333333;
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
    width: 100%;
    word-break: break-word;
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
    padding-left: 4%;
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
    width: 20px;
    background: url(../../assets/images/icon-export.png) no-repeat center;
    background-size: 20px 18px;
    vertical-align: middle;
}
.comment-input {
    height: 30px;
    background: #f5f5f5;
    border-radius: 25px;
    border: none;
    margin: 10px 0;
    padding: 0 15px;
    width: 58%;
}

.comment-input.reply {
    position: fixed;
    width: 90%;
    left: 5%;
    right: 5%;
    bottom: 0;
    z-index: 1;
    box-sizing: border-box;
    margin: 10px 0;
}

::-webkit-input-placeholder {
    color: #999;
    font-size: 14px;
}

.comment-msg {
    position: relative;
    margin: 0 20px 0 20px
}

.comment-msg .num {
    color: #619cff;
    font-size: 14px;
    position: absolute;
    left: 15px;
    top: -5px;
}

.comment-msg.show{
    display: inline-block!important;
}

.comment-footer-text {
    font-size: 14px;
    color: #619cff;
    margin: 0 20px 0 20px
}

.comment-footer-text.show{
    display: inline-block!important;
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
    margin:  30px 50px 0 50px;
}

.icon-whatsapp {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url(../../assets/images/icon-whatsapp.png) center no-repeat;
    background-size: 45px 45px;
    margin: 30px 0 0 50px;
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

.reply-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: rgba(0, 0, 0, 0.6);
}

.reply-cont {
    position: absolute;
    bottom: 0;
    background: #fff;
    width: 100%;
    font-size: 16px;
    color: #999999;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.reply-mask-title {
    margin:  0;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    color: #ddd;
    font-size: 15px;
}

.reply-mask-title .right{
    color: #ffc000;
    float: right; 
}

.reply-cont textarea {
    height: 120px;
    font-size: 14px;
    color: #333333;
    padding: 10px;
    line-height: 1.5;
    width: 100%;
    box-sizing: border-box;
    resize: none;

}

.reply-cont textarea::placeholder{
    position: relative;
    top: -40px;
    line-height: 20px;
    color: #ddd;
    font-size: 15px;
}

.qianbao{
    position: fixed;
    right: 10px;
    width: 80px;
    bottom: 60px;
    z-index: 1;
}

</style>