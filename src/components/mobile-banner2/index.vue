<template>
  <div class="mobile-banner">
    <component :is="type" ref="animation" :imgs="imgs" :width="width" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import swipex from '@/libs/corejs/drag/swipex.ts'
import Move from './animation/Move.vue'
import Fade from './animation/Fade.vue'
import Timer from '@/libs/corejs/time/timer.ts'

interface AnimationComp extends Vue {
  locked: boolean
  show (index: number): void
  move (x: number): void
  swipeLeft (): void
  swipeRight (): void
  swipeNot (): void
}

@Component({
  components: {
    Move,
    Fade
  }
})
export default class MobileBanner extends Vue {
  @Prop({ default: () => [] }) imgs!:string[]
  @Prop() timerInterval!:number
  @Prop({ default: 'Move' }) type!:string
  width = 300
  timer!: Timer
  // getAnimationComp () {
  //   return this.$refs.animation as AnimationComp
  // }

  get imgsCount () {
    return this.imgs.length
  }

  @Watch('imgsCount')
  watchImgsCount () {
    this.timerUpdate()
  }

  @Watch('timerInterval')
  watchTimerInterval (timerInterval: number) {
    this.timer.time = timerInterval
    this.timerUpdate()
  }

  mounted () {
    this.sizeUpdate()
    this.timer = new Timer({
      time: this.timerInterval,
      callback: () => {
        this.swipeLeft()
      }
    })
    this.timerUpdate()
    this.slideBind()
  }

  timerUpdate () {
    if (this.imgsCount > 1 && this.timerInterval) {
      this.timer.start()
    } else {
      this.timer.stop()
    }
  }

  // 宽度更新，等宽情况窗口大小改变可调用
  sizeUpdate (w = this.$el.clientWidth) {
    this.width = w
  }

  swipeLeft () {
    (this.$refs.animation as AnimationComp).swipeLeft()
  }

  swipeRight () {
    (this.$refs.animation as AnimationComp).swipeRight()
  }

  swipeNot () {
    (this.$refs.animation as AnimationComp).swipeNot()
  }

  move (x: number) {
    (this.$refs.animation as AnimationComp).move(x)
  }

  // 滑动交互
  slideBind () {
    this.width = this.$el.clientWidth
    let xFullLen = 0
    const that = this
    swipex({
      elem: this.$el as HTMLElement,
      onDown () {
        return (that.$refs.animation as AnimationComp).locked !== true
      },
      onStart () {
        xFullLen = 0
        that.timer.stop()
      },
      onMove (xlen) {
        xFullLen += xlen
        that.move(xFullLen)
      },
      onEnd () {
        that.timerUpdate()
      },
      onSwipeLeft () {
        that.swipeLeft()
      },
      onSwipeRight () {
        that.swipeRight()
      },
      onSwipeNot () {
        // 此处处理超过 1/3 后进行滑动
        const meet = 1 / 3
        const curr = xFullLen / that.width
        if (curr < -meet) {
          that.swipeLeft()
        } else if (curr > meet) {
          that.swipeRight()
        } else {
          that.swipeNot()
        }
      }
    })
  }
}
</script>

<style scoped>
.mobile-banner {
  width: 100%;
  height: 100%;

  overflow: hidden;
  margin: 0 auto;
}
.mobile-banner >>> img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
