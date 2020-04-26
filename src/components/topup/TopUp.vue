<template>
  <div class="TopUp">
    <div class="TopHeader">
      <div class="back" @click="backClick">
        <span></span>
      </div>
      <span>TopUp</span>
    </div>

    <div class="title_notice">THIS IS A SECURE TRANSACTION</div>
    <div class="topup_main">
      <div class="card_box">
        <div class="one">
          <div class="t">Total Pembayaran</div>
          <div class="num">IDR {{this.numFormatD(topupInfo.price)}}</div>
        </div>
        <!-- 去掉订单号 -->
        <!-- <div class="two">
          <div class="item">
            <div class="l">Nomor Pesanan：</div>
            <div class="r">20202020332344404</div>
          </div>
          <div class="item">
            <div class="l">Pedagang：</div>
            <div class="r">washmashine</div>
          </div>
        </div>-->
      </div>
      <div class="topup_title">Pilih cara pembayaran</div>
      <div class="topup_type" v-show="bank.length" :class="chooseType=='bank'?'active':''">
        <div class="type_name" @click="chooseType!='bank'?chooseType='bank':chooseType=null">
          <img src="../../assets/images/topup/topup_type0.png" alt>
          <span>Bank Transfer</span>
          <i></i>
        </div>

          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='bank'"
              v-for="(item, index) in bank"
              :key="index"
              @click="goSure(item.name, item.method)"
            >
              <img :src="item.logo" alt>
              <span>{{item.name}}</span>
              <i></i>
            </li>
          </transition-group>
      </div>
      <div class="topup_type" v-show="wallet.length" :class="chooseType=='wallet'?'active':''">
        <div class="type_name" @click="chooseType!='wallet'?chooseType='wallet':chooseType=null">
          <img src="../../assets/images/topup/topup_type1.png" alt>
          <span>E-wallet</span>
          <i></i>
        </div>

        <ul>
          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='wallet'"
              v-for="(item, index) in wallet"
              :key="index"
              @click="goSure(item.name, item.method)"
            >
              <img :src="item.logo" alt>
              <span>{{item.name}}</span>
              <i></i>
            </li>
          </transition-group>
        </ul>
      </div>
      <div
        class="topup_type"
        v-show="convenlence.length"
        :class="chooseType=='convenience_store'?'active':''"
      >
        <div
          class="type_name"
          @click="chooseType!='convenience_store'?chooseType='convenience_store':chooseType=null"
        >
          <img src="../../assets/images/topup/topup_type2.png" alt>
          <span>Convenience Store</span>
          <i></i>
        </div>

        <ul>
          <transition-group name="fade" tag="ul">
            <li
              v-show="chooseType=='convenience_store'"
              v-for="(item, index) in convenlence"
              :key="index"
              @click="goSure(item.name, item.method)"
            >
              <img :src="item.logo" alt>
              <span>{{item.name}}</span>
              <i></i>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import { getPayType, getRechargeCode } from "utils/ajax";
import { Toast, Dialog } from "vant";

export default {
  name: "TopUp",
  data() {
    return {
      chooseType: null,
      method: 1,
      bank: [],
      wallet: [],
      convenlence: [],

    };
  },
  created() {
    // this.getType();
  },
  mounted(){
    // this.bank = this.$store.state.rechargeInfo.banks
    this.getType();
  },
  computed: {
    topupInfo() {
      return this.$store.state.rechargeInfo;
    }
  },
  methods: {
    getType() {
      let param = {
        time: Date.now()
      };

      this.$http({
        url: '/api/recharge/ways?t=' + (new Date()).getTime(),
        method: 'post',
        data: {
          token: this.getAppToken(),
        }
      }).then(res => {

          if (res.data.status.code == 200) {
            let data = res.data.data.ways
            console.log(data)
            if (data.bank && data.bank.length) {
              this.bank = data.bank;
              this.chooseType = 'bank'
            }
            if (data.wallet && data.wallet.length) {
              this.wallet = data.wallet;
            }
            if (data.convenience_store && data.convenience_store.length) {
              this.convenlence = data.convenience_store;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    backClick() {
      this.$router.go(-1);
    },
    goSure(item, key) {
      if (key == "21") {
        this.$store.dispatch("changeRechargeInfo", {
          price: this.topupInfo.price,
          method: key,
          type: this.topupInfo.type
        });
        // this.$router.push("/ovo");
        this.$router.push({
          name: 'Ovo',
          query: {
            m: this.topupInfo.price,
            method: key,
            way: this.chooseType
          }
        })
      } else {
        this.$store.dispatch("changeRechargeInfo", {
          price: this.topupInfo.price,
          method: key,
          type: this.topupInfo.type
        });
        if (key == "20") {
          // this.$router.push("/dana");
          this.$router.push({
            name: 'Dana',
            query: {
              m: this.topupInfo.price,
              method: key,
              way: this.chooseType
            }
          })
        } else {
          // this.$router.push("/recharge");
          this.$router.push({
            name: 'Process',
            query: {
              m: this.topupInfo.price,
              method: key,
              way: this.chooseType
            }
          })

        }
      }
    }
  }
};
</script>
<style  scoped src="../../assets/css/topup.css"></style>
