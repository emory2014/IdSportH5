<template>
<div class="news-detail-container">
    <Loading v-if="!data" />
    <div class="news-cont" v-if="data">
        <p class="news-title">
            {{data.article.title}}
        </p>
        <p class="date-sec">
            <span >{{data.article.create_time}}</span>
            <span class="text-right">Sumber: {{data.article.source}}</span>
        </p>
        <div class="text-sec" v-html="data.article.body">
        </div>
        <!-- <div class="like-sec">
            <i class="icon-zan"></i>
            <i class="icon-cai"></i>
            <p class="like-num-sec">
                <span>8</span>
                <span>0</span>
            </p>
        </div> -->
    </div>


    <div class="news-cont no-border" v-if="data">
        <p class="recommend-tilte">Terkait Rekomendasi</p>
        <ul class="news-items">
            <li class="news-item" v-for="(item,index) of data.recommends" :key="index">
                <div class="media-left">
                    <p>
                        {{item.title}}
                    </p>
                    <p class="news-item-date"> {{item.author}}</p>
                </div>
                <div class="media-right">
                    <img class="img" @load="dealWithImg($event)"  :src="item.images[0]" />
                </div>
            </li>
           
        </ul>
    </div>

    <div>

    </div>
</div>
</template>
<script>
import Loading from '../Loading'

    export default {
        name: 'NewsDetail',
        data(){
            return {
                data: null
            }
        },
        components: {
           Loading
        },
        props: {
            title: String
        },
        methods: {
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
        },
        watch: {
              
        },
        mounted(){
            this.$http({
                url: '/article/detail?aid=6658',
                method: 'get',
            }).then((res) => {
         
            if (res.data.status.code == 200) {
            this.data = res.data.data
            
        

            }else if (res.data.status.code == 401) {
                //this.$router.push({path: '/login'});
                window.AndroidWebView.loginApp();
            }

            }).catch((res) => {
                console.log('error: ', res);
            });
        }
    }
</script>
<style>
body{
    margin: 0;
}
.news-detail-container {

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

.icon-cai {
    background: url(../../assets/images/icon-cai.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
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

.media-left {
    width: 60%;
    float: left;
    color: #333333;
    font-size: 16px;
}

.media-left p {
    margin: 0;
    line-height: 1.5;
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
</style>