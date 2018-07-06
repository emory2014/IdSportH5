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
                <li> Masukkan Kartu ATM BCA Anda.  </li>
                <li>Masukkan PIN.</li>
                <li>Pilih “Transaksi Lainnya”.  </li>
                <li>Pilih “Transfer”.</li>
                <li>Pilih “Ke BCA Virtual Account”.</li>
                <li>Masukkan nomor virtual account (<span class="yellow">2202020202020202</span>) yang Anda terima, kemudian pilih “BENAR”.</li>
                <li>Pastikan data virtual account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih “​BENAR​“.</li>
                <li>Cek & Perhatikan Konfirmasi Pembayaran dari layar ATM, jika sudah benar pilih “​YA​“, atau pilih “​TIDAK​” jika data di layar masih salah.</li>
                <li>Transaksi Anda sudah selesai. Pilih “​TIDAK​” untuk tidak melanjutkan transaksi lain.</li>
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
                <li>Buka Aplikasi BCA Mobile. </li>
                <li>Pilih “m-BCA”.</li>
                <li>Pilih “m-Transfer”. </li>
                <li>Pilih “BCA Virtual Account”.</li>
                <li>Masukkan nomor virtual account (<span class="yellow">2202020202020202</span>) , lalu pilih “OK”.</li>
                <li>Klik tombol “SEND” yang berada di sudut kanan atas aplikasi untuk melakukan transfer.</li>
                <li>Klik “OK” untuk melanjutkan pembayaran.</li>
                <li> Masukkan PIN Anda untuk meng-otorisasi transaksi.</li>
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
                <li>Login ke KlikBCA Individual. </li>
                <li>Pilih “Transfer”.</li>
                <li>Pilih “Transfer ke BCA Virtual Account”. </li>
                <li>Masukkan nomor virtual account (<span class="yellow">2202020202020202</span>) yang Anda terima.</li>
                <li>Pilih “Lanjutkan” untuk melanjutkan pembayaran.</li>
                <li>Masukkan “RESPON KEYBCA APPLI 1” yang muncul pada Token BCA Anda,lalu klik tombol “Kirim”.</li>
            </ol>
        </div>
</div>
</div>

<div :class="[method == 3 ? 'show':'hide']">
    <div class="mandiri tab-cont"><div class="item" :class="[active ==1 ? 'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div></div>
<div class="cont-panel" :class="[active ==1 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Masukkan kartu ATM.</li>
                <li>Kemudian pilih BAHASA INDONESIA.</li>
                <li>Ketik nomor PIN kartu ATM, kemudian tekan ENTER.</li>
                <li>Pilih menu BAYAR/BELI.</li>
                <li>Pilih menu MULTI PAYMENT. </li>
                <li>Ketik Kode Perusahaan, yaitu ”88908” (PT SINAR DIGITAL TERDEPAN), tekan BENAR.</li>
                <li>Isi No Virtual Account (<span class="yellow">89020202020202</span>) lengkap dengan code perusahaan, kemudian tekan BENAR.</li>
                <li>Isi NOMINAL(<span class="yellow">50000</span>), kemudian tekan BENAR. </li>
                <li>Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, kemudian tekan YA.</li>
                <li>Muncul konfirmasi pembayaran. Tekan YA untuk melakukan pembayaran.</li>
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
                <li>Kunjungi website Mandiri Internet Banking dengan alamat ​https://ib.bankmandiri.co.id/.</li>
                <li>Login dengan memasukkan USER ID dan PIN. </li>
                <li>Masuk ke halaman Beranda, lalu pilih “Bayar”.</li>
                <li>Pilih “Multi Payment”.</li>
                <li>Pilih “No Rekening Anda”. </li>
                <li>Pilih Penyedia Jasa “PT Sinar Digital Terdepan”.</li>
                <li>Pilih “No Virtual Account “.</li>
                <li>Masukkan nomor virtual account(<span class="yellow">890202020220202</span>) anda.  </li>
                <li>Masuk ke halaman konfirmasi 1.</li>
                <li>Apabila benar/ sesuai, klik tombol tagihan TOTAL, kemudian klik “Lanjutkan”.</li>
                <li>Masuk ke halaman konfirmasi 2.</li>
                <li>Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik “Kirim”.</li>
                <li>Masuk ke halaman konfirmasi pembayaran telah selesai.</li>
            </ol>
        </div>
</div>
</div>

<div :class="(method != 1 && method != 2 && method != 3 ) ? 'show':'hide'">
     <div class="tab-cont"><div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div><div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div><div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div></div>
    <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{this.getQueryString("m")}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Transaksi</p>
        <div class="text-cont">
            <ol>
                <li>Pergi ke ATM bank apa saja dan masukkan kartu ATM anda, pilih “Transaksi Lain” -> “Transfer” -> “Bank Lain”.</li>
                <li>Masukkan kode bank “<span class="yellow">013</span>” dan pilih “Benar”. </li>
                <li>Masukkan jumlah transfer （<span class="yellow">50000</span>).</li>
                <li>Masukkan kode transaksi: (<span class="yellow">5602020202020202</span>)</li>
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
                <li>Pilih “Transfer” pada menu</li>
                <li>Pilih “Ke Bank Lain” pada menu</li>
                <li>Masukan kode bank “Bank Permata(<span class="yellow">013</span>)”</li>
                <li>Masukan “Kode Pembayan” (<span class="yellow">5602020202020202</span>) pada tujuan transfer</li>
                <li>Masukan jumlah transfer Anda Rp(<span class="yellow">50000</span>) dan pilih “OK”</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
               
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
                <li>Pilih “Transfer” pada menu</li>
                <li>Pilih “Ke Bank Lain” pada menu</li>
                <li>Masukan kode bank “Bank Permata(<span class="yellow">013</span>)”</li>
                <li>Masukan “Kode Pembayan” (<span class="yellow">5602020202020202</span>) pada tujuan transfer</li>
                <li>Masukan jumlah transfer Anda Rp(<span class="yellow">50000</span>) dan pilih “OK”</li>
                <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
               
            </ol>
        </div>
</div>
</div>

</div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"

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
                }else{
                    return "Bank Lain"
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
               this.$http({
                    url: '/api/recharge/code/generate?token='+window.AndroidWebView.getAppToken()+'&amount='+this.getQueryString("m")+'&method='+this.getQueryString("method"),
                    method: 'get',
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