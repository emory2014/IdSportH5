<template>
<div class="invite-container">
    <div class="invite-sec">
            <ul>
                <li class="title"><span class="rank">Peringkat</span>
                <span class="name">Nama</span>
                <span class="type">Jumlah</span>
                <span class="num">Bonus</span></li>
                <li v-if="data" v-for="(item,index) of data" :key="index">
                    <span>{{item.ranking}}</span><span>{{item.user}}</span><span>{{item.count}}</span><span>Rp.{{parseMoney(item.bonus)}}</span></li>
            </ul>
    </div>
</div>
</template>
<script>
    export default {
        name: 'Invite',
        data(){
            return {
                data: null
            }
        },
       
        methods: {
         getData(){
               this.$http({
                    url: 'http://www.kilatfintech.com/api/inviter/rank',
                    method: 'get',
                }).then((res) => {
                    if (res.data.status.code == 200) {
                        this.data = res.data.data.rank
                }else  {
                   
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
         },
         parseMoney(str){
             let i = str.length
             if(i <= 3){
                 return str;
             }
             else if(i > 3 && i <= 6){
                 return str.substring(0,i-3)+","+str.substring(i-3)
             }else if(i > 6 && i <= 9){
                return str.substring(0,i-6)+","+str.substring(i-6,i-3)+","+str.substring(i-3)
             }else{
                 return str
             }
         }
        },
        mounted(){
             this.getData()
        }
    }
</script>
<style>
    body{
        margin: 0;
        padding: 0;
    }
    .invite-container {
        position: relative;
        background: url(../assets/images/invite-bg.png) top center no-repeat,#3ea2e5;
        background-size: 100%;
        min-height: 1830px;
}

.invite-sec {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: url(../assets/images/invite-sec-bg.png) center no-repeat,#3ea2e5;
        background-size: 100%;
        width: 100%;
        height: 400px;
}

.invite-sec ul{
   list-style: none;
    color: #1755b1;
    font-size: 12px;
    padding: 0;
    margin: 75px auto 0 auto;
    width: 80%;
}
.invite-sec li span{
    width: 24%;
    color: #1755b1;
    font-size: 12px;
    display: inline-block;
    text-align: center;
    height: 25px;
    line-height:25px;
}
.invite-sec li.title span{
    width: 24%;
    color: #1755b1;
    font-size: 12px;
    display: inline-block;
    height: 50px;
    line-height: 50px;
}

.invite-sec li:first-child{
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.invite-sec li:last-child{
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
}

.invite-sec li:nth-child(2n-1){
    background: #ffee9e
}
.invite-sec li:nth-child(2n){
    background: #fff7d5
}
</style>