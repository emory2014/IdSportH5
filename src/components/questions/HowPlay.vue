<template>
  <div class="question-container">
          <BHeader title="Cara menggunakan NewsCat" />
          <div class="ques-play-title">
               <img src="../../assets/images/question/logo@2x.png" />
               <p>Mengajari kamu bermain NewsCat <br>
                    Mudah meghasilkan uang</p>
                    Masih tidak tahu cara menghasilkan uang jajan!
                    Dibawah ini kita sama sama liat bagaimana 
                    menghasilkan uang.
          </div>
         
          <p class="sub-title bt" :class="[ open == 1 ? 'open':'']" @click="fold(1)">Bonus membaca artikel<i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 1 ? 'open':'']" @click="fold(1)">
               (1) Setelah Login kalian bisa melihat artikel yang 
      kami sarankan untuk ada baca di NewsCat,jika 
      kalian melihat artikel yang menarik kalian bisa 
      langsung klik untuk baca, baca seluruhnya,kalian 
      bisa secara acak dapat bonus sampai <span class="yellow">100 RPC</span>.
      <img src="../../assets/images/question/ques5@2x.png" />
      (2) Setiap kamu membaca artikel menarik dan kamu 
      bagikan ke teman-teman,kalian bisa dapat bonus <span class="yellow">30 RPC</span> (teman yang sama hanya dihitung 1 kali 
      bonus)
      <img src="../../assets/images/question/ques6@2x.png" />
      
          </div>
         
          <p class="sub-title" :class="[ open == 2 ? 'open':'']" @click="fold(2)">Bonus membaca artikel <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 2 ? 'open':'']" @click="fold(2)">
              (1) Setiap hari absen bisa dapat RPC : Buka News
                Cat  klik <span class="yellow">"Tugas" -> "Absen"</span> langsung dapat bonus.  (Perhatikan: Jika tidak absen sehari, absen akan 
                diulang dari awal)
                <img src="../../assets/images/question/ques7@2x.png" />
            (2) Buka Kotak Emas : buka kotak emas tiap 4 jam 
                sekali, bonus 10 RPC tiap kali buka kotak emas
                <img src="../../assets/images/question/ques8@2x.png" />
            (3) Tugas setiap hari : Buka NewsCat klik "Tugas", 
                selesaikan tugas sesuai dengan yang diminta. 
                (Perhatikan: Tugas setiap hari bisa dilakukan 
                setiap hari)
                <img src="../../assets/images/question/ques9@2x.png" />

          </div>
        
          <p class="sub-title" :class="[ open == 3 ? 'open':'']" @click="fold(3)">Bonus tinggi mengundang teman <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 3 ? 'open':'']" @click="fold(3)">
              Bisa langsung dapat bonus tertinggi jika mengundang teman, setiap mengundang 1 orang teman kamu akan dapat Rp.6000 (dibagikan bertahap, 
              silahkan cek peraturan untuk lebih detail);<br>
              Buka NewsCat klik "Saya" -> "Mengundang teman" -> salin URL, bagikan URL Undangan lewat Facebook dan WhatsApp, lalu teman kamu akan memasukkan nomor handphone dan langsung unduh lalu
                pendaftaran berhasil, mengundang teman juga telah berhasil.
                <img src="../../assets/images/question/ques10@2x.png" />
                <img src="../../assets/images/question/ques11@2x.png" />

          </div>

        <p class="sub-title" :class="[ open == 4 ? 'open':'']" @click="fold(4)">Penghasilan dan penarikan <i class="icon-arrow"></i></p>
          <div class="ques-anwser" :class="[ open == 4 ? 'open':'']" @click="fold(4)">
             (1) Cek Penghasilan : Bonus RPC dapat dihasilkan 
            dari kegiatan diatas, bisa dicek di <span class="yellow">"Saya -> 
            Penghasilan saya"</span>.
                <img src="../../assets/images/question/ques12@2x.png" />
                <img src="../../assets/images/question/ques13@2x.png" />
            (2) Tukarkan RPC dan tarik uang tunai : RPC yang didapat dapat ditukarkan dengan Pencairan Cepat atau Pencairan Bersyarat.
            Pencairan Cepat: 1 RPC = Rp 0.05,- dan RPC yang ditukarkan bisa langsung dicairkan.
            Pencairan Bersyarat : 1 RPC = Rp 2,- lalu RPC yang diturkankan harus mengundang teman baru bisa dicairkan. (Perhatikan : Waktu melakukan penarikan, informasi rekening harus diisi dengan benar)
            Langkah-langkah melakukan penarikan : Klik <span class="yellow">"Saya" -> "Tukar Koin" -> "Pilih Pencairan Cepat atau Pencairan Bersyarat"</span>
                <img src="../../assets/images/question/ques14@2x.png" />
                <img src="../../assets/images/question/ques15@2x.png" />
            Penarikan : klik "Saya" -> "Tarik Tunai" -> "Pilih Pencairan Cepat atau Pencairan Bersyarat"
                <img src="../../assets/images/question/ques16@2x.png" />
                <img src="../../assets/images/question/ques17@2x.png" />

          </div>
        <a href="http://www.newscat.com/page/invite"><div class="ques-play-btn"> Penghasilan dan penarikan </div></a>
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
    padding-top: 50px;
}

a{
    text-decoration: none;
}

.ques-play-title {
   text-align: center;
   font-size: 12px;
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
    width: 20%;
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
    margin: auto;
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



.ques-play-btn{
    width: 90%;
    margin: 10% auto;
    background: -webkit-linear-gradient(right,#FFC000,#FFE050);
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 25px;
    color: #fff;
    font-size: 18px;
    box-shadow: 1px 4px 16px 10px rgba(255, 194, 30, 0.1);
}
.yellow {
    color: #ffc000;
}

</style>
