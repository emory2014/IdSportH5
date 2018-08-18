<template>
<div class="vip-container">
<BHeader  title="Riwayat Transaksi" vip={true} />
<!-- <Loading v-if="!data" /> -->
<ul class="wd-record-ul">
    <li class="yellow">
        <p>Nama：Zhang San</p>
        <p>Nama bank：BCA</p>
        <p>Nomor kartu bank：62228888888888</p>
        <p>Jumlah penarikan：Rp.20,000</p>
        <p>Status pemrosesan：Dalam proses</p>
        <p>Waktu：07 May, 13:02:41</p>
    </li>
     <li class="red">
        <p>Nama：Zhang San</p>
        <p>Nama bank：BCA</p>
        <p>Nomor kartu bank：62228888888888</p>
        <p>Jumlah penarikan：Rp.20,000</p>
        <p>Status pemrosesan：Dalam proses</p>
        <p>Waktu：07 May, 13:02:41</p>
    </li>
     <li class="green">
        <p>Nama：Zhang San</p>
        <p>Nama bank：BCA</p>
        <p>Nomor kartu bank：62228888888888</p>
        <p>Jumlah penarikan：Rp.20,000</p>
        <p>Status pemrosesan：Dalam proses</p>
        <p>Waktu：07 May, 13:02:41</p>
    </li>
</ul> 
</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
    export default {
        name: 'WDRecord',
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