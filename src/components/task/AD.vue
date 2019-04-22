<template>
<div class="rule-container" :style="{paddingTop: $route.query.from == 'task' ? '72px': '50px'}">
  <header class="header" :style="{borderTop: $route.query.from == 'task' ? '22px solid #fff': ''}">
    　<i class="nc-icon-prev" @click="goBack()"></i>
    <div class="task-process-sec" v-if="data">
      <div class="label"><span class="hightlight">{{task}}</span>/{{allTask}}</div>
      <div class="process"><span class="finished" :style="contentStyleObj"></span></div>
      <div class="label">00:00:{{countText}}</div>
    </div>
  </header>
  <div class="ad-cont" v-if="data">
    <div class="ad-title">
      {{data.title}}
    </div>
    <div v-html="data.body">

      <!-- VIVA – Kepala Pusat Studi Ekonomi dan Kebijakan Publik Universitas Gajah Mada, Tony Prastiantono, menepis pandangan Wakil Presiden Jusuf Kalla yang mengatakan pelemahan nilai tukar rupiah terhadap dolar AS bisa menggenjot ekspor maupun
      meningkatkan keuntungan para eksportir.

      Dia mengutarakan, jika dirujuk pada tren pelemahan rupiah yang terjadi pada masa kini, di mana hanya melemah dari kisaran Rp13 ribu menuju Rp14 ribu tidaklah bisa dikatakan mampu mendorong ekspor secara signifikan, sebab rentang pelemahan
      tersebut menurutnya tidak elastisitas sebagaimana yang terjadi ketika tahun 1998, yang melemah dari Rp2.300 ke Rp17 ribu.

      "Waktu itu memang dengan lemahnya rupiah sooner or later Indonesia mendapatkan manfaat, yaitu ekspor kita naik. Bahkan mabel di Jogja waktu itu orang bongkar rumah dijual ke luar negeri saking murahnya. Jadi memang waktu itu harus diakui
      pelemahan rupiah jadi faktor pelan pelan Indonesia recover. Tapi sekarang situasinya beda," ujarnya di Jakarta, Rabu 9 Mei 2018. -->

    </div>
  </div>


  <!-- 中途返回提示用户 -->
  <div class="task-confirm-mask" :class="[exitShow ? 'show':'hide']">
    <div class="task-confirm-cont">
      <div class="task-confirm-text success">Tinggal 1 langkah lagi bisa dapat
        penghasilan iklan, yakin mau ditutup?
        Jika ditutup, kamu harus beli koin
        lagi untuk menyelesaikan tugas loh.
      </div>
      <div class="task-confirm-btn" @click="exitAd()">TUTUP</div>
      <div class="task-confirm-btn ok" @click="() => { this.exitShow = false }">Lanjut baca</div>
    </div>
  </div>

  <!-- 完成n天任务提示用户 -->
  <div class="task-confirm-mask" :class="[someTaskShow ?'show':'hide']">
    <div class="task-confirm-cont">
      <div class="task-confirm-text success">
        <span style="color:#E93F3F">SELAMAT!</span><br>
        Selangkah lagi kamu bakal sukses,
        setelah menyelesaikan tugas {{allTask - task}} hari lagi,
        dapatkan semua koinnya.
        Lanjutkan besok.
      </div>
      <router-link to="/task">
        <div class="task-success-btn">Oke</div>
      </router-link>
    </div>
  </div>

  <!-- 所有任务完成弹框 -->
  <div class="task-confirm-mask" :class="allTaskShow ? 'show': 'hide'">
    <div class="task-confirm-cont finished">
      <div class="task-confirm-text success">
        Selamat kamu telah menyelesaikan
        tugas bonus {{gold}} koin. Klik Saya
        Penghasilan Saya untuk cek
        bonusnya ya.
      </div>
      <!-- 查看 -> 跳转我的收益 -->
      <div class="task-success-btn" @click="goToMyIncome()">Cek Bonus</div>
      <!-- <span class="task-close" @click="() => { this.allTaskShow = false }">×</span> -->
    </div>
  </div>
</div>
</template>
<script>
import BHeader from '../common/BHeader.vue'
export default {
  name: 'AD',
  components: {
    BHeader
  },
  data() {
    return {
      data: null,
      count: 0,
      task: 1,
      token: '',
      allTask: 3,
      contentStyleObj: {
        width: ''
      },
      countText: '--',
      timeout: null,
      exitShow: false,
      someTaskShow: false,
      allTaskShow: false,
      gold: '', //奖励金币
    }
  },
  methods: {
    goToMyIncome() {
      window.AndroidWebView.showMyIncomeGold();
    },
    goBack() {
      if (this.count > 0) {
        this.exitShow = true
      } else {
        window.history.go(-1)
        clearTimeout(this.timeout)
      }
    },
    exitAd() {
      window.history.go(-1)
    },
    getparam(name) {
      let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
      if (reg.test(window.location.href)) {
        let str = unescape(RegExp.$2.replace(/\+/g, " "))
        if (str.indexOf("#") > -1) {
          let i = str.indexOf("#")
          return str.substring(0, i)
        } else {
          return unescape(RegExp.$2.replace(/\+/g, " "))
        }
      }
      return undefined
    },
    getHeight() {
      this.contentStyleObj.width = this.task * 100 / this.allTask + '%';
    },
    countDown() {
      if (this.count > 0) {
        this.timeout = setTimeout(() => {

          this.count--
          if (this.count > 9) {
            this.countText = this.count
          } else {
            this.countText = '0' + this.count
          }
          this.countDown()
        }, 1000);
      } else {
        clearTimeout(this.timeout)

        this.finishTask()
      }

    },
    finishTask() {
      this.token = this.getAppToken()
      this.$http({
        url: '/api/mission/submit',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          mid: this.$route.query.mid
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        let resData = res.data
        if (resData.status.code == 200) {
          this.task++
          this.getHeight()
          this.gold = resData.data.income
          if (resData.data.status == 1) {
            this.someTaskShow = true
          } else {
            this.allTaskShow = true
          }
        } else if (resData.status.code == 401) {
          //window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();
        } else {
          window.AndroidWebView.showContent(resData.status.message);
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    },
    getData() {
      this.token = this.getAppToken()
      this.$http({
        url: '/api/mission/page',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          mid: this.$route.query.mid
          // mid: 4
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        let resData = res.data
        if (resData.status.code == 200) {
          this.data = resData.data
          this.task = resData.data.continuous
          this.allTask = resData.data.days
          this.count = resData.data.time
          this.countText = resData.data.time
          this.getHeight()
          this.countDown()
        } else if (resData.status.code == 401) {
          //window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();
        } else {
          window.AndroidWebView.showContent(resData.status.message);
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    }
  },
  mounted() {

    this.getData()
  }

}
</script>
<style>
@import "../../assets/css/task.css"
</style>
