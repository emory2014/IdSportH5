<template>
  <div style="padding-top:110px" class="taskBox">
    <header class="beheader">Tugas</header>

    <!-- 开宝箱成功弹窗 -->
    <div class="open-mask" :class="[boxShow ? 'show':'hide']">
      <div class="open-text">+{{prize}}Koin</div>
      <div class="open-img-box">
        <img class="box" src="../../assets/images/boxOpen@2x.png" />
        <!-- <img class="light" src="../../assets/images/light@2x.png" /> -->
      </div>
      <!-- 看视频，金币翻倍 -->
      <div
        class="double_btn"
        @click="watchVideo"
        v-if="showDoubleBtn"
      >Lihat 30s Video, Bonus Koin 2x</div>
      <!-- 收下 -->
      <div class="double_btn" v-if="Terima" @click="close()">Terima</div>
      <img class="close" @click="close()" src="../../assets/images/closeBox.png" />
    </div>
    <div class="days-wrapper" v-if="data">
      <div class="tanda">
        <span class="title">Tanda</span>
        <div class="fixed-num">Koin emas: {{gold}}</div>
        <div class="peraturan" @click="toExchangePage()">
          segera tukarkan &nbsp;
          <i class="arrowToRecord"></i>
        </div>
        <router-link to="/sign-rule" tag="span">
          <div class="segera">peraturan main</div>
        </router-link>
      </div>
      <ul class="task-day-ul">
        <li
          :class="[index < continuousDays ? '':'disabled']"
          v-for="(item,index) of list"
          :key="index"
        >
          <span class="coin">+{{item.bonus}}</span>
          <span class="day">{{item.day}}</span>
        </li>
      </ul>
      <div v-if="!today" class="task-btn-large" @click="handleBeforeSignIn()">Absen untuk dapat Koin</div>
      <div v-else class="task-btn-large disabled">Sudah absen {{continuousDays}} hari</div>
    </div>

    <div class="outer-circle" v-if="data">
      <!-- <span class="box-open-btn" @click="openBox()" v-if="!isOpen">Buka Kotak Harta Karun</span>
      <span class="box-open-btn" id="countdown" v-else>03:59:00</span>-->
      <div class="buka" v-if="!isOpen">
        <span>Buka Peti Emas</span>
        <span>Dapatkan hadiah</span>
        <span>menarik, buka setiap 4 jam</span>
      </div>
      <div class="buka" v-else>
        <span class="box-open-btn" id="countdown"></span>
        <span>Peti Harta</span>
        <span>Karun Segera Dibuka</span>
      </div>
      <img class="box" @click="openBox()" v-if="!isOpen" src="../../assets/images/chest@2x.png" />
      <img class="box" v-else src="../../assets/images/box-gray@2x.png" />
    </div>
    <!-- <p class="task-title" v-if="data">
      Tugas Khusus
      <router-link :to="{ path: '/task-record', query: {from: 'task'} }" tag="span">
        <span class="right">Riwayat Tugas</span>
      </router-link>
    </p>
    <p class="task-subtitle" v-if="data">
      Semakin tinggi koin untuk membuka tugas, semakin
      besar juga penghasilan yang didapatkan
    </p>

    <ul class="task-ul" v-if="data && missions">
      <li v-for=" (item,index) of missions" :Key="item.id">
        <p>
          <span class="title-ogrange">{{item.title}}</span>
          <span class="task-coin">
            Dapat {{item.income}}
            <i class="icon-coin"></i>
          </span>
        </p>
        <p class="mark" @click="togglePanel(index)">
          Baca iklan berturut-turut (
          <span class="red">{{item.continuous}}</span>
          /{{item.days}})
          <span class="icon-task-arrow" :class="[item.unfold?'open':'']"></span>
        </p>
        <div class="unfold-panel" :class="[item.unfold ? 'open':'']">
           <div class="scroll-panel" v-if="item.date">
          <span v-for="(i,index) of item.date" :key="index">
            <span v-if="index != 0" class="scroll-devider" :class="[index < item.continuous ? '':'gray']"></span><span class="scroll-item" :class="[index < item.continuous ? '':'gray',item.date.length > 3 ? '':'three']">{{i}}</span>
          </span>
          </div>
          <TaskScrollItem :data="item.date" :continuous="item.continuous" />
          <div class="panel-text">{{item.description}}</div>
          1 挑战任务
          <div
            v-if="item.status == 1"
            class="unfold-btn"
            @click="confirmBuyTask(item.id,item.expend,item.income)"
          >
            <span class="wrapper">
              Selesaikan
              <br />Tugas
            </span>
          </div>
          2 继续挑战
          <div
            v-else-if="item.status == 2"
            class="unfold-btn"
            @click="continueTask(item.id)"
          >Lanjutkan</div>
          3 明天继续
          <div v-else-if="item.status == 3" class="unfold-btn gray">
            <span class="wrapper">
              Selesaikan
              <br />besok
            </span>
          </div>
          4 已完成
          <div v-else-if="item.status == 4" class="unfold-btn gray">Berhasil</div>
        </div>
        <span v-if="item.status == 'finished'" class="item-btn gray">{{item.status}}</span>
        <span @click="goToNews()" v-if="item.status != '已完成'" class="item-btn">{{item.status}}</span>
      </li>
    </ul> -->
    <!-- 确认购买弹框 -->
    <div class="task-confirm-mask" :class="[confirmShow ? 'show' : 'hide']">
      <div class="task-confirm-cont">
        <div class="task-confirm-text">
          Kamu yakin mau pakai {{expend}} koin
          <br />
          {{income}} untuk selesaikan misi?
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
        <div class="task-success-btn" style="color:#E93F3F" @click="toAd()">Dapetin Bonus</div>
      </div>
    </div>
    <!-- 调视频任务同时 弹框 -->
    <div class="task-confirm-mask" :class="[synchWatchVideo ? 'show' : 'hide']">
      <div class="task-confirm-cont">
        <div class="task-confirm-text success">
          Lihat iklan berturut turut dan dapatkan koin emas
        </div>
        <div class="task-success-btn" style="color:#E93F3F" @click="toAd2()">Lihat sekarang</div>
      </div>
    </div>

    <!-- 余额不足弹框 -->
    <div class="task-confirm-mask" :class="[balanceShow ? 'show' : 'hide']">
      <div class="task-confirm-cont">
        <div class="task-confirm-text success">
          Saldo dan Koin kamu tidak
          <br />mencukupi silakan Top Up Koin
          <br />kamu.
        </div>
        <!-- <router-link :to="{ path: '/recharge', query: {from: 'task'} }">
        <div class="task-success-btn" style="color:#E93F3F">Top Up </div>
        </router-link>-->
        <div @click="goRecharge()" class="task-success-btn" style="color:#E93F3F">Top Up</div>
      </div>
    </div>
    <!-- 任务完成弹窗 -->
    <div class="task-confirm-mask taskSuccess" :class="[taskSuccessPop ? 'show' : 'hide']">
      <div class="taskSuccess-con">
        <img src="../../assets/images/bg_taskSuccess.png" class="bg" />
        <div class="text">
          <p style="font-weight: bold;">Tugas sudah selesai</p>
          <p>Tugas hari ini sudah diselesaikan</p>
        </div>
      </div>
      <img class="close" @click="close" src="../../assets/images/closeBox.png" />
    </div>
   <div class="showpopup" v-if="showpopup" @click="ceshixiaoxi">{{appVersion}}</div>
  </div>
</template>
<script>
import TaskScrollItem from "./TaskScrollItem.vue";
import { Toast} from "vant";
export default {
  name: "Task",
  components: {
    TaskScrollItem
  },
  data() {
    return {
      countdownStr: "",
      data: null,
      isOpen: 0,
      boxShow: false,
      count: "",
      timestamp: 0,
      list: [],
      timeout1: null,
      interval: null,
      gold: "--",
      continuousDays: 0,
      today: false,
      token: "",
      prize: "", //开宝箱金币
      confirmShow: false, //确认购买 任务弹框
      successShow: false,
      balanceShow: false,
      missions: [],
      activeMissionsId: "",
      expend: "",
      income: "",
      appVersion: "0",
      num: 0,
      showDoubleBtn: false, //观看视频翻倍
      Terima: false, //收下按钮
      taskSuccessPop: false ,//完成任务弹窗
      synchWatchVideo:false,//调视频任务同时 弹框
      showpopup:false,//ceshi

    };
  },
  props: {},
  created() {
    var that = this;
    this.token = this.getAppToken();
    this.getData();
    window.signInHandle = this.signInHandle; //观看广告后 再签到 安卓调用
    window.doubleGold = this.doubleGold; //观看视频后 安卓调用
    window.taskSuccess = this.taskSuccess; //任务成功
    window.newPackage = this.newPackage; //获取版本号
  },
  beforeDestroy() {
    clearTimeout(this.timeout1);
    clearInterval(this.interval);
  },
  methods: {
    ceshixiaoxi(){
      this.showpopup=false
    },
    //newPackage
    newPackage() {
      this.appVersion = "5.0.5";
     // window.AndroidWebView.showContent(this.appVersion);
     // this.showpopup=true;//上线删掉
      if (this.appVersion >= "5.0.5") {
        //版本号大于5.0.5 检查广告
        //3:任务奖励视频  6:任务奖励插屏
        this.num = window.AndroidWebView.isReadyAd();
      }
    },
    //完成任务
    taskSuccess() {
      this.submitMission();
      this.taskSuccessPop = true;
      this.confirmShow = false;
      this.synchWatchVideo = false;
      this.getData();
    },
    //观看视频
    watchVideo() {
      var that = this;
      //关闭开宝箱的弹窗
      this.boxShow = false;
      //视屏广告
      window.AndroidWebView.showAtdVideoAd(that.num, that.prize);
    },
    close() {
      this.boxShow = false;
      this.taskSuccessPop = false;
    },
    doubleGold() {
      this.prize = parseInt(this.prize) * 2; //金币翻倍
      this.boxShow = true; //开宝箱弹窗show
      this.showDoubleBtn = false;
      this.Terima = true; //收下按钮显示
    },
    goRecharge() {
      this.$router.push({ path: "/recharge", query: { from: "task" } });
    },
    confirmBuyTask(id, expend, income) {
      this.activeMissionsId = id;
      this.expend = expend;
      this.income = income;

      this.token = this.getAppToken();
      this.$http({
        url: "/api/mission/buycheck",
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: this.token,
          mid: this.activeMissionsId
        },
        // transformRequest: [
        //   function(data) {
        //     let ret = "";
        //     for (let it in data) {
        //       ret +=
        //         encodeURIComponent(it) +
        //         "=" +
        //         encodeURIComponent(data[it]) +
        //         "&";
        //     }
        //     return ret;
        //   }
        // ]
      })
        .then(res => {
          if (res.data.status.code == 570) {
            window.AndroidWebView.showContent(res.data.status.message);
          } else {
            this.confirmShow = true;
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    },
    //继续任务
    continueTask(id) {
      var that = this;
      that.activeMissionsId = id;
      this.synchWatchVideo=true;
      //视屏广告
      window.AndroidWebView.showAtdVideoAd("7", "");
      // //先检查有没有视频
      // if ((that.num == 3 || that.num == 6) && that.appVersion >= "5.0.5") {
      //   that.synchWatchVideo=true;

      //   //视屏广告
      //   window.AndroidWebView.showAtdVideoAd("7", "");
      // } else {
      //   that.$router.push({
      //     path: "/ad",
      //     query: {
      //       mid: id,
      //       from: "task"
      //     }
      //   });
      // }
    },
    //开始做任务
    toAd() {
      var that = this;
      this.successShow = false; //购买成功弹框消失
      this.confirmShow = false; //确认购买 弹框消失

      this.synchWatchVideo=true;
      //视屏广告
      window.AndroidWebView.showAtdVideoAd("7", "");
      // //先检查有没有视频
      // if ((that.num == 3 || that.num == 6) && that.appVersion >= "5.0.5") {
      //   that.synchWatchVideo=true;
      //   //视屏广告
      //   window.AndroidWebView.showAtdVideoAd("7", "");
      // } else {
      //   //原来的逻辑
      //   that.$router.push({
      //     path: "/ad",
      //     query: {
      //       mid: that.activeMissionsId,
      //       from: "task"
      //     }
      //   });
      // }
    },
    toAd2(){
      this.synchWatchVideo = false;
      this.$router.push({
          path: "/ad",
          query: {
            mid: this.activeMissionsId,
            from: "task"
          }
        });
    },
    //购买任务
    bugTask() {
      var that = this;
      that.token = this.getAppToken();
      that.$http({
        url: "/api/mission/buy",
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: that.token,
          mid: that.activeMissionsId
        },
        // transformRequest: [
        //   function(data) {
        //     let ret = "";
        //     for (let it in data) {
        //       ret +=
        //         encodeURIComponent(it) +
        //         "=" +
        //         encodeURIComponent(data[it]) +
        //         "&";
        //     }
        //     return ret;
        //   }
        // ]
      })
        .then(res => {
          if (res.data.status.code == 200) {
            that.successShow = true;// 购买成功弹框
            that.confirmShow = false;// 确认购买

          } else if (res.data.status.code == 518) {
            that.confirmShow = false;
            that.balanceShow = true;
          } else if (res.data.status.code == 401) {
            //window.AndroidWebView.closeActivities();

            window.AndroidWebView.loginApp();
          } else {
            that.$toast.bottom(res.data.status.message);
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    },
    togglePanel(index) {
      let obj = this.missions;
      obj[index].unfold = !obj[index].unfold;
      this.missions = obj;
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
      window.AndroidWebView.showChangeRpc2Rp();
    },
    handleBeforeSignIn(){
      var params = window.AndroidWebView.isReadySigninVideoAd();
      if (params == "1") {
        window.AndroidWebView.showAtdSigninVideoAd()
      }else {
        this.signInHandle()
      }
    },
    signInHandle() {
      var that = this
      that.token = that.getAppToken();
      // if ((!this.token || this.token == null) && !window.AndroidWebView) { // rn获取token
      //   this.token = this.$store.state.tokenModule.token
      // } else if ((!this.token || this.token == null) && window.AndroidWebView && window.AndroidWebView.getAppToken) {
      //   this.token = this.getAppToken()
      // }
      this.$http({
        url: "/api/signIn",
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        data: {
          token: that.token
        },
        // transformRequest: [
        //   function(data) {
        //     let ret = "";
        //     for (let it in data) {
        //       ret +=
        //         encodeURIComponent(it) +
        //         "=" +
        //         encodeURIComponent(data[it]) +
        //         "&";
        //     }
        //     return ret;
        //   }
        // ]
      })
        .then(res => {
          if (res.data.status.code == 200) {
            this.continuousDays = parseInt(res.data.data.continuous);
            this.today = true;
          } else if (res.data.status.code == 401) {
            window.AndroidWebView.loginApp();
          } else {
            window.AndroidWebView.showContent(res.data.status.message);
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    },
    //开宝箱
    openBox() {
      var that = this;
      that.token = that.getAppToken();
      if (that.appVersion >= "5.0.5") {
        //插屏广告
        window.AndroidWebView.showAtdInterAd("2");
      }
      if ((that.num == 3 || that.num == 6) && that.appVersion >= "5.0.5") {
        that.showDoubleBtn = true; //观看视频翻倍按钮
      } else {
        that.showDoubleBtn = false;
      }
      that
        .$http({
          url: "/api/openTreasureBox",
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          data: {
            token: that.token,
            version: that.appVersion
          },
          // transformRequest: [
          //   function(data) {
          //     let ret = "";
          //     for (let it in data) {
          //       ret +=
          //         encodeURIComponent(it) +
          //         "=" +
          //         encodeURIComponent(data[it]) +
          //         "&";
          //     }
          //     return ret;
          //   }
          // ]
        })
        .then(res => {
          if (res.data.status.code == 200) {
            that.prize = res.data.data.gold;
            that.boxShow = true;
            setTimeout(() => {
              //that.boxShow = false;
              that.isOpen = true;
              that.timestamp =
                res.data.data.next - Math.floor(new Date().getTime() / 1000);
              that.countDown(that.timestamp);
            }, 3000);
          } else if (res.data.status.code == 401) {
            //window.AndroidWebView.closeActivities();

            window.AndroidWebView.loginApp();
          } else {
            window.AndroidWebView.showContent(res.data.status.message);
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    },
    countDown(sec) {
      this.timeout1 = setTimeout(function() {
        var hour = 0;
        var minute = 0;
        var second = 0;
        this.interval = setInterval(function() {
          if (sec >= 60) {
            minute = Math.floor(sec / 60);
            second = sec % 60;
            if (minute >= 60) {
              hour = Math.floor(minute / 60);
              minute = minute % 60;
            } else {
              hour = 0;
            }
          } else {
            second = sec;
            hour = 0;
            minute = 0;
          }
          sec--;
          hour = parseInt(hour) < 10 && parseInt(hour) >= 0 ? "0" + hour : hour;
          minute =
            parseInt(minute) < 10 && parseInt(minute) >= 0
              ? "0" + minute
              : minute;
          second =
            parseInt(second) < 10 && parseInt(second) >= 0
              ? "0" + second
              : second;
          this.countdownStr = hour + ":" + minute + ":" + second;
          document.getElementById("countdown").innerHTML = countdownStr;
          // if (sec <= 0) {
          //   window.location.reload()
          // }
        }, 1000);
      }, 1000);
    },
    getData() {
      var that = this;
      that
        .$http({
          url: "/api/mission",
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          data: {
            token: that.token
          },
          // transformRequest: [
          //   function(data) {
          //     let ret = "";
          //     for (let it in data) {
          //       ret +=
          //         encodeURIComponent(it) +
          //         "=" +
          //         encodeURIComponent(data[it]) +
          //         "&";
          //     }
          //     return ret;
          //   }
          // ]
        })
        .then(res => {
          if (res.data.status.code == 200) {
            console.log(res.data.data);
            let dataObj = res.data.data;
            that.data = dataObj;
            that.list = dataObj.daysBonus;
            that.gold = dataObj.gold;
            that.continuousDays = dataObj.signIn.continuousDays;
            that.today = dataObj.signIn.today;
            that.isOpen = dataObj.treasureBox.isActive == 1 ? false : true;
            // that.isOpen = false;
            that.timestamp =
              dataObj.treasureBox.next -
              Math.floor(new Date().getTime() / 1000);
            that.missions = dataObj.missions;
            //that.appVersion = dataObj.version; //获取版本号
            if (that.isOpen) {
              that.countDown(that.timestamp); //结束时间到开始时间的时间差，单位秒
            }
          } else if (res.data.status.code == 401) {
            //window.AndroidWebView.closeActivities();
            window.AndroidWebView.loginApp();
          } else {
            // if (window.AndroidWebView && window.AndroidWebView.showContent) {
            //   window.AndroidWebView.showContent(res.data.status.message);
            // }
            window.AndroidWebView.showContent(res.data.status.message);
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    },
    //任务完成后提交信息
    submitMission() {
      var that = this;
      that.$http({
          url: "/api/mission/submit",
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          data: {
            token: that.token,
            mid: that.activeMissionsId
          },
          // transformRequest: [
          //   function(data) {
          //     let ret = "";
          //     for (let it in data) {
          //       ret +=
          //         encodeURIComponent(it) +
          //         "=" +
          //         encodeURIComponent(data[it]) +
          //         "&";
          //     }
          //     return ret;
          //   }
          // ]
        })
        .then(res => {
          let resData = res.data;
          if (resData.status.code == 200) {
          } else if (resData.status.code == 401) {
            //window.AndroidWebView.closeActivities();
            window.AndroidWebView.loginApp();
          } else {
            window.AndroidWebView.showContent(resData.status.message);
          }
        })
        .catch(res => {
          console.log("error: ", res);
        });
    }
  },
  mounted() {
    // window.AndroidWebView.dismissLoading()
  }
};
</script>
<style>
@import "../../assets/css/task.css";
</style>
<style scoped>

.taskBox .double_btn {
  margin: 0 auto;
  width: 85%;
  height: 42px;
  line-height: 42px;
  background: rgba(233, 63, 63, 1);
  border-radius: 23px;
  font-size: 18px;
  text-align: center;
  color: #fff;
  margin-top: 20px;
}
.taskBox .close {
  display: block;
  width: 30px;
  height: 30px;
  margin: 17px auto;
}
.taskBox .open-text {
  text-align: center;
  color: #ffffff;
  font-size: 47px;
  margin-top: 35%;
  opacity: 1;
  animation: textScale 2s linear;
}

@keyframes textScale {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  50% {
    transform: translateY(-200px) scale(1);
    /* transform: scale(1.5); */
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.taskBox .taskSuccess .taskSuccess-con {
  width: 90%;
  margin: 0 auto;
  margin-top: 30%;
  border-radius: 5px;
  overflow: hidden;
}
.taskBox .taskSuccess .taskSuccess-con .text {
  margin: 0 auto;
  text-align: center;
  background: #fff;
  padding-bottom: 30px;
}
.taskBox .taskSuccess .taskSuccess-con .text p {
  margin: 0;
  line-height: 28px;
  font-size: 16px;
}

.taskBox .taskSuccess .bg {
  width: 100%;
  display: block;
  margin: 0 auto;
}
.taskBox .showpopup{
left: 50%;
margin-left: -100px;
position: fixed;
top: 40%;
background: #000;
color: #fff;
text-align: center;
width: 200px;
border-radius:8px;
line-height: 30px;
}
</style>
