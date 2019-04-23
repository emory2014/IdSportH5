<template>
<div class="vip-container">
  <BHeader backToApp={true} title="Pusat Member" vip={true} />
  <!-- <Loading v-if="!data" /> -->
  <div class="vip-info-sec">
    <div class="vip-scroll-box" v-show="list">
      <i class="icon-vip-tips"></i>
      <ul class="scroll-ul" id="scroll">
        <li v-for="(item,index) of list" :key="index" ref="rollul">{{item}}</li>
      </ul>
      <!-- <transition  name="slide" mode="out-in">
                <p  :key="text.id">{{text.val}}</p>
            </transition> -->
    </div>
    <div class="info-cont" v-if="data">
      <div class="header-wrapper">
        <div class="vip-header-box">
          <img :src="data.avatar" />
        </div>
        <!-- <img v-if="data.is_vip == 1" class="vip-pic" src="../../assets/images/vip/vip-black.png" />
        <img v-else class="vip-pic" src="../../assets/images/vip/vip-gray.png" /> -->
      </div>
      <div class="header-info">
        <p class="name">{{data.username}}</p>
        <span class="tag">{{data.vip_expired_time}}</span>
      </div>

      <div class="vip-val-info">
        <div class="item">
          <p>Sudah undang</p>
          <p><span class="num">{{data.vip_total_number}}</span> &nbsp<span class="rp">orang</span></p>
          <router-link to="/vip-invite-record"><span class="tag"> </span></router-link>
        </div>
        <div class="item">
          <p>Sudah dapat</p>
          <p><span class="num">{{data.vip_bonus | formatVipBonus}}</span>&nbsp<span class="rp">Rp.</span> </p>
          <span @click="wdMoney()" class="pen"></span>
        </div>
      </div>
    </div>

    <div class="info-cont" v-if="!token">
      <div class="header-wrapper">
        <div class="vip-header-box">
          <img src="../../assets/images/game-header.png" />
        </div>

        <img class="vip-pic" src="../../assets/images/vip/vip-gray.png" />
      </div>
      <div class="header-info">
        <!-- 未登录 -->
        <p class="name">Belum masuk</p>
        <span class="tag">Belum jadi Member</span>
      </div>

      <div class="vip-val-info">
        <div class="item">
          <p>Sudah undang</p>
          <p><span class="num">0</span> orang</p>
          <span @click="toInviteRecord()" class="tag">Undangan saya ></span>
        </div>
        <div class="item">
          <p>Sudah dapat (Rp.)</p>
          <p><span class="num">0</span> </p>
          <span @click="wdMoney()" class="tag">Penarikan ></span>
        </div>
      </div>
    </div>


  </div>

  <div class="vip-title-sec"  v-if="data.is_vip == 0">
    <i class="left"></i>
    <span>JADI VIP</span>
    <i class="right"></i>
  </div>
  <div class="vip-category" v-if='data.is_vip == 0'>
    <div v-for="(time,price,index) in vipPackage" :key="index" @click="select(index,price)" :class="[current==index? 'selected':'vipitems']">
      <div class="vip-up">
        <div class="rpc">Rpc.</div>
        <div>{{price | formatVipPakagePrice}}</div>
      </div>
      <div :class="[current==index? 'line':'notHighlight']"></div>
      <div class="down-content">
        <span>{{time}}&nbsp;Bulan</span>
      </div>
    </div>
  </div>
  <div class="vipBtn" v-if="data && data.is_vip !== 1" @click="buyVip()">Jadi member dengan Rpc {{vip_package_price | formatVipPakagePrice}}</div>
    <div class="vip-title-sec">
        <i class="left"></i>
        <span>HAk ISTIMEWA VIP</span>
        <i class="right"></i>
        <p class="vip-title-text">Klik gambar dibawah untuk lihat manfaat member</p>
  </div>
  <div class="vip-access-sec">
    <div class="item" @click="popAccess(1)">
      <i class="icon-vip read"></i>
      <p>Baca berkualitas</p>
      <span>Artikel yang berkualitas</span>
    </div>
    <div class="item" @click="popAccess(2)">
      <i class="icon-vip invite"></i>
      <p>Bonus Undangan</p>
      <span>Bonus Tinggi</span>
    </div>
    <div class="access-text" :class="[active == 1? 'show':'hide']">
      <i class="icon-text-caret"></i><i @click="popAccessHide()" class="icon-text-close">×</i>
      Jadi Member, nikmati artikel berkualitas tinggi setiap hari, baca hadiah dan dapatkan lebih banyak
    </div>
    <div class="access-text" :class="[active == 2? 'show':'hide']">
      <i class="icon-text-caret right"></i><i @click="popAccessHide()" class="icon-text-close">×</i>
      Bonus 20% setiap teman yang diundang berhasil jadi Member. Tambah bonus 5% jika teman dari teman yang diundang berhasil jadi member, tanpa batas, melakukan penarikan dengan cepat.
    </div>
    <div class="item" @click="popAccess(3)">
      <i class="icon-vip coin"></i>
      <p>5 kali koin</p>
      <span>Koin bisa diuangkan</span>
    </div>

    <div class="item" @click="popAccess(4)">
      <i class="icon-vip more"></i>
      <p>Masih banyak lagi</p>
      <span>Stay tuned</span>
    </div>
    <div class="access-text" :class="[active == 3? 'show':'hide']">
      <i class="icon-text-caret"></i><i @click="popAccessHide()" class="icon-text-close">×</i>
      Setelah jadi Member, 5 kali lipat koin baca artikel
    </div>
    <div class="access-text" :class="[active == 4? 'show':'hide']">
      <i class="icon-text-caret right"></i><i @click="popAccessHide()" class="icon-text-close">×</i>
      Stay tuned karena masih banyak lagi hak istimewa yang didapat
    </div>
  </div>
  <a href="https://www.youtube.com/watch?v=d1ItTqU_VFw">
    <div class="vip-play-btn">Tutorial Singkat <span class="play-box"><i class="play-caret"></i></span> Jadi Member</div>
</a>
  <!-- 开通成功 -->
  <div class="vip-success-mask" :class="[successShow?'show':'hide']">
    <div class="success-cont"  align='center'>
        <img src="../../assets/images/vip/vip-success.png">
        <img src="../../assets/images/vip/crown.png" class="crown">
      <span class="kamu">Kamu telah berhasil</span> 
      <span class="yellow">berhasil menjadi member</span> 
      <p class="text">Nikmati manfaat-manfaat dari <br>  keuntungan menjadi Member </p>
      <!-- 立即体验 -->
      <div class="exprerirence" @click="() => { this.successShow = false }">Nikmati Sekarang</div>
      <!-- <i class="success-mask-close" @click="() => { this.successShow = false }">×</i> -->
    </div>
  </div>
  <!-- 非会员提现 -->
  <div class="vip-success-mask" :class="[notVipShow?'show':'hide']">
    <div class="success-cont"  align='center'>
        <img src="../../assets/images/vip/vip-success.png">
      <!-- 开通会员才可以提现会员金额 -->
      <p class="vip-mask-msg">Jadi member untuk bisa<br> melakukan penarikan member</p>

      <div class="top-btn" @click="() => { this.notVipShow = false; this.buyVip()}">Segera jadi Member</div>
      <div class="cancel" @click="() => { this.notVipShow = false }">Tidak</div>
      <!-- <i class="success-mask-close" @click="() => { this.notVipShow = false }">×</i> -->
    </div>
  </div>
  <div class="vip-success-mask" :class="[rechargeConfirmShow?'show':'hide']">
    <div class="success-cont" align='center'>
        <img src="../../assets/images/vip/vip-success.png">
      <!-- 您确定用金币开通会员吗？ -->
      <p class="vip-mask-msg">Yakin mau pakai koin<br> anda untuk jadi Member?</p>
      <!-- 立即开通会员 -->
      <div class="top-btn" @click="openVip()">Segera jadi Member</div>
      <!-- 容我想想 -->
      <div class="cancel" @click="() => { this.rechargeConfirmShow = false }">Pikirkan dulu</div>
      <!-- <i class="success-mask-close" @click="() => { this.rechargeConfirmShow = false }">×</i> -->
    </div>
  </div>

  <div class="vip-success-mask" :class="[coinNotEnoughShow?'show':'hide']">
    <div class="success-cont" align='center'>
        <img src="../../assets/images/vip/vip-success.png">
      <!-- 您的金币剩余100000，还差金币100000 -->
      <p class="vip-mask-msg">Koin anda sisa {{coinBalance|thousands}}<br> masih ada koin {{needMoreCoin|thousands}}</p>
      <!-- 立即充值 -->
      <router-link to="/recharge?vip=1">
        <div class="top-btn">Seger isi ulang</div>
      </router-link>
      <!-- 容我想想 -->
      <div class="cancel" @click="() => { this.coinNotEnoughShow = false }">Pikirkan dulu</div>
      <!-- <i class="success-mask-close" @click="() => { this.coinNotEnoughShow = false }">×</i> -->
    </div>
  </div>
  <p class="toast-text" :class="[toastShow? 'show':'hide']">{{msg}}</p>
</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64

const totalDuration = 2000;

export default {
  name: 'VipCenter',
  components: {
    BHeader,
    Loading
  },
  data() {
    return {
      formatPrice: 0,
      current: 0,
      vipPackage: null,
      vip_package_price: 200000, //发送给服务端的价格
      data: null,
      list: null,
      timer: null,
      msg: '',
      defaultShow: false,
      token: '',
      active: 0,
      count: 0,
      number: 0,
      wdFlag: true,
      toastShow: false,
      rechargeConfirmShow: false, //确认弹框
      coinNotEnoughShow: false, //金币不够弹框
      notVipShow: false, //非会员提现弹框
      successShow: false, //充值成功弹框
      coinBalance: 0,
      needMoreCoin: 0,
    }
  },
  props: {
    title: String
  },
  filters: {
    formatVipBonus: function(num) {
      num = Math.round(num)
      var str = num + '';
      return str.split("").reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev;
      })
    },
    formatVipPakagePrice: function(num) {
      num % 1000 == 0 ? num = (num / 1000) + ".000" : num = (num / 1000)
      return num
    }

  },
  methods: {
    select(index, price) {
      this.current = index;
      this.vip_package_price = price
    },
    scroll() {
      var scroll = document.getElementById("scroll");
      var step = 1;

      var w = scroll.scrollWidth - scroll.offsetWidth;
      console.log(w)
      this.timer = setInterval(function() {
        scroll.scrollLeft += step;
        // console.log(scroll.scrollLeft)
        if (scroll.scrollLeft != 0 && scroll.scrollLeft == scroll.scrollWidth - scroll.offsetWidth) {
          scroll.scrollLeft = 0
        }

        //  console.log(scroll.scrollLeft)
      }, 50)
    },
    toInviteRecord() {
      if (this.token) {
        this.$router.push("/vip-invite-record")
      } else {
        window.AndroidWebView.closeActivities();
        window.AndroidWebView.loginApp();
      }
    },
    popAccess(type) {
      this.active = type
    },
    popAccessHide() {
      this.active = 0
    },
    toastPop(text) {
      this.toastShow = true
      this.msg = text
      setTimeout(() => this.toastShow = false, 2000)
    },
    wdMoney() {
      if (this.data.is_vip == 1) {
        this.$router.push("/wthdraw-deposit?m=" + this.data.vip_bonus)
      } else {
        this.notVipShow = true
      }
    },
    // getAppToken() {
    //   var content = window.AndroidWebView.getAppToken();
    //   var token = Base64.decode(content)
    //   this.token = token
    // },
    buyVip() {
      this.token = this.getAppToken()
      if (!this.wdFlag) {
        return false;
      }
      this.wdFlag = false
      this.$http({
        url: '/api/vip/buy/check?t=' + (new Date()).getTime(),
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          vip_package_price: this.vip_package_price
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        this.wdFlag = true
        if (res.data.status.code == 200) {
          if (res.data.data.gold_is_enough) {
            //确认充值
            this.rechargeConfirmShow = true
          } else {
            //金币不够
            this.coinNotEnoughShow = true
            this.coinBalance = res.data.data.gold
            this.needMoreCoin = res.data.data.difference_amount

          }

        } else if (res.data.status.code == 401) {
          window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();
        } else {
          this.toastPop(res.data.status.message)
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    },
    openVip() {
      this.token = this.getAppToken()
      this.$http({
        url: '/api/vip/buy_by_gold?t=' + (new Date()).getTime(),
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          vip_package_price: this.vip_package_price
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
          this.successShow = true
          this.rechargeConfirmShow = false

        } else if (res.data.status.code == 401) {
          window.AndroidWebView.closeActivities();
          window.AndroidWebView.loginApp();
        } else {
          this.toastPop(res.data.status.message)
        }

      }).catch((res) => {
        console.log('error: ', res);
      });
    },

    startMove() {
      let timer = setTimeout(() => {
        if (this.number === this.list.length - 1) {
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, totalDuration)
    },
  },
  created() {

  },
  // computed: {
  //         text() {
  //             if(this.list){
  //                 return {
  //                     id: this.number,
  //                     val: this.list[this.number]
  //             }
  //             }

  //         }
  //         },
  mounted() {
    //    this.startMove()
    this.token= this.getAppToken()
    this.$http({
      url: '/api/vip/package_price?t=' + (new Date()).getTime(),
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
        this.vipPackage = res.data.data
      } else if (res.data.status.code == 401) {

      } else {
        this.toastPop(res.data.status.message)
      }

    }).catch((res) => {
      console.log('error: ', res);
    });
    this.$http({
      url: '/api/vip/center?t=' + (new Date()).getTime(),
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: this.token,
      },
      transformRequest: [function(data) {
        console.log('token', data)
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    }).then((res) => {

      if (res.data.status.code == 200) {
        this.data = res.data.data
        console.log("huiyuan", this.data)
      } else if (res.data.status.code == 401) {
        window.AndroidWebView.closeActivities();
        window.AndroidWebView.loginApp();
      } else {
        this.toastPop(res.data.status.message)
      }

    }).catch((res) => {
      // console.log('error: ', res);
    });

    this.$http({
      url: '/api/vip/center/prizelist?t=' + (new Date()).getTime(),
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: this.token
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
        this.list = res.data.data
        this.scroll()


      } else if (res.data.status.code == 401) {

      } else {
        this.toastPop(res.data.status.message)
      }

    }).catch((res) => {
      console.log('error: ', res);
    });
  }
}
</script>
<style>
@import "../../assets/css/vip.css";
</style>
