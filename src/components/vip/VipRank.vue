<template>
<div class="vip-rank-container">

 <!-- <Loading v-if="!data" />  -->
    <p class="title">Jadi Member, Bonus Baca 5 kali lipat, Undang <br>
    teman hasilkan puluhan ribu rupiah, <br>
    dan bisa cepat dicairkan</p>

    <div class="vip-rank-cont">
        <img class="vip-rank-title"  src="../../assets/images/vip/vip-rank-title.png" />
        <ul class="vip-rank-ul" v-if="data">
            <li v-for="(item,index) of data" :key="index">
                <img v-if="item.ranking == 1" class="icon-vip-order" src="../../assets/images/vip/icon-vip-one.png">
                <img v-else-if="item.ranking == 2" class="icon-vip-order" src="../../assets/images/vip/icon-vip-two.png">
                <img v-else-if="item.ranking == 3" class="icon-vip-order" src="../../assets/images/vip/icon-vip-three.png">
                <span class="rank-order" v-else>{{item.ranking}}</span>
                <div class="vip-rank-header">
                    <img :src="item.avatar" />
                </div>
                <div class="rank-info">
                    <p class="invite"><span class="left">{{item.username}}</span> <span class="right">Sudah Undang {{item.count}} orang</span></p>
                    <p class="font">Sudah Dapat <span class="yellow">Rp.{{$utils.parseMoney(item.amount)}}</span></p>
                </div>
            </li>
             
            
        </ul>
    </div>
    <div class="vip-rank-cont no-mb">
        <img class="vip-rank-rule" src="../../assets/images/vip/vip-rank-rule.png" />
        <ol  class="vip-rank-ol">
            <li>
                <span class="font-14">Manfaat Jadi Member?</span><br>
             Pertama: Setelah berhasil jadi Member bisa membaca Artikel Berbayar, Bonus membaca naik sampai 5 kali lipat Rpc;<br>
Kedua: Teman yang berhasil jadi Member, kamu akan dapat bonus Rpc sebesar 20%, jika teman dari teman kamu juga berhasil jadi Member, kamu akan dapat bonus Rpc sekali lagi sebesar 5%;<br>
Ketiga: Jumlah bonus Rpc yang kamu dapat dari teman yang berhasil jadi Member, baru bisa langsung kamu cairkan kalau kamu juga sudah jadi Member.
            </li>
            <li>
                 <span class="font-14">Berapa jumlah Rpc untuk perlu jadi Member?</span><br>
                Jawab : Jadi Member perlu Rpc 200.000.
            </li>
            <li><span class="font-14">Bagaimana jadi Member?</span><br>
                Cara Pertama: Jika kamu sebelumnya mempunyai Rpc >= 200.000 berarti sudah cukup untuk jadi Member, kamu hanya perlu pergi ke halaman Pusat Member, 
                lalu klik tombol “Jadi Member Rpc 200.000/bulan”, setelah itu konfirmasi jadi Member;
                <br>Cara Kedua: Jika sebelumnya kamu mempunyai Rpc < 200.000, silahkan pergi ke Pusat Top Up untuk beli Rpc, 
                top up jumlah koin sampai cukup Rpc 200.000, setelah itu kamu hanya perlu pergi ke halaman Pusat Member,
                lalu klik tombol “Jadi Member Rpc 200.000/bulan”, setelah itu konfirmasi jadi Member.
            </li>
        </ol>
    </div>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64

    export default {
        name: 'VipRank',
         components: {
           BHeader,
           Loading
        },
        data(){
            return {
            data: null,
            msg: '',
            loading: false,
            flag: true,
        
            }
        },
       
        methods: {
       
          toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
        },
       
        
          getData(){
            //this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
           // this.getAppToken();
              this.$http({
                url: '/api/rank/vip?t='+(new Date()).getTime(),
                method: 'get',
                }).then((res) => {
                   
                    if (res.data.status.code == 200) {
                        this.data = res.data.data
                       
                        
                }else if (res.data.status.code == 401) {
                        
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });
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
}
.vip-rank-container{
    background: url(../../assets/images/vip/datu.png) no-repeat top center,#080706;
    background-size: 100%; 
    padding: 180px 0 0 0;
}

.vip-rank-container .title{
    text-align: center;
    color: #d7be9d;
    font-size: 14px;
    line-height: 2;
}

.vip-rank-cont{
    background: #231d18;
    border-radius: 15px;
    width: 90%;
    margin: 20px auto;
    padding: 15px;
    box-sizing: border-box;
}

.vip-rank-title{
    display: block;
    width: 95%;
    margin: auto;
}

.vip-rank-ul{
    list-style: none;
    padding: 0;
}

.vip-rank-ul li{
    border-bottom: 1px solid #3f3e3d;
    padding: 10px 0;
}

.rank-order{
    display: inline-block;
    height: 20px;
    width: 20px;
    color: #231d18;
    background: #d7be9e;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 4px;
}

.vip-rank-header{
    display: inline-block;
    height: 35px;
    width: 35px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: middle;
    margin: 0 2px;
}

.vip-rank-header img {
    width: 100%;
    height: 100%;
}

.rank-info{
    display: inline-block;
    width: 74%;
    font-size: 12px;
    color: #d7be9d;
    vertical-align: middle;
    height: 35px;
}

.rank-info p{
    margin: 0;
    display: inline-block;
}

.rank-info .invite{
    margin-bottom: 3px;
    width: 100%;
}

.rank-info .right{
    float: right;
    transform: scale(0.9); 
    transform-origin: right;
}

.rank-info .left{
    transform: scale(0.9); 
    transform-origin: left;
}

.rank-info .yellow{
    color: #ffc000;
}

.rank-info .font{
    font-size: 12px;
}

.vip-rank-rule{
    width: 81%;
    display: block;
    margin: auto;
}

.vip-rank-ol{
    color: #d7be9d;
    font-size: 12px;
    padding: 0 0 0 12px;
}
.vip-rank-ol li {
    line-height: 2;
    list-style: decimal;
}

.vip-rank-ol .font-14{
    font-size: 14px;
    font-weight: bold;
}

.no-mb{
    margin-bottom: 0;
}

.icon-vip-order{
    width: 20px;
    margin-right: 4px;
}
</style>