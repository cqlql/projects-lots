<template>
  <VTransition group :activeClass="$style.transitionActive">
    <Toast v-for="options of list" :options="options" :key="options.id"></Toast>
  </VTransition>
</template>

<script>
import VTransition from '@/components/v-transition'
import Toast from './Toast'
let id = 0
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    show (options) {
      options.id = id++
      // 位置处理  部分类型默认居中
      if (/success|error/.test(options.type)) options.position = options.position || 'center'
      // 显示/自动关闭
      const {list} = this
      list.push(options)
      setTimeout(function () { list.shift() }, 1600)
    },
    text (text) {
      this.show({
        text
      })
    },
    success (text) {
      this.show({
        type: 'success',
        text
      })
    },
    error (text) {
      this.show({
        type: 'error',
        text
      })
    }
  },
  components: {
    VTransition,
    Toast
  }
}
</script>

<style module>
.transitionActive {
  transition: 0.2s ease;
  transition-property: opacity;
}
</style>
