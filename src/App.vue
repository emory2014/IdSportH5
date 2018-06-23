<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <div @click="doTakePhotoW()">相机测试</div>
    <div @click="doPickPhotoFromGalleryW()">相册测试</div>
  </div>
</template>

 <script>
import Vue from 'vue'
// export default {
//   name: 'app'
// }


 export default{
   name: 'test',
     created: function() {
      window.setPhotoData =this.setPhotoData;
     },
     methods:{
        doTakePhotoW: function() {
          console.log(1243)
                window.AndroidWebView.doTakePhoto();
            },
			 doPickPhotoFromGalleryW: function() {
                window.AndroidWebView.doPickPhotoFromGallery();
            },
      setPhotoData:function(dataStr){
     window.AndroidWebView.showContent("头像Base64数据:");
      }
     }
   };


 </script>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
