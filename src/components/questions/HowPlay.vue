<template>
  <div class="question-container">
          <BHeader title="Cara menggunakan Ayo Lari" />
          <div class="fixContant">
          <div class="ques-play-title">
               <img src="../../assets/images/question/logo@2x.png" />
               <p>Mengajari kamu bermain Ayo Lari <br>
                    Mudah meghasilkan uang</p>
                    Masih tidak tahu cara menghasilkan uang jajan!
                    Dibawah ini kita sama sama liat bagaimana
                    menghasilkan uang.
          </div>

          <!-- <p class="sub-title bt" :class="[ open == 1 ? 'open':'']" @click="fold(1)">Bonus membaca artikel<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 1 ? 'open':'']" @click="fold(1)">
               (1) Setelah Login kalian bisa melihat artikel yang
      kami sarankan untuk ada baca di Ayo Lari,jika
      kalian melihat artikel yang menarik kalian bisa
      langsung klik untuk baca, baca seluruhnya,kalian
      bisa secara acak dapat bonus sampai <span class="redMark">100 RPC</span>.
      <img src="../../assets/images/question/readBonus@2x.png" />
      (2) Setiap kamu membaca artikel menarik dan kamu
      bagikan ke teman-teman,kalian bisa dapat bonus <span class="redMark">30 RPC</span> (teman yang sama hanya dihitung 1 kali
      bonus)
      <img src="../../assets/images/question/ques6@2x.png" />

          </div> -->

          <p class="sub-title" :class="[ open == 2 ? 'open':'']" @click="fold(2)">Bonus Tugas<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 2 ? 'open':'']" @click="fold(2)">
              (1) Setiap hari absen bisa dapat RPC : Buka News
                Cat  klik <span class="redMark">"Tugas" -> "Absen"</span> langsung dapat bonus.  (Perhatikan: Jika tidak absen sehari, absen akan
                diulang dari awal)
                <img src="../../assets/images/question/Bitmap@2x.png" />
            (2) Buka Kotak Emas : buka kotak emas tiap 4 jam
                sekali, bonus 10 RPC tiap kali buka kotak emas
                <img src="../../assets/images/question/Bitmap8@2x.png" />
            (3) tantangan : beli tugas yang dipilih,dan menyelesaikan tugasnya,
                jika tantangan berhasil,maka koin yang dibeli sebelumnya akan dibalikan bahkan dapat bonus lebih.
                <img src="../../assets/images/question/Bitmap9@2x.png" />

          </div>

          <p class="sub-title" :class="[ open == 3 ? 'open':'']" @click="fold(3)">Bonus tinggi mengundang teman <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 3 ? 'open':'']" @click="fold(3)">
              Bisa langsung dapat bonus tertinggi jika mengundang teman, setiap mengundang 1 orang teman kamu akan dapat Rp.6000 (dibagikan bertahap,
              silahkan cek peraturan untuk lebih detail);<br>
              Buka Ayo Lari klik <span class="redMark">"Saya" -> "Mengundang teman" -> salin URL,</span> bagikan URL Undangan lewat Facebook dan WhatsApp, lalu teman kamu akan memasukkan nomor handphone dan langsung unduh lalu
                pendaftaran berhasil, mengundang teman juga telah berhasil.
                <img src="../../assets/images/question/que10@2x.png" />
                <img src="../../assets/images/question/que11@2x.png" />

          </div>

        <p class="sub-title" :class="[ open == 4 ? 'open':'']" @click="fold(4)">Penghasilan dan penarikan <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 4 ? 'open':'']" @click="fold(4)">
            (1) Cek Penghasilan : Bonus RPC dapat dihasilkan
            dari kegiatan diatas, bisa dicek di <span class="redMark">"Saya ->
            Penghasilan saya"</span>.
                <img src="../../assets/images/question/que12@2x.png" />
                <img src="../../assets/images/question/que13@2x.png" />
            (2) Tukarkan RPC dan tarik uang tunai : RPC yang didapat dapat ditukarkan dengan Pencairan Cepat atau Pencairan Bersyarat.Pencairan Cepat: 1 RPC = Rp 0.05,
            - dan RPC yang ditukarkan bisa langsung dicairkan.Pencairan Bersyarat : 1 RPC = Rp 2,- lalu RPC yang diturkankan harus mengundang teman baru bisa dicairkan.
            (Perhatikan : Waktu melakukan penarikan, informasi rekening harus diisi dengan benar)
            Langkah-langkah melakukan penarikan : Klik <span class="redMark">"Saya" -> "Tukar Koin" -> "Pilih Pencairan Cepat atau Pencairan Bersyarat"</span>
                <img src="../../assets/images/question/que14@2x.png" />
                <img src="../../assets/images/question/que15@2x.png" />
            Penarikan : klik <span class="redMark">"Saya" -> "Tarik Tunai" -> "Pilih Pencairan Cepat atau Pencairan Bersyarat"</span>
                <img src="../../assets/images/question/que16@2x.png" />
                <img src="../../assets/images/question/que17@2x.png" />

          </div>
          </div>
        <a href="http://www.danaunta.com/page/invite"><div class="ques-play-btn"> Saya mengerti, mulai hasilkan </div></a>
  </div>
</template>
<script>
import BHeader from "../common/BHeader"
export default {
  name: 'HowPlay',
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
    padding-top: 70px;
}

a{
    text-decoration: none;
}

.ques-play-title {
   text-align: center;
   font-size: 14px;
   color: #666;
   width: 80%;
   margin: 20px auto;
}

.ques-play-title p {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin: 10px;
}

.ques-play-title img {
    width: 91px;
}

/* .ques-btn-group .tag{
    font-size: 14px;
    color: #666;
    padding: 3px 10px;
    border-radius: 15px;
    border: 1px solid #999;
    margin: 0 12px 12px 0;
    box-sizing: border-box;
    display: inline-block;
} */

.sub-title{
    width: 90%;
    margin: auto;
    padding: 16px 0 15px 0px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #ddd;
    line-height: 1;
    box-sizing: border-box;
    height: 50px;
}

.sub-title.bt{
    border-top: 1px solid #ddd;
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

.ques-anwser img {
    width: 90%;
    display: block;
    margin: 15px auto;
}

.open.ques-anwser {
    padding: 15px;
    height: 100%;
}

.icon-arrow {
    display: inline-block;
    float: right;
    width: 9px;
    height: 5px;
    margin-right: 2px;
    vertical-align: middle;
    background: url(../../assets/images/arrow-down@2x.png) no-repeat center;
    background-size: 9px 5px;
    position: relative;
    top: 6px;
}

.open .icon-arrow {
    background: url(../../assets/images/icon-arrow-up@2x.png) no-repeat center;
    background-size: 9px 5px;
}



.ques-play-btn{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: #E93F3F;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 18px;
}
.fixContant {
    padding-bottom: 50px;
}
.redMark {
    color:#E93F3F;
}
</style>
