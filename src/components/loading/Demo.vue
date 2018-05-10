<template>
  <div>
    <button @click="show">显示 loading，默认延迟 200ms，1s 后关闭</button>
    <button @click="directShow">直接显示 loading，不延迟，1s 后关闭</button>
    <div>记录点击数，延迟情况是否也避免点击：{{clickCount}}</div>
    <Loading ref="vLoading" />
  </div>
</template>

<script>
import Loading from './Index'
export default {
  data () {
    return {
      clickCount: 0
    }
  },
  methods: {
    show () {
      this.$refs.vLoading.show({ time: 400 })
      this.clickCount++

      setTimeout(() => {
        this.$refs.vLoading.hide()
      }, 1000)
    },
    directShow () {
      this.$refs.vLoading.show({ time: 0 })
      setTimeout(() => {
        this.$refs.vLoading.hide()
      }, 1000)
    }
  },
  components: {
    Loading
  }
}
</script>
