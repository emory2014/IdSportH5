<template>
<div>
  <div class="box-wrapper">
    <div class="coin-group" v-if="!isOpen">
      <img class="coin1" src="../../assets/images/task-coin1.png" />
      <img class="coin2" src="../../assets/images/task-coin1.png" />
      <img class="coin3" src="../../assets/images/task-coin1.png" />
      <img class="coin4" src="../../assets/images/task-coin1.png" />
      <img class="coin5" src="../../assets/images/task-coin2.png" />
      <img class="coin6" src="../../assets/images/task-coin2.png" />
      <img class="coin7" src="../../assets/images/task-coin2.png" />
    </div>
    <div class="fixed-num">Koin emas: {{gold}}</div>
    <a @click="toExchangePage()" class="task-link">Segera tukarkan ></a>
    <router-link to="/sign-rule">
      <div class="task-rule"> <i class="icon-task-info">!</i> Peraturan main</div>
    </router-link>
    <div class="task-light">

      <div class="outer-circle" v-if="data">


        <span class="box-open-btn" @click="openBox()" v-if="!isOpen">Buka Kotak Harta Karun</span>
        <span class="box-open-btn" id="countdown" v-else>03:59:00</span>
        <!-- <div class="inner-circle"> -->
        <img class="box" v-if="!isOpen" src="../../assets/images/box@2x.png" />
        <img class="box" v-else src="../../assets/images/box-gray@2x.png" />
        <!-- </div> -->

      </div>
    </div>
  </div>

  <div class="open-mask" :class="[boxShow ? 'show':'hide']">
    <div class="open-text">+{{prize}}</div>
    <div class="open-img-box">
      <img class="box" src="../../assets/images/open-box.gif">
      <img class="light" src="../../assets/images/light@2x.png" />
    </div>
  </div>

  <div class="days-wrapper" v-if="data">
    <ul class="task-day-ul">

      <li :class="[index < continuousDays ? '':'disabled']" v-for="(item,index) of list" :key="index">
        <span class="coin">+{{item.bonus}}</span>
        <span class="day">{{item.day}}</span>
      </li>
    </ul>
    <div v-if="!today" class="task-btn-large" @click="signIn()"> Absen untuk dapat Koin</div>
    <div v-else class="task-btn-large disabled"> 已连续签到{{continuousDays}}天</div>

  </div>
  <p class="task-title">
    Tugas Khusus <router-link :to="{ path: '/task-record', query: {from: 'task'} }"><span class="right">Riwayat Tugas ></span></router-link>
  </p>
  <p class="task-subtitle">
    Semakin tinggi koin untuk membuka tugas, semakin
    besar juga penghasilan yang didapatkan
  </p>
  <ul class="task-ul" v-if="data && missions">
    <li v-for=" (item,index) of missions" :Key="item.id">
      <p><span class="title-ogrange">{{item.title}}</span> <span class="task-coin">Dapat {{item.income}} <i class="icon-coin"></i></span></p>
      <p class="mark" @click="togglePanel(index)">(Baca iklan berturut-turut (<span class="red">{{item.continuous}}</span>/{{item.days}}) <span class="icon-task-arrow" :class="[item.unfold?'open':'']"></span></p>
      <div class="unfold-panel" :class="[item.unfold ? 'open':'']">
        <!-- <div class="scroll-panel" v-if="item.date">
          <span v-for="(i,index) of item.date" :key="index">
            <span v-if="index != 0" class="scroll-devider" :class="[index < item.continuous ? '':'gray']"></span><span class="scroll-item" :class="[index < item.continuous ? '':'gray',item.date.length > 3 ? '':'three']">{{i}}</span>
          </span>
        </div> -->
        <TaskScrollItem :data="item.date" :continuous="item.continuous" />
        <div class="panel-text">{{item.description}}</div>
        <!-- 1 挑战任务 -->
        <div v-if="item.status == 1" class="unfold-btn" @click="confirmBuyTask(item.id,item.expend)"><span class="wrapper">Selesaikan<br>Tugas</span></div>
        <!-- 2 继续挑战 -->
        <div v-else-if="item.status == 2" class="unfold-btn" @click="continueTask(item.id)">Lanjutkan</div>
        <!-- 3 明天继续 -->
        <div v-else-if="item.status == 3" class="unfold-btn gray"><span class="wrapper">Selesaikan<br>besok</span></div>
        <!-- 4 已完成 -->
        <div v-else="item.status == 4" class="unfold-btn gray">Berhasil</div>


      </div>
      <!-- <span v-if="item.status == 'finished'" class="item-btn gray">{{item.status}}</span>
      <span @click="goToNews()" v-if="item.status != '已完成'" class="item-btn">{{item.status}}</span> -->
    </li>
  </ul>
  <!-- 确认购买弹框 -->
  <div class="task-confirm-mask" :class="[confirmShow ? 'show' : 'hide']">
    <div class="task-confirm-cont">
      <div class="task-confirm-text">Kamu yakin mau pakai<br>
        {{expend}} koin untuk selesaikan misi?
      </div>
      <div class="task-confirm-btn" @click="() => {this.confirmShow = false}">TIDAK</div>
      <div class="task-confirm-btn ok" @click="bugTask()">Selesaikan</div>
    </div>
  </div>

  <!-- 购买成功弹框 -->
  <div class="task-confirm-mask" :class="[successShow ? 'show' : 'hide']">
    <div class="task-confirm-cont">
      <div class="task-confirm-text success">
        Kamu telah berhasil membuka tugas,
        selesaikan tugas berturut-turut untuk
        dapatkan bonus yang lebih banyak

      </div>
      <div class="task-success-btn">Dapetin Bonus</div>
    </div>
  </div>

  <!-- 余额不足弹框 -->
  <div class="task-confirm-mask" :class="[balanceShow ? 'show' : 'hide']">
    <div class="task-confirm-cont">
      <div class="task-confirm-text success">
        Saldo koin kamu tidak cukup, silahkan
        isi ulang koin. Setelah isi ulang berhasil,
        kembali ke Tugas untuk ambil tugas.
      </div>
      <router-link :to="{ path: '/recharge', query: {from: 'task'} }">
        <div class="task-success-btn">Top Up </div>
      </router-link>

    </div>
  </div>

</div>
</template>
<script>
import TaskScrollItem from './TaskScrollItem.vue'
export default {
  name: 'Task',
  data() {
    return {
      data: null,
      isOpen: 0,
      boxShow: false,
      count: '',
      timestamp: 0,
      list: [],
      timeout: null,
      interval: null,
      gold: '--',
      continuousDays: 0,
      today: false,
      token: '',
      prize: '',
      confirmShow: false,
      successShow: false,
      balanceShow: false,
      missions: [],
      activeMissionsId: '',
      expend: ''
    }
  },
  components: {
    TaskScrollItem
  },
  props: {

  },
  created() {
    this.$nextTick(() => {

    })
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  },
  methods: {
    confirmBuyTask(id, expend) {
      console.log(124)
      this.confirmShow = true
      this.activeMissionsId = id
      this.expend = expend
    },
    continueTask(id) {
      this.activeMissionsId = id
      this.$router.push({
        path: '/ad',
        query: {
          mid: id
        }

      })
    },
    bugTask() {
      this.token = this.getAppToken()
      this.$http({
        url: '/api/mission/buy',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          mid: this.activeMissionsId
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.data.status.code == 200) {
          this.$router.push({
            path: '/ad',
            query: {
              mid: this.activeMissionsId
            }

          })
        } else if (res.data.status.code == 518) {
          this.confirmShow = false
          this.balanceShow = true
        } else if (res.data.status.code == 401) {
          //window.AndroidWebView.closeActivities();

          window.AndroidWebView.loginApp();

        } else {
          this.$toast.bottom(res.data.status.message)
        }


      }).catch((res) => {
        console.log('error: ', res);
      });
    },
    togglePanel(index) {
      let obj = this.missions
      obj[index].unfold = !obj[index].unfold
      this.missions = obj
    },
    goToNews() {
      window.AndroidWebView.showNewsList();
    },
    goToInvite() {
      //  window.location.href = "/web/cinvite?from=task"
      window.AndroidWebView.inviteFriends();
    },
    toExchangePage() {
      // window.AndroidWebView.showGoldMall();
      window.AndroidWebView.showChangeRpc2Rp()

    },
    signIn() {
      // if ((!this.token || this.token == null) && !window.AndroidWebView) { // rn获取token
      //   this.token = this.$store.state.tokenModule.token
      // } else if ((!this.token || this.token == null) && window.AndroidWebView && window.AndroidWebView.getAppToken) {
      //   this.token = this.getAppToken()
      // }
      this.$http({
        url: '/api/signIn',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.data.status.code == 200) {
          this.continuousDays = parseInt(res.data.data.continuous)
          this.today = true
        } else if (res.data.status.code == 401) {
          window.AndroidWebView.loginApp();

        } else {
          window.AndroidWebView.showContent(res.data.status.message)
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    },

    openBox() {
      this.token = this.getAppToken()
      this.$http({
        url: '/api/openTreasureBox',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        if (res.data.status.code == 200) {
          this.prize = res.data.data.gold
          this.boxShow = true
          setTimeout(() => {
            this.boxShow = false
            this.isOpen = true
            this.timestamp = res.data.data.next - Math.floor((new Date()).getTime() / 1000)
            this.countDown(this.timestamp)
          }, 3000)

        } else if (res.data.status.code == 401) {
          //window.AndroidWebView.closeActivities();

          window.AndroidWebView.loginApp();

        } else {
          window.AndroidWebView.showContent(res.data.status.message)
        }


      }).catch((res) => {
        console.log('error: ', res);
      });
    },
    countDown(sec) {
      this.timeout = setTimeout(function() {
        var hour = 0
        var minute = 0
        var second = 0
        this.interval = setInterval(function() {
          if (sec >= 60) {
            minute = Math.floor(sec / 60)
            second = sec % 60
            if (minute >= 60) {
              hour = Math.floor(minute / 60)
              minute = minute % 60
            } else {
              hour = 0
            }
          } else {
            second = sec
            hour = 0
            minute = 0
          }
          hour = parseInt(hour) < 10 && parseInt(hour) >= 0 ? '0' + hour : hour
          minute = parseInt(minute) < 10 && parseInt(minute) >= 0 ? '0' + minute : minute
          second = parseInt(second) < 10 && parseInt(second) >= 0 ? '0' + second : second
          var countdownStr = hour + ':' + minute + ':' + second
          document.getElementById('countdown').innerHTML = countdownStr
          sec--
          // if (sec <= 0) {
          //   window.location.reload()
          // }
        }, 1000)
      }, 1000)
    },
    getData() {
      this.$http({
        url: '/api/mission',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {

        if (res.data.status.code == 200) {

          let dataObj = res.data.data
          this.data = dataObj
          this.list = dataObj.daysBonus
          this.gold = dataObj.gold
          this.continuousDays = dataObj.signIn.continuousDays
          this.today = dataObj.signIn.today
          this.isOpen = dataObj.treasureBox.isActive == 1 ? false : true
          this.timestamp = dataObj.treasureBox.next - Math.floor((new Date()).getTime() / 1000)
          this.missions = dataObj.missions
          if (this.isOpen) {
            this.countDown(this.timestamp) //结束时间到开始时间的时间差，单位秒
          }
        } else if (res.data.status.code == 401) {
          //window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();

        } else {
          // if (window.AndroidWebView && window.AndroidWebView.showContent) {
          //   window.AndroidWebView.showContent(res.data.status.message);
          // }
          window.AndroidWebView.showContent(res.data.status.message)
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    }
  },
  mounted() {
    var that = this;

    this.token = this.getAppToken()

    //获取默认数据
    this.getData()


    // var interval = setInterval(() => {
    //   if (that.token) {
    //     that.getData()
    //   } else {
    //     clearInterval(interval)
    //   }
    // }, 500)



  }
}
</script>
<style>
@import "../../assets/css/task.css"
</style>
