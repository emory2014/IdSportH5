<template>
<div class="scroll-panel" ref="scrollPanel" v-if="data">
  <span v-for="(i,index) of data" :key="index">
    <span v-if="index != 0" class="scroll-devider" :class="[index < continuous ? '':'gray']"></span><span class="scroll-item" :class="[index < continuous ? '':'gray',data.length > 3 ? '':'three']">{{i}}</span>
  </span>
</div>
</template>
<script>
export default {
  name: 'TaskScrollItem',
  data() {
    return {

    }
  },
  props: {
    data: Array,
    continuous: Number
  },
  mounted() {
    console.log('mounted')
    this.$nextTick(() => {
      if (this.$refs.scrollPanel && this.continuous > 4) {
        this.$refs.scrollPanel.scrollLeft = this.continuous * 100
      }

    })

  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  beforeDestroy() {
    console.log('beforeDestroy')

  }
}
</script>
<style>
.scroll-panel {
  width: 90%;
  margin: auto;
  overflow-x: auto;
  height: 40px;
  white-space: nowrap;
}

.scroll-item {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  background: rgba(255, 213, 52, 1);
  width: 45px;
  text-align: center;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 12px;
  color: #000;
}

.scroll-item.three {
  width: 80px;
}

.scroll-devider {
  display: inline-block;
  height: 4px;
  /* background: rgba(255, 213, 52, 1); */
  background-color: #E93F3F;
  width: 40px;
  position: relative;
  top: -2px;
}

.scroll-devider.gray,
.scroll-item.gray {
  background: #ddd;
}
</style>
