<template>
<div>
  <div class="task-record-container" :style="{paddingTop: $route.query.from == 'task' ? '72px': '50px'}">
    <BHeader title="Riwayat Tugas" />

    <Loading v-if="loading" />
    <div v-if="!loading && !data.length" class="recharge-record-default">
      <p class="record-no-data">“ Belum ada orang yang diikuti ”</p>
      <router-link to="/task">
        <div class="record-default-btn">Selesaikan Tugas</div>
      </router-link>
    </div>


    <div v-if="data.length">
      <div class="task-record-panel" v-for="(item,index) of data" :key="index">
        <div class="title">
          <span>Tugas {{index+1}}</span>
          <span v-if="item.status == 3">Gagal</span>
          <span v-if="item.status == 2" class="red">Berhasil</span>
        </div>
        <!-- <p>Nama Tugas: <span class="bold">{{item.title}}</span> </p> -->
        <p>Koin Terpakai: <span class="bold">{{item.expend}}</span></p>
        <p>Koin yang didapat: <span class="bold">{{item.status == 1 ?  0 : item.income}}</span></p>
        <p>Waktu: <span class="bold">{{item.break_time}}</span></p>
      </div>

    </div>
  </div>







</div>
</template>
<script>
import BHeader from "../common/BHeader"
import Loading from "../Loading"
let Base64 = require('js-base64').Base64;


export default {
  name: 'TaskRecord',
  components: {
    BHeader,
    Loading
  },
  data() {
    return {
      data: [],
      totalPage: 1,
      currentPage: 1,
      flag: true,
      page: 1,
      loading: true
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    addClass(type) {
      this.type = type
      this.page = 1
      this.data = []
      this.getData(this.page)
    },
    getData(page) {
      this.$http({
        url: '/api/mission/history',
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          token: this.token,
          page: page
        },
        transformRequest: [function(data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
      }).then((res) => {
        this.flag = true;
        this.loading = false
        let resData = res.data
        if (resData.status.code == 200) {
          let dataObj = []
          resData.data.missions.map((item) => {
            dataObj.push(item)
          })
          this.data = dataObj
          this.currentPage = resData.data.page_info.current_page
          this.totalPage = resData.data.page_info.total_page
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
    scrollGetData() {
      let _this = this;
      window.addEventListener('scroll', function() {
        // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
        // console.log(document.body.scrollTop); // 滚动高度
        // console.log(document.body.offsetHeight); // 文档高度
        // 判断是否滚动到底部

        if (document.body.scrollTop + window.innerHeight <= document.body.offsetHeight) {
          // console.log(sw);
          // 如果开关打开则加载数据
          if (_this.flag == true) {
            // 将开关关闭
            _this.flag = false;
            _this.page = _this.page + 1
            if (_this.currentPage < _this.totalPage) {
              _this.getData(_this.page)
            }
          }
        }
      });
    }
  },
  mounted() {
    this.token = this.getAppToken()
    this.getData(1)
    this.scrollGetData()
  }
}
</script>
<style>
@import "../../assets/css/task.css";
</style>
