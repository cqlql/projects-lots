<template>
  <div>
    <p>
      <button @click="show">显示 loading，默认延迟 200ms，1s 后关闭</button>
    </p>
    <p>
      <button @click="directShow">直接显示 loading，不延迟，1s 后关闭</button>
    </p>
    <p>
      <button @click="maskShow">带蒙层</button>
    </p>
    <p>记录点击数，延迟情况是否也避免点击：{{clickCount}}</p>
  </div>
</template>

<script>

import loading from '@/libs/loading'
export default {
  data () {
    return {
      clickCount: 0
    }
  },
  methods: {
    show () {
      loading.show()
      this.clickCount++

      setTimeout(() => {
        loading.hide()
      }, 1000)
    },
    directShow () {
      loading.show({ time: 0 })
      this.clickCount++
      setTimeout(() => {
        loading.hide()
      }, 1000)
    },
    maskShow () {
      loading.show({ mask: true })
      this.clickCount++
      setTimeout(() => {
        loading.hide()
      }, 1000)
    }
  }
}
</script>

<style scoped>
p {
  margin: 5px
}
</style>
