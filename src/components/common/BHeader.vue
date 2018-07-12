<template>
<header class="header">
            　<i class="nc-icon-prev" @click="goBack()"></i>
              <div>{{title}}</div>
              <router-link to="/record" v-if="recharge"><span  class="recharge-record">Riwayat Transaksi</span></router-link>
        </header>
</template>
<script>
    export default {
        name: 'BHeader',
        data(){
            return {

            }
        },
        props: {
            title: String,
            recharge: false,
            backToApp: false
        },
        methods: {
            goBack(){
                if(this.recharge || this.backToApp){
                    window.AndroidWebView.closeActivities();
                }
                else{
                window.history.go(-1)
                }
                
        },
        }
    }
</script>
<style>

    .header {
    position: relative;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #333333;
    background: #fff;
    margin-bottom: 8px;
    width: 100%;

}

.header div{
    width: 80%;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
}

.nc-icon-prev{
    position: absolute;
    left: 15px;
    top: 13px;
    display: block;
    background: url(../../assets/images/prev.png);
    height: 25px;
    width: 20px;
    background-size: 20px 25px;
}

.recharge-record {
    position: absolute;
    color: #333;
    font-size: 12px;
    right: 10px;
    top: 1px;
}
</style>