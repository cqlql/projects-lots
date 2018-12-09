<template>
  <div>
    <div>
      <h1>demo 滚动条版本 横向</h1>
      <p>
        <button @click="isRun=!isRun">销毁后定时器是否还在进行</button>
        <button @click="changeText">文本更换</button>
        <button @click="changePadding">内容 padding-bottom 更换</button>
      </p>
      <p>
        <button @click="delayTime-=10">速度加快</button>
        <button @click="start">开始</button>
        <button @click="stop">暂停</button>
      </p>
      <div :class="$style.marqueeTextDownBox">
        <MarqueeTextDown ref="vMarqueeTextDown" v-if="isRun" :text="text" :class="$style.box" :paddingRight="paddingRight" :delayTime="delayTime" />
      </div>

    </div>
    <!-- <Demo/> -->
  </div>
</template>

<script>
import MarqueeTextDown from './MarqueeTextAcross.vue'
// import Demo from './Demo.1.vue'
const t1 = `多年来，不曾一人等候过日落。`
const t2 = `${t1}而当独自一人坐在华山东峰顶---`
export default {
  data () {
    return {
      isRun: 1,
      text: t2,
      paddingRight: 30,
      delayTime: 100
    }
  },
  methods: {
    changeText () {
      this.text = this.text.length === t1.length ? t2 : t1
    },
    changePadding () {
      this.paddingRight = this.paddingRight === 30 ? 60 : 30
    },
    stop () {
      this.$refs.vMarqueeTextDown.stop()
    },
    start () {
      this.$refs.vMarqueeTextDown.start()
    }
  },
  components: {
    MarqueeTextDown
    // Demo
  }
}
</script>

<style module>
.box {
  border: 2px solid #ddd;
  height: 50px;
}
.marqueeTextDownBox {
  width:300px;
}
</style>
