<template>
  <div class="question-container">
          <BHeader title="Pertanyaan Umum " backToApp={true} />
          <div class="ques-btn-group">
                <a href="#baru" @click="() => { active = 1 }"><span class="tag " :class="[active == 1 ? 'active':'']">Member Baru</span></a>
                <a href="#rpc" @click="() => { active = 2 }"><span class="tag" :class="[active == 2 ? 'active':'']">RPC</span></a>
                <a href="#invite" @click="() => { active = 3 }"><span class="tag" :class="[active == 3 ? 'active':'']">Mengundang</span></a>
                <a href="#wd" @click="() => { active = 4 }"><span class="tag" :class="[active == 4 ? 'active':'']">Penarikan</span></a>
                <a href="#acount" @click="() => { active = 5 }"><span class="tag" :class="[active == 5 ? 'active':'']">Akun</span></a>
          </div>
          <div class="ques-title" id="baru">
              Member Baru
          </div>
          <p class="sub-title " :class="[ open == 1 ? 'open':'']" @click="fold(1)">Kenapa Danaunta bisa kasih bonus? <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 1 ? 'open':'']" @click="fold(1)">
               Danaunta mendukung peyediaan pengalaman membaca bacaan yang berkualitas.

                Di dalam pengalaman membaca tersebut, kami memberikan apresiasi dalam bentuk RPC, sebagai pengganti uang.

                Selain kalian bisa menambah pengetahuan menjadi lebih luas, kalian juga bisa mendapatkan penghasilan.
          </div>
          <router-link to="/how-play"><p class="sub-title">Cara menggunakan Danaunta <i class="icon-link"></i></p></router-link>
          <p class="sub-title" :class="[ open == 2 ? 'open':'']" @click="fold(2)">Berita tidak muncul <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 2 ? 'open':'']" @click="fold(2)">
              Apakah kamu tidak bisa memuat semua berita atau hanya sebagian saja?

                Silahkan untuk meng-screenshoot error atau masalah dengan judul berita

                dan kirimkan ke kami di Kendala Customer. Kami akan segera memeriksanya.
          </div>
          <div class="ques-title" id="rpc">
              RPC
          </div>
          <p class="sub-title" :class="[ open == 3 ? 'open':'']" @click="fold(3)">Apa itu RPC?<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 3 ? 'open':'']" @click="fold(3)">
            RPC adalah sebuah unit mata uang didalam Danaunta. Semua RPC yang dihasilkan bisa anda tukarkan

            dengan Pencairan Cepat atau Pencairan Bersyarat, bisa ditemukan di "Saya" -> "Penghasilan Saya"
          </div>
          <p class="sub-title" :class="[ open == 4 ? 'open':'']" @click="fold(4)">Bonus Absen/Bonus Buka Peti Emas<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 4 ? 'open':'']" @click="fold(4)">
            Bonus Absen : Buka Danaunta selama 7 hari secara berurutan pada

            "Tugas" bisa dapat bonus RPC, setiap hari bisa diambil! Bonus dibagi

            bertahap 7 hari dengan jumlah RPC 30, 35, 40, 135, 30, 35, 235. Jika

            ada 1 hari absen yang bolong, maka bonus akan diulang pada hari pertama.

            Bonus Buka Kotak Emas : Setiap 4 jam sekali buka bisa dapat bonus!
          </div>
          <p class="sub-title" :class="[ open == 5 ? 'open':'']" @click="fold(5)">Baca Berita tidak dapat RPC terus bagaimana?<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 5 ? 'open':'']" @click="fold(5)">
            Situasi 1: Sebagian besar berita perlu dimuat selama beberapa saat

            untuk mendapatkan koin emas, jadi harap bersabar menunggu.<br>


            Situasi 2 : Mungkin sebagian berita sudah kamu baca, bonus juga sudah

            didapat, setiap berita hanya bisa dapat bonus 1 kali.<br>


            Situasi 3 : Bonus dari berita sudah masuk, tapi karena jaringan bermasalah,

            pemberitahuan bonus tidak muncul.<br>


            Situasi 4 : Silahkan periksa kembali versi aplikasi Danaunta pastikan versi

            Danaunta kamu adalah yang paling baru, jika belum silahkan perbaharui

            ke versi paling baru.<br>
          </div>
          <div class="ques-title" id="invite">
              Mengundang
          </div>
          <router-link to="/how-invite"><p class="sub-title">Bagaimana cara mengundang teman?<i class="icon-link"></i></p></router-link>

          <div class="ques-title" id="wd">
              Penarikan
          </div>
          <p class="sub-title" :class="[ open == 6 ? 'open':'']" @click="fold(6)">Butuh berapa lama untuk bisa masuk rekening?<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 6 ? 'open':'']" @click="fold(6)">

            Setelah kamu meminta untuk penarikan, proses penarikan 1 - 7 hari untuk

            sampai masuk ke rekening. Jika ada hari libur, proses penarikan mungkin

            akan telat, harap bersabar untuk menunggu.
          </div>
          <div class="ques-title" id="acount">
              Akun
          </div>
          <p class="sub-title" :class="[ open == 7 ? 'open':'']" @click="fold(7)">Tidak bisa daftar?<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 7 ? 'open':'']" @click="fold(7)">
              Sekarang 1 nomor handphone hanya bisa daftar 1 handphone. Jika kamu

                sudah mendaftarkan nomor handphone kamu sebelumnya, maka kamu

                tidak bisa mendaftar lagi.
          </div>
          <p class="sub-title two" :class="[ open == 8 ? 'open':'']" @click="fold(8)">Peraturan jika kedapatan curang dan<br> hukumannya<i class="icon-arrow"></i></p>
           <div class="ques-anwser" :class="[ open == 8 ? 'open':'']" @click="fold(8)">
              Perilaku curang meliputi:<br>

                (1) Menggunakan nomor virtual, nomor kosong, nomor ponsel yang tidak terverifikas nama asli, dll.

                Undangan atau penghasilan nomor virtual;

               <br> (2) Menggunakan program yang tidak diizinkan (baca: bot, sistem kontrol grup, dll.),

                pembacaan tidak normal untuk mendapatkan penghasilan;

               <br> (3) Menggunakan program (perangkat lunak, skrip, dll.) Mengoperasikan

                undangan untuk memperoleh pendapatan, brush interface dan seterusnya mengundang temn dengan

                perilaku yang tidak normal..
          </div>
          <p class="sub-title" :class="[ open == 9 ? 'open':'']" @click="fold(9)">Kenapa  akun saya diblokir?<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 9 ? 'open':'']" @click="fold(9)">
                Danaunta memiliki mekanisme anti-kecurangan yang sangat ketat.

                Jika sekali ditemukan bahwa ada kecurangan maka akan dilarang

                selamanya,

                kami berharap semua orang dapat bekerja sama untuk demi menjaga

                kelancaran dan ketertiban Danaunta.
          </div>

  </div>
</template>
<script>
import BHeader from "../common/BHeader"
export default {
  name: 'Questions',
  components: {
      BHeader
  },
  data() {
    return {
        active: 1,
        open: 0
    }
  },
  methods: {
      fold(index){
          if(this.open == index) {
              this.open = 0
          }else{
              this.open = index

          }
      }
  }
}
</script>
<style>
body{
    margin: 0;
}

.question-container{
    padding-top: 50px;
}

a{
    text-decoration: none;
}

.ques-btn-group {
    padding: 12px 20px 0 20px;
    box-sizing: border-box;
}

.ques-btn-group .tag{
    font-size: 14px;
    color: #666;
    padding: 3px 10px;
    border-radius: 15px;
    border: 1px solid #999;
    margin: 0 12px 12px 0;
    box-sizing: border-box;
    display: inline-block;
}

.ques-btn-group .tag.active{
    background: #FFC000;
    color: #fff;
    border: none;
}

.ques-title{
    margin: 0;
    color: #FFC000;
    font-size: 16px;
    padding: 16px 0 16px 16px;
    background: #F5F5F5;
    font-weight:bold;
}

.sub-title{
    margin: 0px;
    padding: 18px 0 17px 16px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ddd;
    line-height: 1;
    box-sizing: border-box;
    height: 50px;
}
.sub-title.open {
    border-bottom: none;
}

.sub-title.two {
    padding-top: 10px;
}

.sub-title.two .icon-arrow{
    top: -5px;
}

.ques-anwser {
    padding: 0;
    background: #f5f5f5;
    font-size: 14px;
    color: #666;
    height: 0;
    overflow: hidden;
}

.open.ques-anwser {
    padding: 15px;
    height: 100%;
}

.icon-arrow {
    display: inline-block;
    float: right;
    width: 15px;
    height: 12px;
    margin-right: 13px;
    vertical-align: middle;
    background: url(../../assets/images/icon-arrow-down@2x.png) no-repeat center;
    background-size: 15px 12px;
    position: relative;
    top: 3px;
}

.open .icon-arrow {
    background: url(../../assets/images/icon-arrow-up@2x.png) no-repeat center;
    background-size: 15px 12px;
}

.icon-link {
    display: inline-block;
    float: right;
    width: 15px;
    height: 15px;
    margin-right: 13px;
    vertical-align: middle;
    background: url(../../assets/images/icon-link@2x.png) no-repeat center;
    background-size: 15px 15px;
    position: relative;
    top: 3px;
}
</style>
