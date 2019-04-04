# 常用 vue transition 动画

```html

<template>
  <div class="box">
    <div class="item">
      <button @click="isShow=!isShow">fade 显示/隐藏</button>
      <VTransition>
        <div v-show="isShow" class="cont">fade</div>
      </VTransition>
    </div>

    <div class="item">
      <button @click="isShowSlide=!isShowSlide">slide 显示/隐藏</button>
      <VTransition :name="isShowSlide?'slide-left':'slide-right'">
        <div v-show="isShowSlide" class="cont">slide-left/slide-right</div>
      </VTransition>
    </div>

    <div class="item">
      <button @click="isShowZoom=!isShowZoom">zoom 显示/隐藏</button>
      <VTransition :name="isShowZoom?'zoom-in':'zoom-out'">
        <div v-show="isShowZoom" class="cont">zoom-in/zoom-out</div>
      </VTransition>
    </div>

    <div class="item">
      <button @click="isShowBottom=!isShowBottom">slide-bottom 显示/隐藏</button>
      <VTransition name="slide-down">
        <div v-show="isShowBottom" class="cont slide-down">slide-bottom</div>
      </VTransition>
    </div>
    <div class="item">
      <button @click="isShowSlideInDown=!isShowSlideInDown">slide-in-down 显示/隐藏</button>
      <VTransition name="slide-in-down">
        <div v-show="isShowSlideInDown" class="cont">slide-in-down</div>
      </VTransition>
    </div>
    <div class="item">
      <button @click="isShowUp=!isShowUp">slide-up 显示/隐藏</button>
      <VTransition name="slide-up">
        <div v-show="isShowUp" class="cont slide-up">slide-up</div>
      </VTransition>
    </div>

    <div class="item">
      <button @click="isShowGroup=!isShowGroup">group 显示/隐藏</button>
      <VTransition group>
        <div v-for="v of 3" :key="v" class="group-item" v-show="isShowGroup">{{ v }}</div>
      </VTransition>
    </div>
  </div>
</template>

<script>
import VTransition from '@/components/v-transition/index.vue'
export default {
  components: {
    VTransition
  },
  data () {
    return {
      isShow: true,
      isShowSlide: true,
      isShowZoom: true,
      isShowBottom: true,
      isShowUp: false,
      isShowGroup: true,
      isShowSlideInDown: true
    }
  }
}
</script>

```