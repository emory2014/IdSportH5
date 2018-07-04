<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
   <!-- <router-view/>  -->
    <!-- <div @click="doTakePhotoW()">相机测试</div>
    <div @click="doPickPhotoFromGalleryW()">相册测试</div> -->
    <p>JS和Android交互</p>
        <button @click="invokeAppMethod()">兑换金币</button>
        <br/>
        <br/>
        <button @click="sendInfoToJava()">邀请好友</button>
		<br/>
        <br/>
		<button @click="closeActivitiesW()">关闭所有界面(除了主界面)</button>
        <br/>
        <br/>
		<button @click="showNewsListW()">显示新闻列表</button>
        <br/>
        <br/>
		<button @click="showGoldMallW()">显示金币商城界面</button>
        <br/>
        <br/>
		<button @click="showTaskFirstPageW()">显示任务签到界面</button>
        <br/>
        <br/>
		<button @click="showMineW()">显示我的界面</button>
        <br/>
        <br/>
		<button @click="showPersonalActivityW()">显示个人信息界面</button>
        <br/>
        <br/>
		<button @click="showMyIncomeGoldW()">显示我的收入金币列表界面</button>
        <br/>
        <br/>
		<button @click="showMyIncomeChangeW()">显示我的收入零钱列表界面</button>
        <br/>
        <br/>
		<button @click="showCustomFeedbackW()">显示客户反馈界面</button>
        <br/>
        <br/>
		<button @click="showMyTreasureW()">显示我的夺宝界面</button>
        <br/>
        <br/>
		<button @click="showLatestW()">显示最新揭晓界面</button>
        <br/>
        <br/>
		<button @click="showRpc2RpW()">显示Rpc2Rp界面</button>
        <br/>
        <br/>
		<button @click="showRp2RpcW()">显示Rp2Rpc界面</button>
        <br/>
        <br/>
		<button @click="shareWhatsAppW()">不带图片分享到WhatsApp</button>
        <br/>
        <br/>
		<button @click="shareWhatsAppPicW()">带图片分享到WhatsApp(图片数据是Base64字符串)</button>
        <br/>
        <br/>
		<button @click="clearWhatsAppPicW()">清除App分享到WhatsApp图片缓存数据(单一清除)</button>
        <br/>
        <br/>
		<button @click="shareFacebookW()">（带图或是不带图---共用一个接口）分享到Facebook</button>
        <br/>
        <br/>
		<button @click="loginW()">登录APP</button>
        <br/>
        <br/>
		<button @click="getTokenW()">获取APP Token</button>
        <br/>
        <br/>
		<button @click="showContentW()">App Show Content</button>
        <br/>
        <br/>
		<button @click="doTakePhotoW()">调用相机拍照接口</button>
        <br/>
        <br/>
		<button @click="doPickPhotoFromGalleryW()">调用相册接口</button>
        <br/>
        <br/> 
        <button @click="openGoogleRewardAdW()">打开谷歌激励广告</button>
        <br/>
        <br/>
       
  </div>
</template>

 <script>
// import Vue from 'vue'
// export default {
//   name: 'app'
// }


 export default{
   name: 'test',
     created() {
      window.setPhotoData =this.setPhotoData;
     },
     methods:{
         openGoogleRewardAdW(){
				window.AndroidWebView.openGoogleRewardAd();
			},
        doTakePhotoW() {
          console.log(1243)
                window.AndroidWebView.doTakePhoto();
            },
			 doPickPhotoFromGalleryW() {
                window.AndroidWebView.doPickPhotoFromGallery();
            },
      setPhotoData(dataStr){
     window.AndroidWebView.showContent("头像Base64数据:");
      },
       showGoldMallW(){
				window.AndroidWebView.showGoldMall();
			},
			 clearWhatsAppPicW(){
				//只能清除当前分享的图片，不能清除历史分享过的图片
				window.AndroidWebView.clearWhatAppCurrentPic();
			},
			 doTakePhotoW() {
                window.AndroidWebView.doTakePhoto();
            },
			 doPickPhotoFromGalleryW() {
                window.AndroidWebView.doPickPhotoFromGallery();
            },
			
			
			 showContentW() {
                window.AndroidWebView.showContent("From Web Test Content");
            },
			 loginW() {
                window.AndroidWebView.loginApp();
            },
			 getTokenW() {
                var content=window.AndroidWebView.getAppToken();
				window.AndroidWebView.showContent(content);
            },
            // 发送消息到Android客户端
             sendInfoToJava() {
                window.AndroidWebView.inviteFriends();
            },

            // 直接调用Android客户端中的showInfoFromJs方法
             invokeAppMethod() {
                window.AndroidWebView.exchangeGold();
            },
			
			 closeActivitiesW() {
                window.AndroidWebView.closeActivities();
            },
			 showNewsListW() {
                window.AndroidWebView.showNewsList();
            },
			 showPersonalActivityW() {
                window.AndroidWebView.showPersonalActivity();
            },
			 showTaskFirstPageW() {
                window.AndroidWebView.showTaskFirstPage();
            },
			 showMineW() {
                window.AndroidWebView.showMine();
            },
			 showMyIncomeGoldW() {
                window.AndroidWebView.showMyIncomeGold();
            },
			 showMyIncomeChangeW() {
                window.AndroidWebView.showMyIncomeChange();
            },
			 showCustomFeedbackW() {
                window.AndroidWebView.showCustomFeedback();
            },
			 showMyTreasureW() {
                window.AndroidWebView.showMyTreasure();
            },
			 showLatestW() {
                window.AndroidWebView.showLatest();
            },
			 showRpc2RpW() {
                window.AndroidWebView.showRpc2Rp();
            },
			 showRp2RpcW() {
                window.AndroidWebView.showRp2Rpc();
            },
			 shareWhatsAppW() {
				//调用android程序中的方法，并传递参数
                var title = '我是JS 分享 WhatApp';
				        var link = 'https://fir.im/';
                window.AndroidWebView.shareWhatsApp(title,link);
            },
			 shareWhatsAppPicW() {
				//调用android程序中的方法，并传递参数
                var title = '我是JS 分享 WhatApp';
				var link = 'https://fir.im/';
				var picData="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";//注意图片数据是Base64字符串
				var imageUri="http://www.test.com/test.png";//确保图片地址唯一，可以是假数据但不能重复
                window.AndroidWebView.shareWhatsAppWithPic(picData,imageUri,title,link);
            },
			 shareFacebookW() {
				//调用android程序中的方法，并传递参数
                var title = '我是JS 分享 Facebook';
				var link = 'http://www.kilatfintech.com/api/article/detail?aid=2000&u-agent=newscat';
                window.AndroidWebView.shareFacebook(title,link);
            },

            //在Android代码中调用此方法
             showInfoFromApp(msg) {
                window.AndroidWebView.showContent("来自App的信息：" + msg);
            },

            //在Android代码中调用此方法,不传递信息
             showInfoFromApp() {
                window.AndroidWebView.showContent("通过App调用JS");
            }
     }
   };


 </script>

<style>
  button {
            height: 36px;
            width: 100%;
            background: #98bf21;
            }
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
