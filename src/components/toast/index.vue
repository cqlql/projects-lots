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
      listSlideDown: [],

      // 默认位置
      successPosition: 'center',
      errorPosition: 'center',
      position: 'bottom'
    }
  },
  methods: {
    show (options) {
      options.id = id++

      // 位置处理
      let {position} = options
      if (!position) {
        if (options.type === 'success') {
          position = this.successPosition
        } else if (options.type === 'error') {
          position = this.errorPosition
        } else {
          position = this.position // 设置默认值
        }
        options.position = position
      }

      let list
      if (position === 'top-side') {
        list = this.listSlideUp
      } else if (position === 'bottom-side') {
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
    text (text, position) {
      this.show({
        text,
        position
      })
    },
    success (text, position) {
      this.show({
        type: 'success',
        text,
        position
      })
    },
    error (text, position) {
      this.show({
        type: 'error',
        text,
        position
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
