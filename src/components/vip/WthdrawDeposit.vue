<template>
<div class="vip-container">
<BHeader  title="Penarikan Member" vip={true} />
<!-- <Loading v-if="!data" /> -->

 <p class="wd-num">2000</p>
 <p class="wd-text">Bonus Member saat ini (Rp)</p>

    <div class="vip-input-group">
        <i class="icon-input name"></i>
        <input placeholder="Nama pemilik rekening" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input bank"></i>
        <input placeholder="Nomor rekening" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input bankno"></i>
        <input placeholder="Nama tanda terima" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input tel"></i>
        <input placeholder="Nomor handphone" />
    </div>
<p class="wd-label">Saldo penarikan (Unit: Rp)</p>
    <div class="wd-val-box">
        <div class="item active">20,000</div>
        <div class="item">50,000</div>
        <div class="item">100,000</div>
    </div>
    <div class="vip-btn wd">PENARIKAN</div>
    <router-link to="/wd-record"><p class="wd-tips-text">Riwayat transaksi ></p></router-link>

    <p class="wd-tip-title">Peringatan </p>
    <ol class="wd-ol">
        <li>Transfer lewat rekening, harus memastikan nomorrekening 
     yang di mastkin bener</li>
     <li>
         Pengantian akun akan di butuhkan 2 hari kerja, tidakermasuk 
     pas hari pengantinya dan hari libur
     </li>
    </ol>
</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
    export default {
        name: 'WthdrawDeposit',
         components: {
           BHeader,
           Loading
        },
        data(){
            return {
            data: null,
            msg: '',
            defaultShow: false,
            type: 'waiting',
            loading: false
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