<template>
  <div>
    <p>
      <button class="button" @click="show">显示 loading，默认延迟 200ms，1s 后关闭</button>
    </p>
    <p>
      <button class="button" @click="directShow">直接显示 loading，不延迟，1s 后关闭</button>
    </p>
    <p>
      <button class="button" @click="maskShow">带蒙层</button>
    </p>
    <p>
      <button class="button" @click="pluginShow">plugin 调用</button>
    </p>
    <p>记录点击数，延迟情况是否也避免点击：{{clickCount}}</p>
    <Loading ref="vLoading" />
  </div>
</template>

<script>

import Loading from './index'
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
    },
    maskShow () {
      this.$refs.vLoading.show({mask: true})
      setTimeout(() => {
        this.$refs.vLoading.hide()
      }, 1000)
    },
    pluginShow () {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 1000)
    }
  },
  components: {
    Loading
  }
}
</script>

<style scoped>
p {
  margin: 5px;
}
</style>
