<template>
<div class="invite-container">
    
    <div class="invite-share-sec">
        <p class="my-invite-text">Undangan saya</p>
        <p class="my-invite-title">Setiap mengundang 1teman akan  mendapatkan bonus sebesar</p>
        <a class="my-coin">Rp.6000</a>
        <p class="my-tips">mengundang makin banyak teman  penghasilan makin banyak.</p>
        <div class="invite-item">
            <img src="../assets/images/icon-invite-facebook.png" />
            <p>Undang lewat facebook</p>
        </div>
        <div class="invite-item">
            <img src="../assets/images/icon-invite-whatsapp.png" />
            <p>Undang lewat facebook</p>
        </div>
    </div>
    <img class="ques1" src="../assets/images/ques1.png">

    <div class="invite-sec">
        <div class="invite-header"> 
            <i class="icon-que"></i>  
            Contoh 2
            <i class="icon-que"></i> 
            </div>
        <ul>
                <li class="rule title">
                <span >Jumlah<br>Undang</span>
                <span >Bonus <br>Undang</span>
                <span >Bonus <br>Pencairan Pokok</span></li>
                <li class="rule"><span>1</span><span>6000</span><span>2000</span></li>
                <li class="rule"><span>2</span><span>12000</span><span>4000</span></li>
                <li class="rule"><span>3</span><span>18000</span><span>6000</span></li>
                <li class="rule"><span>4</span><span>24000</span><span>8000</span></li>
                <li class="rule"><span>5</span><span>30000</span><span>10000</span></li>
                <li class="rule"><span>.</span><span>.</span><span>.</span></li>
                <li class="rule"><span>.</span><span>.</span><span>.</span></li>
                <li class="rule"><span>.</span><span>.</span><span>.</span></li>
                <li class="rule"><span>N</span><span>N × 6000</span><span>N × 2000</span></li>
            </ul>
    </div>

    <div class="invite-sec">
        <div class="invite-header"> 
            <i class="icon-que"></i>  
            Peraturan Undang Teman
            <i class="icon-que"></i> 
            </div>
        <p class="invite-text">
1.Setiap Anda Undang Teman dan melakukan Pendaftaran,maka teman anda akan mendapatkan Bonus 
Sebesar Rp.10.000 dan Anda juga akan dapat Bonus Undang teman sebesar Rp.6000.
        </p>
        <p class="invite-text">
            2.Setiap Anda mengundang teman, saldo pencairan Anda otomatis akan bertambah Rp. 2000 
            ( Rp. 1000 dari undang teman dan Rp. 1000 dari Bonus koin). Pencairan dana  dapat dilakukan dengan minimum limit Rp. 20.000 (berarti Anda harus mengundang 10 teman). Pencairan dengan limit lainnya mengikuti peraturan yang ada. 
        </p>
    </div>

    <div class="invite-sec">
        <div class="invite-header"> 
            <i class="icon-que"></i>  
            Peringkat undang teman
            <i class="icon-que"></i> 
            </div>
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
                    url: '/api/inviter/rank',
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
        background:#3ea2e5;
        padding: 10px 0;
        text-align: center;
}

.ques1 {
    width: 100%;
}
.icon-que {
    display: inline-block;
    width: 10px;
    height: 45px;
    background: url(../assets/images/sec-bg.png) no-repeat center;
    background-size: 65%;
}
.invite-header {
    font-size: 16px;
    color: #4461ff;
    font-weight: 500;
    text-align: center;
    margin-top: -18px;
}


.invite-sec {
        width: 91%;
        border-radius: 5px;
        border: 2px solid #ffe157;
        margin: 10px auto;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 25px;
}

.invite-sec ul{
   list-style: none;
    color: #1755b1;
    font-size: 12px;
    padding: 0;
    margin: 12px auto 0 auto;
    width: 90%;
    overflow: auto;
    padding-bottom: 10px;
}
.invite-sec li span{
    width: 24%;
    color: #1755b1;
    font-size: 12px;
    display: inline-block;
    text-align: center;
    height: 24px;
    line-height:24px;
}
.invite-sec li.title span{
    width: 24%;
    color: #1755b1;
    font-size: 12px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
}

.invite-sec li.rule span{
    width: 32%;
    text-align: center;
    line-height: 1.2;
    position: relative;
    top: 7px;
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

.invite-text {
    color: #1755b1;
    font-size: 14px;
    margin: 6px 15px;
    line-height: 1.5;
    text-align: left;
}
.invite-share-sec {
    background: url(../assets/images/invite-share-bg.png)  no-repeat;
    background-size: 100%;
    background-position-y: 135px;
    background-position-x: center;
    color: #fff;
}
.my-invite-text {
    color: #ffd900;
    font-size: 14px;
    float: right;
    margin: 10px 15px;
}
.my-invite-title {
    font-size: 18px;
    clear: both;
    line-height: 1.2;
    margin-bottom: 10px;
}
.my-coin {
    font-size: 25px;
    text-decoration: underline;
}

.my-tips{
    font-size: 14px;
    width: 80%;
    margin: 220px auto 20px auto;
}

.icon-facebook {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(../assets/images/icon-facebook.png) no-repeat center;
    background-size: 30px 30px;
}

.invite-item{
    width: 50%;
    font-size: 12px;
    text-align: center;
    float: left;
}

.invite-item img {
    width: 32px;
}

.invite-item p {
    margin: 2px 0 15px 0;
}
</style>