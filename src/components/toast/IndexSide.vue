<template>
  <div>
    <VTransition group :activeClass="$style.transitionActive" name="slide-up">
      <ToastSide v-for="options of listSlideUp" :options="options" :key="options.id"></ToastSide>
    </VTransition>
    <VTransition group :activeClass="$style.transitionActive" name="slide-down">
      <ToastSide v-for="options of listSlideDown" :options="options" :key="options.id"></ToastSide>
    </VTransition>
    <VTransition group :activeClass="$style.transitionActive">
      <Toast v-for="options of listFade" :options="options" :key="options.id"></Toast>
    </VTransition>
  </div>
</template>

<script>
import VTransition from '@/components/v-transition'
import ToastSide from './ToastSide'
import Toast from './Toast'
let id = 0
export default {
  components: {
    VTransition,
    ToastSide,
    Toast
  },
  data () {
    return {
      // transitionName: 'fade',
      // toastName: 'Toast',
      listFade: [],
      listSlideUp: [],
      listSlideDown: []
    }
  },
  methods: {
    show (options) {
      options.id = id++
      // 位置处理  部分类型默认居中
      // if (/success|error/.test(options.type)) options.position = options.position || 'center'// 部分类型默认居中

      options.position = options.position || 'top-side'

      let list
      if (options.position === 'top-side') {
        list = this.listSlideUp
      } else if (options.position === 'bottom-side') {
        list = this.listSlideDown
      } else {
        list = this.listFade
      }

      // 显示/自动关闭
      this.listShow(list, options)
    },
    listShow (list, options) {
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
  }
}
</script>

<style module>
.transitionActive {
  transition: 0.2s ease;
  transition-property: opacity,transform;
}
</style>
