<template>
<div>
<div class="process-container">
   <BHeader :title="setTitle()"  />
   <!-- <div class="" v-html="tab">
        <div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div>
   </div> -->
  <div :class="[method == 1 ? 'show':'hide']">
    <div class="cont-panel">
            <p class="title">{{this.getQueryString("m")}}</p>
            <p class="subtitle">Jumlah</p>
            <p class="code">{{data}}</p>
            <p class="subtitle">Kode Transaksi</p>
            <div class="text-cont">
                <ol>
                    <li> Pergi ke Alfa Group  </li>
                    <li>Katakan Kepada Kasir Ingin Melakukan
                        Pembayaran Transaksi Online “<span class="yellow">BLUEPAY</span>”,
                        Sebutkan Jumlah Tagihan (<span class="yellow">{{this.getQueryString("m")}}</span>) dan Kode
                        Transaksi (<span class="yellow">{{data}}</span>)
                    </li>
                    <li> Kasir Akan Melakukan Konfirmasi dan Menyebutkan Nominal Yang Harus Dibayar  </li>
                    <li> Lakukan Pembayaran ke Kasir dan Dapatkan Struk Bukti Pembayaran, Setelah 1-3 Menit
                        Barang Akan Otomatis Terkirim di Dalam Aplikasi </li>
                </ol>
            </div>
    </div>
  </div>

<div :class="method == 2 ? 'show': 'hide'">
    <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div><div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div></div>
<div class="cont-panel" :class="[active == 1 ?'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pergi ke ATM bank apa saja dan masukkan kartu ATM anda,pilih"Transaksi Lain"->"Transfer"->"Bank Lain". </li>
                <li>Masukkan kode bank"<span class="yellow">013</span>"dan pilih "Benar".</li>
                <li>Masukkan jumlah transfer(<span class="yellow">{{this.getQueryString("m")}}</span>)”. </li>
                <li>Masukkan kode transaksi:(<span class="yellow">{{data}}</span>) .</li>
                <li>Pilih "benar" untuk konfirmasi transfer.</li>
                <li>Bukti Pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yangsah dari Bank.</li>
            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active == 2 ?'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih “Transfer”pada menu. </li>
                <li>Pilih “Ke Bank Lain”pada menu.</li>
                <li>Masukkan kode bank "Bank Permata(<span class="yellow">013</span>)" </li>
                <li>Masukkan"kode Pembayan"(<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
                <li>Masukkan jumlah transfer Anda Rp(<span class="yellow">{{this.getQueryString("m")}}</span>)dan pilih "OK".</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active == 3 ?'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih “Transfer”pada menu. </li>
                <li>Pilih “Ke Bank Lain”pada menu.</li>
                <li>Masukkan kode bank "Bank Permata(<span class="yellow">013</span>)" </li>
                <li>Masukkan"kode Pembayan"(<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
                <li>Masukkan jumlah transfer Anda Rp(<span class="yellow">{{this.getQueryString("m")}}</span>)dan pilih "OK".</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
            </ol>
        </div>
</div>
</div>

<div :class="[method == 3 ? 'show':'hide']">
    <div class="tab-cont"><div class="item" :class="[active ==1 ? 'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div><div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div></div>
<div class="cont-panel" :class="[active ==1 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih menu bayar/beli.</li>
                <li>Pilih lainnya > lainnya > multipayment .</li>
                <li>Isi kode perusahaan “70002” dan pilih “Benar”.</li>
                <li>Isi kode merchant“078” dan pilih “Benar”. </li>
                <li>Masukkan 8 digit terakhir kode pembayaran dan pilih “Benar”. </li>
                <li>Ikuti langkah selanjutnya hingga pembayaran selesai.</li>

            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active ==2 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih menu bayar/Multi Payment.</li>
                <li>Pilih lainnya > penyedia layanan > pilih DOKU.  </li>
                <li>Isi kode merchant“078”.</li>
                <li>Masukkan 8 digit terakhir kode pembayaran <span class="yellow">{{data}}</span> dan pilih “lanjut”.</li>
                <li>Ikuti langkah selanjutnya hingga pembayaran selesai. </li>

            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active ==3 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih menu bayar/Multi Payment.</li>
                <li>Pilih lainnya > penyedia layanan > pilih DOKU.  </li>
                <li>Isi kode merchant“078”.</li>
                <li>Masukkan 8 digit terakhir kode pembayaran <span class="yellow">{{data}}</span> dan pilih “lanjut”.</li>
                <li>Ikuti langkah selanjutnya hingga pembayaran selesai. </li>

            </ol>
        </div>
</div>

</div>

<div :class="[method == 4 ? 'show':'hide']">
    <div class="tab-cont"><div class="item" :class="[active ==1 ? 'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div><div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div></div>
<div class="cont-panel" :class="[active ==1 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pergi ke ATM bank BRI dan masukkan kartu ATM anda. </li>
                <li>Pilih “Transaksi Lain” -> “Transfer” -> “Bank Lain”.</li>
                <li>Masukkan kode bank “<span class="yellow">009</span>” dan pilih “Benar”.</li>
                <li>Masukkan jumlah transfer （contoh: <span class="yellow">{{this.getQueryString("m")}}</span>). </li>
                <li>Masukkan kode transaksi: (<span class="yellow">{{data}}</span>)</li>
                <li>Pilih “Benar” untuk konfirmasi transfer.</li>
                <li>Bukti Pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank.</li>
            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active ==2 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih “Transfer”pada menu.</li>
                <li>Pilih “Ke Bank Lain”pada menu. </li>
                <li>Masukkan kode bank "Bank BNI (<span class="yellow">009</span>)"</li>
                <li>Masukkan"Kode Pembayaran"(<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
                <li>Masukkan jumlah transfer Anda (contoh Rp. <span class="yellow">{{this.getQueryString("m")}}</span>) dan pilih "OK". </li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>

            </ol>
        </div>
</div>

<div class="cont-panel" :class="[active ==3 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
          <ol>
              <li>Pilih “Transfer”pada menu.</li>
              <li>Pilih “Ke Bank Lain”pada menu. </li>
              <li>Masukkan kode bank "Bank BNI (<span class="yellow">009</span>)"</li>
              <li>Masukkan"Kode Pembayaran"(<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
              <li>Masukkan jumlah transfer Anda (contoh Rp. <span class="yellow">{{this.getQueryString("m")}}</span>) dan pilih "OK". </li>
              <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
          </ol>
        </div>
</div>

</div>



<div :class="(method != 1 && method != 2 && method != 3 && method != 4) ? 'show':'hide'">
     <div class="tab-cont"><div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div><div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div></div>
    <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pergi ke ATM bank MEGA dan masukkan kartu ATM anda.</li>
                <li>Pilih"Transaksi Lain"->"Transfer"->"Bank Lain".</li>
                <li>Masukkan kode bank “<span class="yellow">009</span>” dan pilih “Benar”. </li>
                <li>Masukkan jumlah transfer （contoh: <span class="yellow">{{this.getQueryString("m")}}</span>).</li>
                <li>Masukkan kode transaksi: (<span class="yellow">{{data}}</span>)</li>
                <li>Pilih “benar” untuk konfirmasi transfer. </li>
                <li>Bukti Pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank.</li>

            </ol>
        </div>
 </div>

<div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih “Transfer”pada menu. </li>
                <li>Pilih “Ke Bank Lain”pada menu. </li>
                <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
                <li>Masukkan"kode Pembayan"(<span class="yellow">{{data}}</span>) pada tujuan transfer</li>
                <li>Masukkan jumlah transfer Anda Rp(<span class="yellow">{{this.getQueryString("m")}}</span>)dan pilih "OK".</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
            </ol>
        </div>
</div>


<div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pilih “Transfer”pada menu. </li>
                <li>Pilih “Ke Bank Lain”pada menu.</li>
                <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
                <li>Masukkan"kode Pembayan"(<span class="yellow">{{data}}</span>) pada tujuan transfer</li>
                <li>Masukan jumlah transfer Anda Rp(<span class="yellow">{{this.getQueryString("m")}}</span>) dan pilih “OK”</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>

            </ol>
        </div>
</div>
</div>

</div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"
let Base64 = require('js-base64').Base64;


    export default {
        name: 'Process',
        components: {
           BHeader
        },
        data(){
            return {
                data: null,
                tab:'',
                html:'',
                method: this.getQueryString("method"),
                active: 1
            }
        },
        methods: {
            setTitle(){
                let method = this.getQueryString("method");
                if(method == 1){
                    return "Bayar di Alfamart"
                }else if(method == 2){
                    return "BCA"
                }else if(method == 3){
                    return "Mandiri"
                }else if(method == 4){
                    return "BRI"
                }else if(method == 5){
                    return "BNI"
                }else if(method == 6){
                    return "CIMB"
                }else if(method == 7){
                    return "MEGA"
                }else if(method == 8){
                    return "BPANINRI"
                }else if(method == 9){
                    return "DANAMON"
                }else if(method == 10){
                    return "PERMATA"
                }else if(method == 11){
                    return "BII"
                }

            },
            setTab(){
                let method = this.getQueryString("method");
                if(method == 2) {
                    this.tab = '<div class="tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div></div>'
                }else if(method == 3){
                    this.tab = '<div class="mandiri tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div></div>'
                }
            },
            addClass(index){
                this.active = index
            },
             getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                    return null;
                } ,

            getData(){
                   var content=window.AndroidWebView.getAppToken();
                let token = Base64.decode(content)
               this.$http({
                    url: '/api/recharge/code/generate?t='+(new Date()).getTime(),
                    method: 'post',
                    data: {
                        token: token,
                        amount: this.getQueryString("m"),
                        method: this.getQueryString("method")
                    }
                }).then((res) => {
                    if (res.data.status.code == 200) {
                       this.data = res.data.data

                }else  {

                    }

                }).catch((res) => {
                    console.log('error: ', res);
                });

            },

        },
        mounted(){
            this.getData()
            this.setTab()
        }
    }
</script>
<style>
    @import  "../../assets/css/recharge.css";
</style>
