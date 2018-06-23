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
     created() {
      window.setPhotoData =this.setPhotoData;
     },
     methods:{
        doTakePhotoW() {
          console.log(1243)
                window.AndroidWebView.doTakePhoto();
            },
			 doPickPhotoFromGalleryW() {
                window.AndroidWebView.doPickPhotoFromGallery();
            },
      setPhotoData(dataStr){
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
