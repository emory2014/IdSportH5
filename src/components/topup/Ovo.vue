<template>
  <div class="Ovo">
    <header class="fixHeader" >
    　<i class="nc-icon-prev2" @click="goBack()" ></i>
    <div>ovo</div>

  </header>
    <div class="count">
      <input v-model.trim="value" type="text" placeholder="Silahkan masukan akun OVO Anda">
    </div>
    <div class="main_cnt">
      <ul>
        <li>Silahkan masukan akun OVO Anda</li>
        <li>Klik "Bayar"</li>
        <li>Jika sudah klik "Bayar"maka akan otomatis ke halaman pembayaran OVO, Jika Anda belum punya aplikasi OVO, silahkan unduh OVO terlebih</li>
      </ul>
    </div>
    <div @click="goOvo" class="btn" :class="canSubmit?'active':''">Bayar</div>
  </div>
</template>
<script>

// import { getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";

export default {
  name: "Ovo",
  data() {
    return {
      value: "",
      recharge_info: {}
    };
  },
  components: {

  },
  created() {
    this.recharge_info = this.$store.state.rechargeInfo;
    window.alertPayWindow = this.alertC;
  },
  computed: {
    canSubmit() {
      var reg = /(^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$)|(^[0-9]{1,}$)/;
      return reg.test(this.value);
    }
  },
  methods: {
    goBack(){
        this.$router.go(-1);
    },
    goOvo() {
      if (this.canSubmit) {
        let token = this.getAppToken()
        this.$http({
          url: '/api/recharge/code/generate?t=' + (new Date()).getTime(),
          method: 'post',
          data: {
            token: token,
            amount: this.$route.query.m,
            method: this.$route.query.method,
            way: this.$route.query.way,
            type: this.$store.state.rechargeInfo.type,
            mobile: this.value
          }
        }).then((res) => {
          if (res.data.status.code == 200) {
            // this.data = res.data.data
            location.href= res.data.data
          } else {
              Toast(res.data.status.message);
          }

        }).catch((res) => {
          console.log('error: ', res);
        });
      }
    },
    alertC() {
      Dialog.alert({
        message: `Pembayaran akan di terima oleh sistem dengan jeda beberapa menit, Jika pembayaran berhasil bisa melihat di riwayat transaksi `,
        confirmButtonText: "ok"
      })
        .then(() => {
          this.$router.push("/recharge");
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.fixHeader {
  /* padding-top:25px; */
  position: fixed;
  top: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: #333333;
  background:rgba(255,255,255,1);
  margin-bottom: 8px;
  width: 100%;
  z-index: 1;
  box-shadow:0px 2px 8px 0px rgba(0,0,0,0.06);
}

.fixHeader div {
  width: 80%;
  margin: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: bold;
  height: 50px;
  line-height: 50px;
}

.fixHeader .nc-icon-prev2 {
    display: inline-block;
    position:absolute;
    left: 15px;
    top: 20px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #000000;
    border-right: 2px solid #000000;
    transform: rotate(-135deg);
}
.Ovo,
.Dana {
  width: 100vw;
  height: 100vh;
  padding-top: 45px;
  box-sizing: border-box;
  background: #fff;
}
.Ovo .count,
.Dana .count {
  text-align: center;
  padding: 15px;
  padding-bottom: 0;
}
.Ovo .count input,
.Dana .count input {
  width: 100%;
  height: 50px;
  border-radius: 20px;
  line-height: 50px;
  border: 1px solid #dddddd;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 16px;
  color: #212121;
}
.Ovo .count input::-webkit-input-placeholder,
.Dana .count input::-webkit-input-placeholder {
  color: #999999;
  font-size: 16px;
}
.Ovo .main_cnt,
.Dana .main_cnt {
  margin: 5px 15px;
  background: #f9f9f9;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 20px;
  margin-top: 20px;
}
.Ovo .main_cnt ul,
.Dana .main_cnt ul {
  padding: 0;
  margin: 0;
  list-style-type: decimal;
  font-size: 12px;
  color: #999;
}
.Ovo .main_cnt ul li,
.Dana .main_cnt ul li {
  line-height: 20px;
}
.Ovo .btn,
.Dana .btn {
  height: 45px;
  line-height: 45px;
  color: #fff;
  text-align: center;
  background: #c5c5c5;
  border-radius: 4px;
  font-size: 18px;
  position: fixed;
  left: 15px;
  bottom: 75px;
  width: 345px;
}
.Ovo .btn.active,
.Dana .btn.active {
  background:#F81750;
  border-radius: 4px;
}
</style>
