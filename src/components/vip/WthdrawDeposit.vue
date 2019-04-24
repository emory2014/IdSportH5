<template>
<div class="vip-container">
<BHeader  title="Undangan Member Saya" vip={true} />
<!-- <Loading v-if="!data" /> -->

 <p class="wd-num"><span>Rp.</span>{{this.$route.query.m|thousands}}</p>
 <p class="wd-text">Bonus Member saat ini</p>

    <div class="vip-input-group">
        <i class="icon-input name"></i>
        <input ref="name" type="text" @blur="validateName()" v-model="name" placeholder="Nama pemilik rekening" />
    </div>
 
    <div class="vip-input-group">
        <i class="icon-input bankno"></i>
        <input ref="bankno" type="text" @blur="validateBankno()" v-model="bankno" placeholder="Nomor rekening" />
    </div>
       <div class="vip-input-group">
        <i class="icon-input bank"></i>
        <input type="text" ref="bank" readonly v-model="bank" placeholder="Silahkan pilih bank " @click="showBank()" @blur.prevent="closeBank()">
        <ul class="vip-select" :class="[bankShow ? 'show':'hide']" >
           <li @click="selectBank('BCA')">BCA</li>
           <li @click="selectBank('BRI')">BRI</li>
           <li @click="selectBank('MANDIRI')">MANDIRI</li>
           <li @click="selectBank('BNI')">BNI</li>
        </ul>
    </div>
    <div class="vip-input-group">
        <i class="icon-input tel"></i>
        <input ref="tel" type="tel" @blur="validateTel()" v-model="tel"  placeholder="Nomor handphone" />
    </div>
    <div class="wd-val-box">
        <div @click="wdMoney(1)"  class="item" :class="[active == 1 ? 'active':'']">20,000</div>
        <div @click="wdMoney(2)"  class="item" :class="[active == 2 ? 'active':'']">50,000</div>
        <div @click="wdMoney(3)"  class="item" :class="[active == 3 ? 'active':'']">100,000</div>
    </div>
    <p class="wd-label">Saldo penarikan (Unit: Rp)</p>
    <div class="vip-btn wd" @click="submitWD()">PENARIKAN</div>
    <router-link to="/wd-record"><p class="wd-tips-text">Riwayat transaksi ></p></router-link>

    <p class="wd-tip-title">Peringatan </p>
    <ol class="wd-ol">
        <li>Transfer lewat rekening, harus memastikan nomorrekening 
     yang di mastkin bener</li>
     <li>
         Pengantian akun akan di butuhkan 7 hari kerja, tidakermasuk 
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
            submitFlag: true,
            bankShow: false
            
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
            var token = Base64.decode(content);
            this.token = token
            },
          toastPop(text){
                this.toastShow = true
                this.msg = text
                setTimeout(() => this.toastShow = false, 2000)
        },
        showBank(){
            this.bankShow = true
        },
        closeBank() {
            this.bankShow = false
        },
        selectBank(bank){
            this.bankShow = false
            this.bank = bank
        },
        validateName(){
            if(!this.name){
                // 姓名不能为空
                this.toastPop("Nama tidak boleh kosong");
                return false;
            }
        },
        validateBank(){
             if(!this.bank){
                //  输入的银行不能为空
                this.toastPop("Bank tidak boleh kosong");
                return false;
            }
        },
         validateBankno(){
             if(!this.bankno){
                //  输入的银行卡号不能为空
                this.toastPop("No kartu bank tidak boleh kosongg");
                return false;
            }
        },
        validateTel(){
            let reg = /^(6208|628|8|08)\d{9,11}$/;
            if(this.tel){
              if(!reg.test(this.tel)){
                //   您输入的手机格式不正确
                    this.toastPop("Nomor handphone yang Anda masukkan salah");
                    return false;
                }
            }else{
                // 输入的手机号不能为空
                    this.toastPop("Nomor handphone tidak boleh kosong");
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
                    // 您输入的手机格式不正确
                    this.toastPop("Nomor handphone yang Anda masukkan salah");
                    return false;
                }
            this.validateTel()
                if(!this.submitFlag) {
                    return false;
                }
                this.submitFlag = false

            if(parseInt(this.$route.query.m) < amount){
                // 您的可提取金额不足
                this.toastPop("Jumlah penarikan Anda tidak mencukupi");
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
                            this.$router.push("/wd-record")
                    }else if (res.data.status.code == 401) {
                            
                    }else{
                        this.toastPop(res.data.status.message)
                    }

                    }).catch((res) => {
                        console.log('error: ', res);
                    });
                }else{
                    // 您还有未填写的数据
                    this.toastPop("Masih ada data yang belum diisi")
                }
        }
        },
           mounted(){
            //  this.token = 'b96984d9a8d76523a1f732bb75fa3aa0'
        }
    }
</script>
<style>
@import  "../../assets/css/vip.css";
</style>