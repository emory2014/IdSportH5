<template>
  <div >
    <Loading v-if="!data"/>
    <div v-if="data" >
    <div class="invite-bg">
      <div class="invite-count-item">
        <p class="record-title">
          {{data.intiver.count}} Orang
        </p>
         <p>
          Jumlah teman <br> yang sayaundang
        </p>
      <i class="divider"></i>
      </div>
      <div class="invite-count-item">
         <p class="record-title">
          Rp.{{data.intiver.bonus}}
        </p>
         <p class="text">
          Bonus saya
        </p>
      </div>
    </div>
    <div class="cont-sec">
    <p class="invite-record-title">Peringkat undang teman</p>
    <ul>
      <li>
        <span>Peringkat</span>
        <span>Nama</span>
        <span>Waktu</span>
      </li>
      <li v-for="(item,index) of data.list" :key="index">
        <span>{{item.ranking}}</span>
        <span>{{item.user}}</span>
        <span>{{item.time}}</span>
      </li>
    </ul>
    </div>
  </div>
  </div>
</template>

<script>
import Loading from '../Loading'

export default {
  name: 'InviteRecord',
    components: {
    Loading
  },
   data(){
            return {
                data: null,
                page: 1,
                list: [],
                totalPage: 1,
                currentPage: 1,
                flag: true,
                
            }
        },
        methods:{
          scrollGetData(){
              let _this = this;
               window.addEventListener('scroll',function(){  
                if(document.body.scrollTop + window.innerHeight <= document.body.offsetHeight) {  
                    // console.log(sw);  
                    // 如果开关打开则加载数据  
                    if(_this.flag == true){  
                        // 将开关关闭  
                        _this.flag = false;  
                        _this.page = _this.page + 1
                        if(_this.currentPage < _this.totalPage){
                             _this.getData(_this.page)
                        }    
                    }  
                }  
            });  
          },
          getData(page){
                  this.$http({
                    url: '/api/inviter/list?page='+page,
                    method: 'post',
                    data: {
                      token: '8dwre821f9bacbde1d96ec5b3cfch58u'
                    }
                }).then((res) => {
                  this.flag = true;  
                  this.data = res.data.data
                    res.data.data.list.map((item) => {
                                this.list.push(item)
                        })
                       this.currentPage = res.data.data.page_info.current_page
                       this.totalPage = res.data.data.page_info.total_page

                }).catch((res) => {
                    console.log('error: ', res);
                });
          }
        },
        mounted() {
           this.getData(1)
            this.scrollGetData()
        },
}
</script>

<style>
body{
  margin: 0;
}
.invite-bg{
  background: url(../../assets/images/invite-record-bg.png) no-repeat center;
  background-size: 100%;
  width:  92%;
  margin: 15px auto;
  overflow: hidden;
  border-radius: 5px;
}
.invite-count-item {
  position: relative;
  float: left;
  text-align: center;
  width: 50%;
  color: #333333;
  font-size: 12px;
  box-sizing: border-box;
 
}
.record-title {
  font-size: 18px;
  margin-bottom: 10px;
}
.divider {
  position: absolute;
  right: 0;
  top: 18px;
  display: inline-block;
  background: #333333;
  width: 1px;
  height: 70px;
}

.invite-count-item .text{
  margin-top: 20px;
}

.invite-record-title {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 0;
  margin-top: 20px;
}

.cont-sec {
  width: 92%;
  margin: auto;
}

.cont-sec ul {
 list-style: none;
 padding: 0;
 font-size: 14px;
 color: #666666;
 margin-top: 0;
}

.cont-sec ul li {
  border-bottom: 1px solid #ddd;
  
}
.cont-sec ul span {
  display: inline-block;
  width: 30%;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

</style>
