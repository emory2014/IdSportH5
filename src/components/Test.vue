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
           window.AndroidWebView.shareFacebook('When Great Minds Don’t Think Alike','http://www.kilatfintech.com/web/invite');
            },
  }
}
</script>
<style>

</style>
