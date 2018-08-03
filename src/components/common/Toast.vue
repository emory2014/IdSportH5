<template>
 <p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>
</template>
<script>
    export default {
        name: 'Toast',
        data(){
            return {
            toastShow: false,
            msg: ''
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
        }
    }
</script>
<style>
.toast-text {
    position: fixed;
    width: 70%;
    left: 15%;
    right: 15%;
    bottom: 30px;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 25px;
    color: #fff;
    font-size: 15px;
    z-index: 10;
    display: none;
}
</style>