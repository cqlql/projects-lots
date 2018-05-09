<template>
    <div class="box">
    <div class="info">a
      <h2>AnimateTransition 演示</h2>
      <button @click="addAnime">增加动画</button> 当前剩余队列数：{{queue.q.length}}
    </div>
    <div class="move-box" ref="eMove"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  import Queue from '../../queue'
  import transitionendOnce from '../transitionend-once'
  import AnimateTransition from './animate-transition'
  import autoprefix from '../../dom/css/autoprefix'
  let transform = autoprefix('transform')[1]
  export default {
    data () {
      return {
        queue: new Queue()
      }
    },
    mounted () {
      this.preX = 0
      this.preY = 0
      this.preO = 0
      let animateTransition = this.animateTransition = new AnimateTransition()
      animateTransition.setTransition('1.3s ease')
    },
    methods: {
      animationCss () {
        let {eMove} = this.$refs
        this.queue.excu(complete => {
          let x = 200 * Math.random()
          let y = 200 * Math.random()
          let o = 1 * Math.random()
          if (this.preX === x && this.preY === y && this.preO === o) {
            complete()
          } else {
            this.animateTransition.start(eMove, {
              transform: `translate(${x}px,${y}px)`,
              opacity: o
            }, complete)
            this.preX = x
            this.preY = y
            this.preO = o
          }
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
