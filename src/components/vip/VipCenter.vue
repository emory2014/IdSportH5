<template>
<div class="vip-container">
<BHeader backToApp={true} title="Member Super" vip={true} />
<!-- <Loading v-if="!data" /> -->
<div class="vip-info-sec">
    <div class="vip-scroll-box">
        <i class="icon-vip-tips"></i>
        <ul>
            <li>620821****4433 sudah jadi member dapat Rp.20000</li>
        </ul>
    </div>
    <div class="info-cont">
        <div class="header-wrapper">
            <div class="vip-header-box">
                <img src="../../assets/images/game-header.png" />
            </div>
            <img class="vip-pic" src="../../assets/images/vip/vip-gray.png"/>
        </div>
        <div class="header-info">
            <p class="name">620821654114433</p>
            <span class="tag">Belum jadi Member</span>
        </div>

        <div class="vip-val-info">
            <div class="item">
                <p>Sudah  undang</p>
                <p><span class="num">1000</span>  orang</p>
                <span class="tag">Undangan saya ></span>
            </div>
            <div class="item">
                <p>Sudah dapat (Rp.)</p>
                <p><span class="num">20.000.000</span>  </p>
                <span class="tag">Penarikan ></span>
            </div>
        </div>
    </div>
</div>

 <div class="vip-title-sec">
        Hak Istimewa VIP
        <p class="vip-title-text">Klik gambar dibawah untuk lihat manfaat member</p>
</div>
<div class="vip-access-sec">
    <div class="item">
        <i class="icon-vip read"></i>
        <p>Baca berkualitas</p>
        <span>Artikel yang berkualitas</span>
    </div>
    <div class="item">
        <i class="icon-vip invite"></i>
        <p>Bonus Undangan</p>
        <span>Bonus Tinggi</span>
    </div>
    <div class="item">
        <i class="icon-vip coin"></i>
        <p>2 kali koin</p>
        <span>Koin bisa diuangkan</span>
    </div>
    <div class="item">
        <i class="icon-vip more"></i>
        <p>Masih banyak lagi</p>
        <span>Stay tuned</span>
    </div>
</div>
<div class="vip-btn">Jadi member Rp. 100.000/bulan</div>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
    export default {
        name: 'VipCenter',
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
            //   this.$http({
            //     url: '/game/activity/entrance?t='+(new Date()).getTime(),
            //     method: 'get',
            //     }).then((res) => {
            //         let data = res.data.data;
            //         if (res.data.status.code == 200) {
            //             this.data = res.data.data
            //             if(!this.data.length){
            //                 this.defaultShow = true
            //             }
                        
            //     }else if (res.data.status.code == 401) {
                        
            //         }else{
            //             this.toastPop(res.data.status.message)
            //         }

            //     }).catch((res) => {
            //         console.log('error: ', res);
            //     });
        }
    }
</script>
<style>
@import  "../../assets/css/vip.css";
</style>