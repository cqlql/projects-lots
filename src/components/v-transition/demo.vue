
<template>
  <div class="box">
    <div class="item">
      <button @click="isShow=!isShow">fade 显示/隐藏</button>
      <VTransition>
        <div v-show="isShow" class="cont">fade</div>
      </VTransition>
      <pre>
      &lt;VTransition&gt;
        &lt;div class="cont" v-show="isShow"&gt;fade&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowSlide=!isShowSlide">slide 显示/隐藏</button>
      <VTransition :name="isShowSlide?'slide-left':'slide-right'">
        <div v-show="isShowSlide" class="cont">slide-left/slide-right</div>
      </VTransition>
      <pre>
      &lt;VTransition :name="isShowSlide?'slide-left':'slide-right'"&gt;
        &lt;div class="cont" v-show="isShowSlide"&gt;slide-left/slide-right&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowZoom=!isShowZoom">zoom 显示/隐藏</button>
      <VTransition :name="isShowZoom?'zoom-in':'zoom-out'">
        <div v-show="isShowZoom" class="cont">zoom-in/zoom-out</div>
      </VTransition>
      <pre>
      &lt;VTransition :name="isShowZoom?'zoom-in':'zoom-out'"&gt;
        &lt;div class="cont" v-show="isShowZoom"&gt;zoom-in/zoom-out&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowSlideInDown=!isShowSlideInDown">slide-in-down 显示/隐藏</button>
      <VTransition name="slide-in-down">
        <div v-show="isShowSlideInDown" class="cont">slide-in-down</div>
      </VTransition>
      <pre>
      &lt;VTransition :name="isShowZoom?'zoom-in':'zoom-out'"&gt;
        &lt;div class="cont" v-show="isShowZoom"&gt;zoom-in/zoom-out&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowBottom=!isShowBottom">slide-bottom 显示/隐藏</button>
      <VTransition name="slide-bottom">
        <div v-show="isShowBottom" class="cont slide-bottom">slide-bottom</div>
      </VTransition>
      <pre>
      &lt;VTransition name="slide-bottom"&gt;
        &lt;div class="cont slide-bottom" v-show="isShow"&gt;slide-bottom&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>
  </div>
</template>

<script>
import VTransition from '@/components/v-transition'
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
      isShowSlideInDown: true
    }
  }
}
</script>

<style scoped>
.box {
  margin: 8px;
}
button {
  float: left;
  height: 27px;
}
pre {
  font-family: Consolas;
  clear: both;
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}
.cont {
  border: 3px solid #ddd;
  float: left;
  margin-left: 10px;
}
.item {
  clear: both;
}
.slide-bottom {
  height: 100px;
  position: fixed;
  bottom: 0;
}
</style>
