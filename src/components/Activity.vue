<template>
<div class="active-container">
<BHeader backToApp={true} title="Pusat Permainan"  />
<Loading v-if="!data" />

 <p :class="[defaultShow ? 'show':'hide']" class="default-text">Sementara kuis tidak ada</p>
 <ul v-if="data" class="active-ul" >
     
         <li v-for="(item,index) of data" :key="index">
             <a :href="item.skip_url">
                <div class="active-pic-box"><img :src="item.img_url" /></div>
                <p class="active-title">{{item.description}}</p>
          </a>
     </li>

 </ul>
</div>
</template>
<script>
import BHeader from "./common/BHeader"
import Loading from "./Loading"
    export default {
        name: 'Activity',
         components: {
           BHeader,
           Loading
        },
        data(){
            return {
            data: null,
            msg: '',
            defaultShow: false
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
        },
           mounted(){
            // this.token = this.getQueryString("token");
            // this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
              this.$http({
                url: '/game/activity/entrance?t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                    let data = res.data.data;
                    if (res.data.status.code == 200) {
                        this.data = res.data.data
                        if(!this.data.length){
                            this.defaultShow = true
                        }
                        
                }else if (res.data.status.code == 401) {
                        
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
        }
    }
</script>
<style>
.active-container{
    padding-top: 60px;
}
.default-text{
    font-size: 16px;
    color: #666;
    text-align: center
}
.active-ul a {
    text-decoration: none;
}
.active-ul{
    list-style: none;
    margin: 0 12px 0 12px;
    padding: 0;
    overflow: hidden;
}

.active-ul li {
    border-bottom: 1px solid #dddddd;
}

.active-pic-box{
    border-radius: 5px;
    margin-top: 20px;
    overflow: hidden;
}

.active-pic-box img{
    display: block;
    width: 100%;
    max-height: 200px;
}

.active-title{
    font-size: 16px;
    color: #333;
}
</style>