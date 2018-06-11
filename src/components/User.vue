<template>
  <div class="user">
    <header class="header">
            　<i class="nc-icon-prev" @click="goBack()"></i>
              Selesaikan data Pribadi
        </header>
        <div class="nc-body">
            <ul class="nc-ul">
                <li @click="selectProfle()">
                    <div class="nc-item" id="profil">
                          Profil
                          <span class="pic-box"><img class="header-pic" src="../assets/images/header.png"></span>
                          <i class="icon-next"></i>
                    </div>
                </li>
                <li @click="selectName()">
                      <div class="nc-item modal" id="nicName">
                            Nama
                            <span class="item-right" v-if="!nameShow && name">{{name}}</span>
                            <span class="item-right default" v-else>Silakan Pilih</span>
                            <i class="icon-next"></i>
                      </div>
                  </li>
                  <li @click="selectSex()">
                      <div class="nc-item modal" id="sex">
                            Kelamin

                              <span class="item-right" v-if="sexVal">{{ sexVal }}</span>
                              <span class="item-right default" v-else>Silakan Pilih</span>
                              <i class="icon-next"></i>
                          </div>
                  </li>
                  <li id="selectDate">
                          <div class="nc-item" >
                                Tanggal Lahir
                                  <span class="item-right default" data-year="" data-month="" data-date="" id="showDate">Silakan Pilih</span>
                                  <i class="icon-next"></i>
                              </div>
                      </li>
            </ul>

            <ul class="nc-ul">
                  <li>
                        <div class="nc-item" id="education">
                              Pendidikan
                              <input type="hidden" name="bank_id" id="EduId" value="">
                              <span class="item-right default"  id="showEdu">Silakan Pilih</span>
                              <i class="icon-next"></i>
                        </div>
                    </li>
                    <li>
                        <div class="nc-item" id="occupation">
                              Profesi
                              <input type="hidden" name="bank_id" id="occupationId" value="">
                                <span class="item-right default" id="showOccupation">Silakan Pilih</span>
                                <i class="icon-next"></i>
                            </div>
                    </li>
                    <li @click = "selectHobby()">
                            <div class="nc-item" id="hobby">
                                  Hobby
                                    <span v-if="!seletedHobbyArr.length" class="item-right default">
                                        Silakan Pilih
                                      </span>
                                      <span class="item-right" v-else  >
                                        <span v-for="(item,index) of seletedHobbyArr" :key="index" class="tag">{{item}}</span>
                                      </span>

                                    <i class="icon-next"></i>
                                </div>
                        </li>
              </ul>

              <div class="nc-btn" @click="sendAjax()">Selesai</div>
        </div>
        <div class="mask mask-profil" v-bind:class="[profleShow? 'show':'hide']">
              <div class="pop-sex-cont">
                    <div class="sex-item" @click="takePhoto()"><input type="file" id='image' accept="image/*" capture='camera'>Kamera</div>
                    <div class="sex-item">Galery</div>
                    <div class="sex-item cancel" @click = "cancelShow()">Bata</div>
              </div>
          </div>
        <div class="mask mask-nicName" v-bind:class="[nameShow? 'show':'hide']">
            <div class="pop-hobby-cont">
              <p class="btn-box"><span class="btn-cancel cancel" @click = "cancelShow()">Bata</span>
                  <span class="btn-ok name-ok" @click="nameComplete()">Oke</span></p>
              <input minlength="2" maxlength="30" placeholder="Masukan Pilihan"
              v-on:input="nameInput()" v-model="name" class="nic-name-input" type="text" />
              <p class="tips"><i class="icon-tip"></i>2-30Huruf,Perpaduan Arigka sama Huruf,Sebulan hanya boleh ganti sekali</p>
            </div>
        </div>

        <div class="mask mask-sex" v-bind:class="[sexShow? 'show':'hide']">
            <div class="pop-sex-cont">
                  <div class="sex-item" @click="toSelectSex('Laki-laki')">Laki-laki</div>
                  <div class="sex-item" @click="toSelectSex('Perempuan')">Perempuan</div>
                  <div class="sex-item cancel" @click = "cancelShow()">Bata</div>
            </div>
        </div>

        <div class="mask mask-hobby" v-bind:class="[hobbyShow? 'show':'hide']">
              <header class="header">
                      　<i class="nc-icon-prev cancel" @click = "cancelShow()"></i>
                        Hobby
                  </header>
                  <ul class="hobby-ul">
                    <li :class="{active: arr[index]}" v-for="(item,index) of hobbyArr" :key="index" @click="hobbyIsActive(index,item)">{{item}}</li>
                  </ul>
                  <div class="nc-btn hobby-ok" @click="hobbyOK()">Oke</div>
        </div>
        <p class="toast-text" v-bind:class="[toastShow? 'show':'hide']">{{msg}}</p>
  </div>
</template>

<script>
import IosSelect from 'iosselect'

export default {
  name: 'User',
  data () {
    return {
      data: null,
      name: '',
      profleShow: false,
      nameShow: false,
      sexShow: false,
      sexVal: '',
      hobbyShow: false,
      hobbyActive: '-',
      toastShow: false,
      eduFlag: false,
      msg: '',
      hobbyArr: ['Olahraga','keuangan','kuliner','Fashion','Travel','Permainan',
      'Cerpen','Hewan','Pendidikan','Entertainment','Kesehatan','Teknologi','Humor','Bola'],
      arr:[],
      seletedHobbyArr:[],
      ajaxFlag: true
    }
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    selectProfle(){
      this.profleShow = true
    },
    selectName(){
      this.nameShow = true
    },
    selectSex(){
      this.sexShow = true
    },
    toSelectSex(text){
      this.sexVal = text
      this.sexShow = false
    },
    selectHobby(){
      this.hobbyShow = true
    },
    cancelShow(){
      this.profleShow = false
      this.nameShow = false
      this.sexShow = false
      this.hobbyShow = false
    },
    hobbyOK(){
      if (this.seletedHobbyArr.length) {
          this.hobbyShow = false
      }else {
        this.toastPop("请选择爱好")
      }

    },
    nameComplete(){
      let reg = /^[A-Za-z0-9]+$/;
      let sreg = /(^\s+)|(\s+$)|\s+/g;
      if (this.name) {
        if(!reg.test(this.name.trim()) && !sreg.test(this.name.trim())){
            this.toastPop("Format tidak sesuai")
       }else{
         this.nameShow = false
       }
      }else {
        this.toastPop("pilih nama")
      }
    },
    nameInput(){

    },
    toastPop(text){
      this.toastShow = true
      this.msg = text
      setTimeout(() => this.toastShow = false, 2000)
    },
    hobbyIsActive(index,item){
    //  this.hobbyActive = index

      for (let i = 0; i < this.arr.length; i++) {
        if(i === index ){

          if(this.arr[index] == false){

            if(this.seletedHobbyArr.length < 3) {
              this.arr.splice(index, 1, true)
              this.seletedHobbyArr.push(item);
              //this.arr[index] == false
              //this.arr[index] ? this.arr.splice(index,1,false) : this.arr.splice(index, 1, true)
            }else {
              this.toastPop('hanya boleh pilih 3')
            }
          }else {
            this.seletedHobbyArr.pop(item);
            this.arr.splice(index,1,false)
          }

        }

      }

    },
    initFun(){
      for (let i = 0; i < this.hobbyArr.length; i++) {
        this.arr.push(false)
      }
    },

formatEdu(){
  var data=[
    {'id': '10001', 'value': 'Dibawah SMK'},
    {'id': '10002', 'value': 'SMA/SMK'},
    {'id': '10003', 'value': 'S1'},
    {'id': '10004', 'value': 'S2'},
    {'id': '10005', 'value': 'S3'},

  ];
  var showDom = document.querySelector('#showEdu');// 绑定一个触发元素
  var valDom = document.querySelector('#EduId');  // 绑定一个存储结果的元素
  showDom.addEventListener('click', function () {  // 添加监听事件
      var val = showDom.dataset['id'];             // 获取元素的data-id属性值
      var title = showDom.dataset['value'];        // 获取元素的data-value属性值
  	// 实例化组件
      var example = new IosSelect(1,               // 第一个参数为级联层级，演示为1
          [data],                             // 演示数据
          {
              container: '.container',             // 容器class
              title: '',                    // 标题
              itemHeight: 50,                      // 每个元素的高度
              itemShowCount: 3,                    // 每一列显示元素个数，超出将隐藏
              oneLevelId: val,                     // 第一级默认值
              callback: function (selectOneObj) {  // 用户确认选择后的回调函数
                  valDom.value = selectOneObj.id;
                  showDom.innerHTML = selectOneObj.value;
                  showDom.dataset['id'] = selectOneObj.id;
                  showDom.dataset['value'] = selectOneObj.value;
                  showDom.classList = "item-right";
              }
      });
  });
},

formatOccupation(){
  var data=[
          {'id': '10001', 'value': 'ACCOUNTING'},
           {'id': '10002', 'value': 'WAITER'},
           {'id': '10003', 'value': 'ENGINEER'},
           {'id': '10004', 'value': 'EXECUTIVE'},
           {'id': '10005', 'value': 'GENERAL_ADMINISTRATION'},
           {'id': '10006', 'value': 'INFORMATION_TECHNOLOGY'},
           {'id': '10007', 'value': 'CONSULTANT'},
           {'id': '10008', 'value': 'MARKETING'},
           {'id': '10009', 'value': 'TEACHER'},
           {'id': '10010', 'value': 'MILITARY'},
           {'id': '10011', 'value': 'RETIRED'},
           {'id': '10012', 'value': 'STUDENT'},
           {'id': '10013', 'value': 'ENTREPRENEUR'},
           {'id': '10014', 'value': 'POLICE'},
           {'id': '10015', 'value': 'FARMER'},
           {'id': '10016', 'value': 'FISHERMAN'},
           {'id': '10017', 'value': 'BREEDER'},
           {'id': '10018', 'value': 'DOCTOR'},
           {'id': '10019', 'value': 'MEDICAL_PERSONNEL'},
           {'id': '10020', 'value': 'LAWYER'},
           {'id': '10021', 'value': 'CHEF'},
           {'id': '10022', 'value': 'RESEARCHER'},
           {'id': '10023', 'value': 'DESIGNER'},
           {'id': '10024', 'value': 'ARCHITECT'},
           {'id': '10025', 'value': 'WORKERS_ART'},
           {'id': '10026', 'value': 'SECURITY'},
           {'id': '10027', 'value': 'BROKER'},
           {'id': '10028', 'value': 'DISTRIBUTOR'},
           {'id': '10029', 'value': 'AIR_TRANSPORTATION'},
           {'id': '10030', 'value': 'SEA_TRANSPORTATION'},
           {'id': '10031', 'value': 'LAND_TRANSPORTATION'},
           {'id': '10032', 'value': 'LABOR'},
           {'id': '10033', 'value': 'CRAFTSMAN'},
           {'id': '10034', 'value': 'HOUSEWIFE'},
           {'id': '10035', 'value': 'STATE_OFFICIALS'},
           {'id': '10036', 'value': 'GOVERNMENT_EMPLOYEE'},
           {'id': '10037', 'value': 'INFORMAL_WORKERS'},
           {'id': '10038', 'value': 'OTHER'}

  ];
  var showDom = document.querySelector('#showOccupation');// 绑定一个触发元素
  var valDom = document.querySelector('#occupationId');  // 绑定一个存储结果的元素
  showDom.addEventListener('click', function () {  // 添加监听事件
      var val = showDom.dataset['id'];             // 获取元素的data-id属性值
      var title = showDom.dataset['value'];        // 获取元素的data-value属性值
  	// 实例化组件
      var example = new IosSelect(1,               // 第一个参数为级联层级，演示为1
          [data],                             // 演示数据
          {
              container: '.container',             // 容器class
              title: '',                    // 标题
              itemHeight: 50,                      // 每个元素的高度
              itemShowCount: 3,                    // 每一列显示元素个数，超出将隐藏
              oneLevelId: val,                     // 第一级默认值
              callback: function (selectOneObj) {  // 用户确认选择后的回调函数
                  valDom.value = selectOneObj.id;
                  showDom.innerHTML = selectOneObj.value;
                  showDom.dataset['id'] = selectOneObj.id;
                  showDom.dataset['value'] = selectOneObj.value;
                  showDom.classList = "item-right";
              }
      });
  });
},
formatDate(){
  var selectDateDom = document.querySelector('#selectDate');
   var showDateDom = document.querySelector('#showDate');
   // 初始化时间
   var now = new Date();
   var nowYear = now.getFullYear();
   var nowMonth = now.getMonth() + 1;
   var nowDate = now.getDate();
   showDateDom.setAttribute('data-year', nowYear);
   showDateDom.setAttribute('data-month', nowMonth);
   showDateDom.setAttribute('data-date', nowDate);
   // 数据初始化
   function formatYear (nowYear) {
       var arr = [];
       for (var i = nowYear - 110; i <= nowYear ; i++) {
           arr.push({
               id: i + '',
               value: i + ' Tahun'
           });
       }
       return arr;
   }
   function formatMonth () {
       var arr = [];
       for (var i = 1; i <= 12; i++) {
           arr.push({
               id: i + '',
               value: i + ' bulan'
           });
       }
       return arr;
   }
   function formatDate (count) {
       var arr = [];
       for (var i = 1; i <= count; i++) {
           arr.push({
               id: i + '',
               value: i + ' tanggal'
           });
       }
       return arr;
   }
   var yearData = function(callback) {
       // settimeout只是模拟异步请求，真实情况可以去掉
       // setTimeout(function() {
           callback(formatYear(nowYear))
       // }, 2000)
   }
   var monthData = function (year, callback) {
       // settimeout只是模拟异步请求，真实情况可以去掉
       // setTimeout(function() {
           callback(formatMonth());
       // }, 2000);
   };
   var dateData = function (year, month, callback) {
       // settimeout只是模拟异步请求，真实情况可以去掉
       // setTimeout(function() {
           if (/^(1|3|5|7|8|10|12)$/.test(month)) {
               callback(formatDate(31));
           }
           else if (/^(4|6|9|11)$/.test(month)) {
               callback(formatDate(30));
           }
           else if (/^2$/.test(month)) {
               if (year % 4 === 0 && year % 100 !==0 || year % 400 === 0) {
                   callback(formatDate(29));
               }
               else {
                   callback(formatDate(28));
               }
           }
           else {
               throw new Error('month is illegal');
           }
       // }, 2000);
       // ajax请求可以这样写
       /*
       $.ajax({
           type: 'get',
           url: '/example',
           success: function(data) {
               callback(data);
           }
       });
       */
   };
   selectDateDom.addEventListener('click', function () {
       var oneLevelId = showDateDom.getAttribute('data-year');
       var twoLevelId = showDateDom.getAttribute('data-month');
       var threeLevelId = showDateDom.getAttribute('data-date');
       var iosSelect = new IosSelect(3,
           [yearData, monthData, dateData],
           {
               title: '',
               itemHeight: 35,
               oneLevelId: oneLevelId,
               twoLevelId: twoLevelId,
               threeLevelId: threeLevelId,
               showLoading: true,
               callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                   showDateDom.setAttribute('data-year', selectOneObj.id);
                   showDateDom.setAttribute('data-month', selectTwoObj.id);
                   showDateDom.setAttribute('data-date', selectThreeObj.id);
                   showDateDom.innerHTML =(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                   showDateDom.classList = "item-right"
               }
       });
   });
},
  takePhoto(){

  },
  sendAjax(){
    let birthdate =  document.querySelector('#showDate').innerHTML.replace("Tahun","-").replace("bulan","-").replace("tanggal","").replace(/ /g,"");
    let education =  document.querySelector('#showEdu').innerHTML;
    let profession = document.querySelector('#showOccupation').innerHTML;
    let gender = this.sexVal == "Laki-laki" ? "male" : "female";

  //防止重复发送请求
    if (!this.ajaxFlag) {
      return false;
    }
    this.ajaxFlag = false;

    if (this.name && birthdate && education && profession && gender && this.seletedHobbyArr.length) {
      this.$http({
          url: '/api/personal/info/perfect',
          method: 'post',
          data: {
            token: '9e43494fd46bfac1445bc781c06d576b',
            nickname: this.name,
            avatar: 'http://192.168.1.88/media/article/1521255346_ktp.jpeg',
            gender: gender,
            birthdate: birthdate,
            education: education,
            profession: profession,
            interest: this.seletedHobbyArr
          }
      }).then((res) => {
        if (res.status.code == 200) {
          this.data = res.data
          console.log(this.data)

        }else if (res.data.status.code == 204) {
          //this.$router.push({path: '/login'});
          //this.isLogin = false;
        }

      }).catch((res) => {
          console.log('error: ', res);
      });
    }else {
      this.toastPop("您还有信息没填写完整")
    }

  },
  },
  mounted(){
      this.initFun();
      this.formatEdu();
      this.formatOccupation();
      this.formatDate();
  },
  created(){
    // this.$http({
    //     url: '/api/personal/info/perfect',
    //     method: 'post',
    //     data: {
    //       token: '9e43494fd46bfac1445bc781c06d576b',
    //       nickname: this.name,
    //       avatar: 'http://192.168.1.88/media/article/1521255346_ktp.jpeg',
    //       gender: 'male',
    //       birthdate: '2015年12月12',
    //       education: 'S1',
    //       profession: 'sd',
    //       interest: this.seletedHobbyArr
    //     }
    // }).then((res) => {
    //   if (res.status.code == 200) {
    //     this.data = res.data
    //     console.log(this.data)
    //     // this.name = res.data.data.tel;
    //     // this.isLogin = true;
    //   }else if (res.data.status.code == 204) {
    //     //this.$router.push({path: '/login'});
    //     //this.isLogin = false;
    //   }
    //
    // }).catch((res) => {
    //     console.log('error: ', res);
    // });

    // this.$http({
    //     url: '/api/user/profile/info',
    //     method: 'get',
    // }).then((res) => {
    //   if (res.data.status.code == 200) {
    //     this.hasProfile = true;
    //   }else if (res.data.status.code == 201) {
    //     //this.$router.push({path: '/login'});
    //     this.hasProfile = false;
    //   }
    //
    // }).catch((res) => {
    //     console.log('error: ', res);
    // });

  }


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
@import "../assets/css/user.css";
@import "../../node_modules/iosselect/src/iosSelect.css";

.ios-select-widget-box header.iosselect-header a {
  color: #ffc21e;
}
.ios-select-widget-box.olay{
  background: rgba(0, 0, 0, 0.3);
}
</style>
