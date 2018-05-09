<template>
  <div class="turntable">
    <div ref="eDist" class="dist"></div>
    <p style="height:100px"></p>
    <button @click="start">start</button>
    <button @click="stop">stop</button>
    <button @click="test">test</button>
  </div>
</template>

<script>
  import Turntable from './turntable2'
  import Animation from './animation2'
  import autoPrefix from '../corejs/dom/css/autoprefix'

  let transform = autoPrefix('transform')[1]
  export default {
    name: 'deom',
    created () {},
    mounted () {
      let turntable = (this.turntable = new Turntable())
      turntable.init({
        el: this.$refs.eDist,
        complete () {
          console.log('结束')
        }
      })

      this.animation = new Animation()
    },
    methods: {
      start () {
        let {turntable, animation} = this
        if (animation.isRun) return
        let eDist = this.$refs.eDist
        let deg = 0
        animation.start(
          100,
          s => {
            deg += s

            this.deg = deg

            eDist.style[transform] = 'rotate3d(0,0,1,' + deg + 'deg)'
          },
          400
        )
      },
      stop () {
        let {animation} = this
        animation.stop(() => 360 - this.deg % 360 + 360)
      },
      // 计算 减速度总次数
      test () {
        // 加速缓动
        function easeIn (x, t, b, c, d) {
          // return c * (t /= d) * t * t + b
          return c * (t /= d) * t + b
        }

        // 减速缓动
        function easeOut (x, t, b, c, d) {
          // return c * ((t = t / d - 1) * t * t * t * t + 1) + b
          return -c * (t /= d) * (t - 2) + b
        }

        function getOutTotal () {

        }

        console.log(easeOut(null, 1, 0, 1000, 10))
        console.log(getOutTotal())
      }
    }
  }
</script>

<style scoped lang="postcss">
  .turntable {
    padding: 20px;
    .dist {
      width: 200px;
      height: 200px;
      background-color: #ddd;
    }
  }
</style>
