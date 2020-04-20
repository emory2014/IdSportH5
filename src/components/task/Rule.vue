<template>
<div class="rule-container task">
  <BHeader title="每日任务规则" />
  <div class="rule-title">分享新闻</div>
  <p class="text">
    分享新闻到微信/QQ，每天可以分享3次，好友阅读即
    可获得30金币，可以分享多篇但当天好友只能对任意
    3篇文章贡献3次阅读送金币。
  </p>
  <div class="rule-title">分享邀请好友</div>
  <p class="text">
    该奖励是邀请好友福利，只有发送分享到微信/QQ好友，且被朋友下载夺宝头条并认真阅读了才能拿到奖励，该奖励到账会有延迟，最多每天3次可获得300金币。
  </p>
</div>
</template>
<script>
import BHeader from '../common/BHeader.vue'
export default {
  name: 'Rule',
  components: {
    BHeader
  },
  data() {
    return {

    }
  }
}
</script>
<style src="../../assets/css/task.css">
/* @import "../../assets/css/task.css" */
</style>
