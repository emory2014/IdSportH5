<template>
  <div class="question-invie-container">
          <BHeader title="Tutorial Cara Mengundang Teman" style="left:0px"/>
          <p class="ques-invite-title">
            Bagaimana mengundang teman?
          </p>
         <div class="ques-invite-text">
             Saat Anda mengadakan pesta dengan teman dan keluarga, mengobrol, bertemu, dan sebagainya.
            Anda dapat merekomendasikan 
            Ayo Lari langsung kepada kerabat Anda, 
            menggunakan Facebook, WhatsApp atau langsung membagikan URL yang disalin ke teman Anda untuk diunduh dan diinstal.
            
         </div>
        <ol class="ques-invite-ol">
            <li>
               Buka <span class="yellow">Ayo Lari</span>, pada pojok kanan bawah klik  <span class="yellow">"Saya" (1) </span>
            </li>
            <li>
              klik <span class="yellow"> "Undang Teman" (2) </span> untuk masuk ke halaman mengundang teman.
            <img src="../../assets/images/question/que1@2x.png" />
            </li>
            <li>
                 Klik "Copy Url" untuk bisa langsung kirim tautan ke 
                temanmu atau grup, bagikan kebanyak teman 
                untuk unduh Ayo Lari, juga bisa lewat Facebook,
                WhatsApp untuk bagikan tautan. Saat teman anda 
                klik tautan yang kamu kirim, mereka akan diminta 
                masukkan "Nomor Handphone", klik "Segera 
                Unduh" akan langsung diarahkan ke Google Play 
                Store untuk unduh aplikasi Ayo Lari, 
                mengundang teman sukses.
                <img src="../../assets/images/question/que2@2x.png" />
                <img src="../../assets/images/question/que3@2x.png" />
                <!-- <img src="../../assets/images/question/ques4@2x.png" /> -->
            </li>
        </ol>
  </div>
</template>
<script>
import BHeader from "../common/BHeader"
export default {
  name: 'HowInvite',
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

.question-invie-container{
    padding: 55px 20px 20px 20px;
}

.ques-invite-title {
    color: #333;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    margin: 15px 0;
}

.ques-invite-text{
    color: #666;
    font-size: 14px;
}

.ques-invite-ol{
    color: #666;
    font-size: 14px;
    padding-left: 12px;
}

.ques-invite-ol li {
    list-style: decimal;
    
}

.ques-invite-ol li img {
    width: 90%;
    display: block;
    margin:15px auto;
}

</style>
