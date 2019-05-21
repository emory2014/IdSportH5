<template>
<div class="rule-container task">
  <BHeader title="Aturan Absen" class=""/>
  <!-- <div class="rule-title">Aturan Absen</div> -->
  <p class="text">
    Setiap hari masuk aplikasi untuk absen, klik gambar koin untuk mendapatkan jumlah koin emas<span class="rule-light">
      (tiap hari absen berturut-turut bisa dapat koin lebih banyak, jumlah absen akan diulang jika bolos)
    </span>
  </p>

  <p class="text">
    <i class="icon-coin"></i> Hari pertama absen dapat 30 koin
    <Br /><i class="icon-coin"></i> Hari kedua absen dapat 35 koin
    <Br /><i class="icon-coin"></i> Hari ketiga absen dapat 40 koin
    <Br /><i class="icon-coin"></i> Hari keempat absen dapat 135 koin
    <Br /><i class="icon-coin"></i> Hari kelima absen dapat 30 koin
    <Br /><i class="icon-coin"></i> Hari keenam absen dapat 35 koin
    <Br /><i class="icon-coin"></i> Hari ketujuh absen dapat 235 koin
  </p>
</div>
</template>
<script>
import BHeader from '../common/BHeader.vue'
export default {
  name: 'SignRule',
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
@import "../../assets/css/task.css"
</style>
