<template>
  <div>
    <h2> queue 队列</h2>
    <p>y 方向动画演示</p>
    <div class="info">
      <button @click="addAnime">增加动画</button> 当前剩余队列数：{{queue.q.length}}
    </div>
    <div class="box">
      <div class="move-box" ref="eMove"></div>
    </div>
  </div>
</template>

<script>
import Queue from '@/queue'
import AnimateTransformY from '@/animation/animate-transform-y'
export default {
  data () {
    return {
      queue: new Queue()
    }
  },
  beforeCreate () {
    console.log(this.queue)
  },
  mounted () {
    let animateTransformY = this.animateTransformY = new AnimateTransformY()
    animateTransformY.setStartY(0)
    animateTransformY.setTransitionActiveClassName('transition-active')
  },
  methods: {
    animationCss () {
      let { $refs, animateTransformY } = this
      let { eMove } = $refs
      this.queue.excu(next => {
        let y = 200 * Math.random()
        animateTransformY.start(eMove, y, next)
      })
    },
    addAnime () {
      this.animationCss()
    }
  }
}
</script>

<style scoped>
.info {
  padding: 0 0 10px;
}
.box {
  border: 1px solid #000;
  height: 300px;
  position: relative;
  .move-box {
    /*transform: translate();*/
    width: 100px;
    height: 100px;
    background-color: #000;
  }
  .transition-active {
    transition: 1.3s ease;
  }
}
</style>
