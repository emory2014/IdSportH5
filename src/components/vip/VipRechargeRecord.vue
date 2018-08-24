<template>
<div class="vip-container">
<BHeader  title="Member Super" vip={true} />
  <Loading v-if="loading" />


  <div >
       <div class="tab-cont record">
       <div class="item" :class="[type == 'waiting'?'active':'']" @click="addClass('waiting')">Sedang proses</div>
       <div class="item" :class="[type == 'success'?'active':'']" @click="addClass('success')">Berhasil</div>
       <div class="item" :class="[type == 'failed'?'active':'']" @click="addClass('failed')"> Gagal</div>
   </div>

    <div class="cont-panel record" >
        <div class="record-left">
            <span class="num">+2000</span>
            <span>Isi Ulang (Rp)</span>
        </div>
        <div class="record-left text">
            <span>Isi Ulang Via: <i class="dark">Alfamart</i>  </span>
            <span>Cara: <i class="dark">Top Up Member</i></span>
            <span>Waktu: <i class="dark">2018-08-12 12:25:00</i></span>
        </div>

    </div>

  </div>

  <!-- <div  class="vip-record-default">
      <img class="vip-default-pic" src="../../assets/images/vip/vip-default-pic.png" />
      <p class="record-no-data" >"Sementara tidak ada konten"</p>
      
  </div> -->


</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
    export default {
        name: 'VipRechargeRecord',
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