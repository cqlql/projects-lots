
<template>
  <div class="box">
    <div class="item">
      <button @click="isShow=!isShow">fade 显示/隐藏</button>
      <VTransition>
        <div class="cont" v-show="isShow">fade</div>
      </VTransition>
      <pre>
      &lt;VTransition&gt;
        &lt;div class="cont" v-show="isShow"&gt;fade&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowSlide=!isShowSlide">slide 显示/隐藏</button>
      <VTransition :name="isShowSlide?'slide-left':'slide-right'">
        <div class="cont" v-show="isShowSlide">slide-left/slide-right</div>
      </VTransition>
      <pre>
      &lt;VTransition :name="isShowSlide?'slide-left':'slide-right'"&gt;
        &lt;div class="cont" v-show="isShowSlide"&gt;slide-left/slide-right&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowZoom=!isShowZoom">zoom 显示/隐藏</button>
      <VTransition :name="isShowZoom?'zoom-in':'zoom-out'">
        <div class="cont" v-show="isShowZoom">zoom-in/zoom-out</div>
      </VTransition>
      <pre>
      &lt;VTransition :name="isShowZoom?'zoom-in':'zoom-out'"&gt;
        &lt;div class="cont" v-show="isShowZoom"&gt;zoom-in/zoom-out&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowBottom=!isShowBottom">slide-bottom 显示/隐藏</button>
      <VTransition name="slide-down">
        <div class="cont slide-down" v-show="isShowBottom">slide-bottom</div>
      </VTransition>
      <pre>
      &lt;VTransition name="slide-bottom"&gt;
        &lt;div class="cont slide-bottom" v-show="isShow"&gt;slide-bottom&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>
    <div class="item">
      <button @click="isShowUp=!isShowUp">slide-up 显示/隐藏</button>
      <VTransition name="slide-up">
        <div class="cont slide-up" v-show="isShowUp">slide-up</div>
      </VTransition>
      <pre>
      &lt;VTransition name="slide-bottom"&gt;
        &lt;div class="cont slide-bottom" v-show="isShow"&gt;slide-bottom&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>

    <div class="item">
      <button @click="isShowGroup=!isShowGroup">group 显示/隐藏</button>
      <VTransition group>
        <div class="group-item" v-for="v of 3" :key="v" v-show="isShowGroup">{{v}}</div>
      </VTransition>
      <pre>
      &lt;VTransition group&gt;
        &lt;div class="group-item" v-for="v of 3" :key="v" v-show="isShowGroup"&gt;{\{v}}&lt;/div&gt;
      &lt;/VTransition&gt;</pre>
    </div>
  </div>

</template>

<script>
import VTransition from '../v-transition'
export default {
  data () {
    return {
      isShow: true,
      isShowSlide: true,
      isShowZoom: true,
      isShowBottom: true,
      isShowUp: false,
      isShowGroup: true
    }
  },
  components: {
    VTransition
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
.slide-down {
  height: 100px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
}
.slide-up {
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #fff;
}
.group-item {
  float: left;
  border: 3px solid #ddd;
}
</style>
