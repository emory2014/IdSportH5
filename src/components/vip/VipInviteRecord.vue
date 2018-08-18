<template>
<div class="vip-container">
<BHeader  title="Undangan Member Saya" vip={true} />
<!-- <Loading v-if="!data" /> -->
<div class="vip-invite-record">
    <p class="num">19638.00</p>
    <p class="text">Jumlah uang dari undangan member (Rp)</p>
    <div class="item">
        <p>100</p>
        <span>Undangan Member Hari Ini (orang)</span>
    </div>
    <div class="item">
        <p>300</p>
        <span>Jumlah Undangan Member (orang)</span>
    </div>
</div>

<ul class="vip-invite-record-ul">
    <li>
        <span class="name">Nama</span>
        <span class="rp">Bonus saya (Rp.)</span>
        <span class="date">Wakut</span>
    </li>
     <li>
        <span class="name">812****7896</span>
        <span class="rp">20.000</span>
        <span class="date">07 Jul 2018</span>
    </li>
</ul>
</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
    export default {
        name: 'VipInviteRecord',
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