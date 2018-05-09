<template>
  <div class="box">
    {{test}}
    <div class="info">
      <h2>AnimateTransformY 演示</h2>
      <button @click="addAnime">增加动画</button> 当前剩余队列数：{{queue.q.length}}
    </div>
    <div class="move-box" ref="eMove"></div>
  </div>
</template>

<script>
  import Queue from '../queue'
  import AnimateTransformY from '../animation/animate-transform-y'
  export default {
    data () {
      return {
        queue: new Queue()
      }
    },
    beforeCreate () {
      this.test = 123
      console.log(this.queue)
    },
    mounted () {
      console.log(this.test = 11)
      let animateTransformY = this.animateTransformY = new AnimateTransformY()
      animateTransformY.setStartY(0)
      animateTransformY.setTransitionActiveClassName('transition-active')
    },
    methods: {
      animationCss () {
        let {$refs, animateTransformY} = this
        let {eMove} = $refs
        this.queue.excu(complete => {
          let y = 200 * Math.random()
          animateTransformY.start(eMove, y, complete)
        })
      },
      addAnime () {
        this.animationCss()
      }
    }
  }
</script>

<style scoped lang="postcss">
.box {
  border: 1px solid #000;
  height: 300px;
  position: relative;
  .info {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 10px;
  }
  .move-box {
    /*transform: translate();*/
    width: 100px;
    height: 100px;
    background-color: #000;
  }
  .transition-active{
    transition: 1.3s ease;
  }
}

</style>
