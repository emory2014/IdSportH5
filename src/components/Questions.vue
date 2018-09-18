<template>
  <div class="question-container">
          <BHeader title="Pertanyaan Umum " backToApp={true} />
          <div class="ques-btn-group">
                <span class="tag active">Member Baru</span>
                <span class="tag">RPC</span>
                <span class="tag">Mengundang</span>
                <span class="tag">Penarikan</span>
                <span class="tag">Akun</span>
          </div>
          <div class="ques-title">
              Member Baru
          </div>
          <p class="sub-title open">Kenapa NewsCat bisa kasih bonus? <i class="icon-arrow"></i></p>
          <div class="ques-anwser">
               NewsCat mendukung untuk menyediakan 
                pengalaman membaca bacaan yang berkualitas.
                Di dalam pengalaman membaca tersebut, kami 
                memberikan apresiasi dalam bentuk RPC, sebagai 
                pengganti uang. 
                Jadi selain kalian bisa menambah pengetahuan 
                menjadi lebih luas, kalian juga bisa mendapatkan 
                penghasilan.
          </div>
          <p class="sub-title">Cara menggunakan NewsCat <i class="icon-link"></i></p>
          <p class="sub-title">Berita tidak muncul <i class="icon-arrow"></i></p>
          <div class="ques-title">
              RPC
          </div>
          <p class="sub-title">Apa itu RPC?<i class="icon-arrow"></i></p>
          <p class="sub-title">Bonus Absen/Bonus Buka Peti Emas<i class="icon-arrow"></i></p>
          <p class="sub-title">Baca Berita tidak dapat RPC terus bagaimana?<i class="icon-arrow"></i></p>
          <div class="ques-title">
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
          <p class="sub-title">Kenapa  akun saya diblokir?<i class="icon-arrow"></i></p>

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
    padding: 20px 20px 0 20px;
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
    padding: 15px;
    background: #f5f5f5;
    font-size: 14px;
    color: #666;
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
