<template>
  <div class="question-container">
          <BHeader title="Pertanyaan Umum " backToApp={true} />
          <div class="ques-btn-group">
                <a href="#baru" @click="() => { active = 1 }"><span class="tag " :class="[active == 1 ? 'active':'']">Member Baru</span></a>
                <a href="#rpc" @click="() => { active = 2 }"><span class="tag" :class="[active == 2 ? 'active':'']">RPC</span></a>
                <!-- <span class="tag">Mengundang</span>
                <span class="tag">Penarikan</span>
                <span class="tag">Akun</span> -->
          </div>
          <div class="ques-title" id="baru">
              Member Baru
          </div>
          <p class="sub-title " :class="[ open == 1 ? 'open':'']" @click="fold(1)">Kenapa NewsCat bisa kasih bonus? <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 1 ? 'open':'']" @click="fold(1)">
               NewsCat mendukung peyediaan pengalaman membaca bacaan yang berkualitas.

                Di dalam pengalaman membaca tersebut, kami memberikan apresiasi dalam bentuk RPC, sebagai pengganti uang.

                Selain kalian bisa menambah pengetahuan menjadi lebih luas, kalian juga bisa mendapatkan penghasilan.
          </div>
          <!-- <p class="sub-title">Cara menggunakan NewsCat <i class="icon-link"></i></p> -->
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
            RPC adalah sebuah unit mata uang didalam NewsCat. Semua RPC yang dihasilkan bisa anda tukarkan

            dengan Pencairan Cepat atau Pencairan Bersyarat, bisa ditemukan di "Saya" -> "Penghasilan Saya"
          </div>
          <p class="sub-title" :class="[ open == 4 ? 'open':'']" @click="fold(4)">Bonus Absen/Bonus Buka Peti Emas<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 4 ? 'open':'']" @click="fold(4)">
            Bonus Absen : Buka NewsCat selama 7 hari secara berurutan pada

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


            Situasi 4 : Silahkan periksa kembali versi aplikasi NewsCat pastikan versi

            NewsCat kamu adalah yang paling baru, jika belum silahkan perbaharui

            ke versi paling baru.<br>
          </div>
          <!-- <div class="ques-title">
              Mengundang
          </div>
          <p class="sub-title">Bagaimana cara mengundang teman?<i class="icon-arrow"></i></p>
          <div class="ques-title">
              Penarikan
          </div>
          <p class="sub-title">Butuh berapa lama untuk bisa masuk rekening?<i class="icon-arrow"></i></p>
          <div class="ques-title">
              Akun
          </div>
          <p class="sub-title">Tidak bisa daftar?<i class="icon-arrow"></i></p>
          <p class="sub-title two">Peraturan jika kedapatan curang dan<br> hukumannya<i class="icon-arrow"></i></p>
          <p class="sub-title">Kenapa  akun saya diblokir?<i class="icon-arrow"></i></p> -->

  </div>
</template>
<script>
import BHeader from "./common/BHeader"
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

.ques-btn-group {
    padding: 12px 20px 0 20px;
    box-sizing: border-box;
    margin-top: 20px;

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
    background: url(../assets/images/icon-arrow-down@2x.png) no-repeat center;
    background-size: 15px 12px;
    position: relative;
    top: 3px;
}

.open .icon-arrow {
    background: url(../assets/images/icon-arrow-up@2x.png) no-repeat center;
    background-size: 15px 12px;
}

.icon-link {
    display: inline-block;
    float: right;
    width: 15px;
    height: 15px;
    margin-right: 13px;
    vertical-align: middle;
    background: url(../assets/images/icon-link@2x.png) no-repeat center;
    background-size: 15px 15px;
    position: relative;
    top: 3px;
}
</style>
