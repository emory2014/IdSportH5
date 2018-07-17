<template>
  <div class="" @click="facebookShare()">
           分享
           </div>
</template>
<script>
export default {
  name: 'Test',

  data() {
    return {

    }
  },
  methods: {
       facebookShare(){
           window.AndroidWebView.shareFacebook('When Great Minds Don’t Think Alike','http://test.jiajiahebao.com/web/news?aid=2358');
            },
  }
}
</script>
<style>

</style>
