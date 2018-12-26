<template>
<div>
  <div class="process-container">
    <BHeader :title="setTitle()" />
    <!-- <div class="" v-html="tab">
        <div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div>
   </div> -->
    <div :class="[method == 1 ? 'show':'hide']">
      <div class="cont-panel">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li> Pergi ke Alfa Group </li>
            <li>Katakan Kepada Kasir Ingin Melakukan
              Pembayaran Transaksi Online “<span class="yellow">BMY</span>”,
              Sebutkan Jumlah Tagihan (<span class="yellow">{{$route.query.m}}</span>) dan Kode
              Transaksi (<span class="yellow">{{data}}</span>)
            </li>
            <li> Kasir Akan Melakukan Konfirmasi dan Menyebutkan Nominal Yang Harus Dibayar </li>
            <li> Lakukan Pembayaran ke Kasir dan Dapatkan Struk Bukti Pembayaran, Setelah 1-3 Menit
              Barang Akan Otomatis Terkirim di Dalam Aplikasi </li>
          </ol>
        </div>
      </div>
    </div>

    <div :class="method == 2 ? 'show': 'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu. </li>
            <li>Pilih “Ke Bank Lain” pada menu .</li>
            <li>Masukan kode bank “<span class="yellow">009</span>” dan pilih “Benar” . </li>
            <li>Masukan Kode Pembayaran (<span class="yellow">{{data}}</span>) pada tujuan transfer .</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “Benar” .</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <p>Daftarkan VA anda untuk pertama kali</p>
          <ol>
            <li>Masuk ke Internet Banking atau Mobile Banking anda, kemudian pilih Daftar Rekening Tujuan. </li>
            <li>Pilih Rekening Bank Lain, kemudian klik "KIRIM" .</li>
            <li>Pilih Bank Tujuan "PT. Bank Negara Indonesia, TBK" </li>
            <li>Pilih Kota "JAKARTA".</li>
            <li>Pilih Kategori Penerima "Perusahaan".</li>
            <li>Pilih "YA" untuk Penduduk.</li>
            <li>Pilih "YA" untuk WNI</li>
            <li>Masukkan Nama Penerima “BLUEPAY”</li>
            <li>Masukkan No. Rekening Tujuan dengan Kode Pembayaran (<span class="yellow">{{data}}</span>) </li>
            <li>Masukkan 8 Angka yang tertera kedalam Key BCA Anda</li>
            <li>Masukkan Angka yang tertera setelah respon didapat dari Key BCA </li>
            <li>Lalu Klik Kirim</li>
          </ol>
          <p>Pembayaran VA yang sudah di daftarkan</p>
          <ol>
            <li>Masuk Ke Menu Transfer ke Rek Bank Lain Dalam Negri . </li>
            <li>Masukkan nomer rekening tujuan dengan nomor yang tadi didaftarkan .</li>
            <li>Masukkan nominal (<span class="yellow">{{amount}}</span>) </li>
            <li>Masukkan berita sesuai dengan keinginan (optional).</li>
            <li>Untuk Layanan Transfer pilih LLG.</li>
            <li>Masukkan 8 Angka yang tertera ke dalam Key BCA Anda .</li>
            <li> Masukkan Respon yang terdapat dalam Key BCA anda kedalamnya</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <p>Daftarkan VA anda untuk pertama kali</p>
          <ol>
            <li>Masuk ke m-BCA. </li>
            <li>Masukkan kode akses.</li>
            <li>Pilih “m-Transfer”</li>
            <li>Pada kolom Daftar Transfer, pilih “Antar Bank”.</li>
            <li>Pilih bank “BNI”, lalu masukkan Kode Pembayaran (<span class="yellow">{{data}}</span>).</li>
            <li>Klik “Send”.</li>
          </ol>
          <p>Pembayaran VA yang sudah di daftarkan.</p>
          <ol>
            <li>Masuk ke m-BCA. </li>
            <li>Masukkan kode akses.</li>
            <li>Pilih “m-Transfer”</li>
            <li>Pada kolom Transfer, pilih “Antar Bank”.</li>
            <li>Pilih bank “009-BNI”.</li>
            <li>Pilih rekening tujuan yang sudah didaftarkan .</li>
            <li>Masukkan jumlah uang (<span class="yellow">{{amount}}</span>)</li>
            <li>Lalu klik “Send”</li>
          </ol>
        </div>
      </div>
    </div>


    <!-- <div :class="method == 3 ? 'show': 'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih menu “Bayar/Beli”. </li>
            <li>Pilih “Lainnya > Lainnya > Multipayment”.</li>
            <li>Isi kode perusahaan “70002” dan pilih “Benar”. </li>
            <li>Isi kode merchant “078” dan pilih “Benar”.</li>
            <li>Masukkan 8 digit terakhir Kode Pembayaran (<span class="yellow">{{data}}</span>) dan pilih “Benar”.</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil dengan nominal (<span class="yellow">{{amount}}</span>).</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masuk ke situs <a href="https://ib.bankmandiri.co.id">https://ib.bankmandiri.co.id</a>. </li>
            <li>Lakukan log in dengan akun Mandiri Internet Banking Agan.</li>
            <li>Klik menu Bayar </li>
            <li>Pilih Multi Payment .</li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU.</li>
            <li>Isi kode merchant “078”.</li>
            <li> Masukkan Kode Pembayaran (<span class="yellow">{{data}}</span>) dengan 8 digit kode terakhir dan pilih “lanjut” </li>
            <li>Ikuti langkah selanjutnya hingga pembayaran selesai dengan nominal (<span class="yellow">{{amount}}</span>)</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Buka Aplikasi Mandiri Mobile Banking. </li>
            <li>Lakukan log in dengan akun Mandiri Mobile Banking.</li>
            <li>Pilih menu Bayar.</li>
            <li>Pilih Lainnya.</li>
            <li>Pilih Multi Payment.</li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU .</li>
            <li>Isi kode merchant “078” </li>
            <li>Masukkan Kode Pembayaran (<span class="yellow">{{data}}</span>) dengan 8 digit kode terakhir dan pilih “lanjut”</li>
            <li>Ikuti langkah selanjutnya hingga pembayaran selesai (<span class="yellow">{{amount}}</span>).</li>
          </ol>
        </div>
      </div>
    </div> -->


    <div :class="[method == 4 ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active ==1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active ==1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masukkan kartu dan pin ATM.</li>
            <li>Pilih menu “Transfer”.</li>
            <li>Pilih menu “Ke Rek Bank Lain”.</li>
            <li>Masukkan sandi Bank “<span class="yellow">009</span>” dan pilih “Benar”. </li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (<span class="yellow">{{data}}</span>) dan pilih “Benar”. </li>
            <li>Masukkan nominal isi ulang (<span class="yellow">{{amount}}</span>) dan pilih “Benar”.</li>
            <li>Pilih “Benar” pada halaman konfirmasi</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active ==2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Login di <a href="https://ib.bri.co.id/ib-bri/">https://ib.bri.co.id/ib-bri/</a>, masukkan username dan password.</li>
            <li>Pilih menu “Transfer”. </li>
            <li>Pilih menu “Bank Lain”.</li>
            <li>Pilih kode Bank “BankBNI (<span class="yellow">009</span>)”.</li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (<span class="yellow">{{data}}</span>). </li>
            <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>)</li>
            <li>Pilih OK</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masuk ke aplikias BRI Mobile.</li>
            <li>Pilih menu “Transfer”. </li>
            <li>Pilih menu “Bank Lain”.</li>
            <li>Pilih kode Bank “Bank BNI” (009).</li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan (<span class="yellow">{{data}}</span>) . </li>
            <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>). </li>
            <li>Pilih OK </li>
          </ol>
        </div>
      </div>

    </div>

    <div :class="[method == 3 || method == 5? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda. </li>
            <li>Pilih "Menu Lainnya" lalu pilih "Transfer".</li>
            <li>Pilih "Tabungan" lalu "Rekening BNI Virtual Account".</li>
            <li>Masukkan nomor Virtual Account Kode Pembayaran (<span class="yellow">{{data}}</span>) dan nominal yang ingin Anda bayar (<span class="yellow">{{amount}}</span>). </li>
            <li>Periksa kembali data transaksi kemudian tekan "Ya"</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Login di <a href="https://ibank.bni.co.id">https://ibank.bni.co.id</a>, masukkan User ID dan Password .</li>
            <li>Pilih “TRANSFER” lalu pilih “Tambah Rekening Favorit”. </li>
            <li>Jika Anda menggunakan desktop untuk menambah rekening, pilih “Transaksi” lalu pilih “Atur Rekening Tujuan” kemudian “Tambah Rekening Tujuan” </li>
            <li>Masukkan Nama dan nomor Virtual Account Kode Pembayaran (<span class="yellow">{{data}}</span>) Anda, lalu masukkan Kode Otentikasi Token .</li>
            <li>Jika Nomor rekening tujuan berhasil ditambahkan, kembali ke menu “TRANSFER”. </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
            <li>Pilih “TRANSFER ANTAR REKENING BNI”, kemudian pilih rekening tujuan </li>
            <li>Pilih Rekening Debit dan ketik nominal (<span class="yellow">{{amount}}</span>), lalu masukkan kode otentikasi token</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Login ke BNI Mobile Banking, masukkan User ID dan MPIN.</li>
            <li>Pilih menu "Transfer", lalu pilih "Antar Rekening BNI". </li>
            <li>Pilih "Input Rekening Baru"</li>
            <li>Masukkan "Rekening Debet", "Rekening Tujuan" Kode Pembayaran (<span class="yellow">{{data}}</span>) dan "Nominal" (<span class="yellow">{{amount}}</span>) kemudian klik "Lanjut".</li>
            <li>Periksa kembali data transaksi Anda, masukkan “Password Transaksi” kemudian klik “Lanjut”. </li>
          </ol>
        </div>
      </div>

    </div>



    <div :class="(method != 1 && method != 2 && method != 3 && method != 4 && method != 5) ? 'show':'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu.</li>
            <li>Pilih “Ke Bank Lain” pada menu.</li>
            <li>Masukkan kode bank “<span class="yellow">009</span>” dan pilih “Benar”. </li>
            <li>Masukan Kode Pembayaran（<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “Benar” </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil. </li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu. </li>
            <li>Pilih “Ke Bank Lain” pada menu. </li>
            <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
            <li>Masukkan "Kode Pembayaran"(<span class="yellow">{{data}}</span>) pada tujuan transfer</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>)dan pilih "OK".</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
          </ol>
        </div>
      </div>


      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu. </li>
            <li>Pilih “Ke Bank Lain” pada menu.</li>
            <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
            <li>Masukkan "Kode Pembayaran"(<span class="yellow">{{data}}</span>) pada tujuan transfer</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “OK”</li>
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
  data() {
    return {
      data: null,
      tab: '',
      html: '',
      method: parseInt(this.$route.query.method),
      active: 1,
      amount: this.$route.query.m
    }
  },
  methods: {
    setTitle() {
      let method = this.method;
      if (method == 1) {
        return "Bayar di Alfamart"
      } else if (method == 2) {
        return "BCA"
      } else if (method == 3) {
        return "Mandiri"
      } else if (method == 4) {
        return "BRI"
      } else if (method == 5) {
        return "BNI"
      } else if (method == 6) {
        return "CIMB"
      } else if (method == 7) {
        return "MEGA"
      } else if (method == 8) {
        return "PANIN"
      } else if (method == 9) {
        return "DANAMON"
      } else if (method == 10) {
        return "PERMATA"
      } else if (method == 11) {
        return "BII"
      }

    },
    setTab() {
      let method = this.getQueryString("method");
      if (method == 2) {
        this.tab = '<div class="tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div></div>'
      } else if (method == 3) {
        this.tab = '<div class="mandiri tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div></div>'
      }
    },
    addClass(index) {
      this.active = index
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    getData() {

      let token = this.getAppToken()
      this.$http({
        url: '/api/recharge/code/generate?t=' + (new Date()).getTime(),
        method: 'post',
        data: {
          token: token,
          amount: this.$route.query.m,
          method: this.$route.query.method
        }
      }).then((res) => {
        if (res.data.status.code == 200) {
          this.data = res.data.data

        } else {

        }

      }).catch((res) => {
        console.log('error: ', res);
      });

    },

  },
  mounted() {
    this.getData()
    this.setTab()
    console.log(this.method)
  }
}
</script>
<style>
@import "../../assets/css/recharge.css";
</style>
