<template>
<div class="vip-container">
<BHeader  title="Penarikan Member" vip={true} />
<!-- <Loading v-if="!data" /> -->

 <p class="wd-num">{{this.$route.query.m}}</p>
 <p class="wd-text">Bonus Member saat ini (Rp)</p>

    <div class="vip-input-group">
        <i class="icon-input name"></i>
        <input ref="name" type="text" @blur="validateName()" v-model="name" placeholder="Nama pemilik rekening" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input bank"></i>
        <input ref="bank" type="text" @blur="validateBank()" v-model="bank" placeholder="Nomor rekening" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input bankno"></i>
        <input ref="bankno" type="text" @blur="validateBankno()" v-model="bankno" placeholder="Nama tanda terima" />
    </div>
    <div class="vip-input-group">
        <i class="icon-input tel"></i>
        <input ref="tel" type="tel" @blur="validateTel()" v-model="tel" maxlength="13" placeholder="Nomor handphone" />
    </div>
<p class="wd-label">Saldo penarikan (Unit: Rp)</p>
    <div class="wd-val-box">
        <div @click="wdMoney(1)"  class="item" :class="[active == 1 ? 'active':'']">20,000</div>
        <div @click="wdMoney(2)"  class="item" :class="[active == 2 ? 'active':'']">50,000</div>
        <div @click="wdMoney(3)"  class="item" :class="[active == 3 ? 'active':'']">100,000</div>
    </div>
    <div class="vip-btn wd" @click="submitWD()">PENARIKAN</div>
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
    <p class="toast-text" :class="[toastShow? 'show':'hide']">{{msg}}</p>
</div>

</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64

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
            active: 1,
            name: '',
            bank: '',
            bankno: '',
            tel: '',
            toastShow: false,
            submitFlag: true
            
            }
        },
        props: {
            title: String
        },
        methods: {
          wdMoney(type){
                this.active = type
        },
        getAppToken(){
            var content=window.AndroidWebView.getAppToken();
            var token = Base64.decode(content)
            this.token = token
            },
          toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
        },
        validateName(){
            if(!this.name){
                this.toastPop("姓名不能为空");
                return false;
            }
        },
        validateBank(){
             if(!this.bank){
                this.toastPop("输入的银行不能为空");
                return false;
            }
        },
         validateBankno(){
             if(!this.bankno){
                this.toastPop("输入的银行卡号不能为空");
                return false;
            }
        },
        validateTel(){
            let reg = /^(6208|628|8|08)\d{9,11}$/;
            if(this.tel){
              if(!reg.test(this.tel)){
                    this.toastPop("您输入的手机格式不正确");
                    return false;
                }
            }else{
                    this.toastPop("输入的手机号不能为空");
                    return false;
                }
            
        },
        submitWD(){
            
            //this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
            let amount = 20000;
            if(this.active ==1 ) {
                amount = 20000
            }else if(this.active == 2){
                amount = 50000
            }else{
                amount = 100000
            }

            if(this.bank && this.bankno && this.name && this.tel) {
               let reg = /^(6208|628|8|08)\d{9,11}$/;
                if(!reg.test(this.tel)){
                    this.toastPop("您输入的手机格式不正确");
                    return false;
                }
            this.validateTel()
                if(!this.submitFlag) {
                    return false;
                }
                this.submitFlag = false

            if(parseInt(this.$route.query.m) < amount){
                this.toastPop("您的可提取金额不足");
                return false;
            }
                this.getAppToken()
                this.$http({
                    url: '/api/vip/redeem?t='+(new Date()).getTime(),
                    method: 'post',
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    data:{
                        token: this.token,
                        amount: amount,
                        bank:this.bank,
                        card_no: this.bankno,
                        name: this.name,
                        mobile: this.tel,
                    },
                    transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                    }],
                    }).then((res) => {
                       this.submitFlag = true
                    if (res.data.status.code == 200) {
                            this.toastPop('success') 
                            this.$route.push("/wd-record")
                    }else if (res.data.status.code == 401) {
                            
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                    }).catch((res) => {
                        console.log('error: ', res);
                    });
                }else{
                    this.toastPop("您还有未填写的数据")
                }
        }
        },
           mounted(){
            
            // this.token = 'e8bc2672c51e0e94540a77ee2df1b9a6'
             
        }
    }
</script>
<style>
@import  "../../assets/css/vip.css";
</style>