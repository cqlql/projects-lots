<template>
  <div class="mobile-banner">
    <component :is="type" ref="animation" :imgs="imgs" :width="width" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import swipex from '@/utils/corejs/drag/swipex.ts'
import Move from './animation/Move.vue'
import Fade from './animation/Fade.vue'
import Timer from '@/utils/corejs/time/timer.ts'

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
  getAnimationComp () {
    return this.$refs.animation as AnimationComp
  }
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
        this.getAnimationComp().swipeLeft()
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
  sizeUpdate (w = this.$el.clientWidth) {
    this.width = w
  }
  // 滑动交互
  slideBind () {
    this.width = this.$el.clientWidth
    let xFullLen = 0
    let that = this
    swipex({
      elem: this.$el as HTMLElement,
      onDown () {
        return that.getAnimationComp().locked !== true
      },
      onStart () {
        xFullLen = 0
        that.timer.stop()
      },
      onMove (xlen) {
        xFullLen += xlen
        that.getAnimationComp().move(xFullLen)
      },
      onEnd () {
        that.timerUpdate()
      },
      onSwipeLeft () {
        that.getAnimationComp().swipeLeft()
      },
      onSwipeRight () {
        that.getAnimationComp().swipeRight()
      },
      onSwipeNot () {
        let animationComp = that.getAnimationComp()
        // 此处处理超过 1/3 后进行滑动
        let meet = 1 / 3
        let curr = xFullLen / that.width
        if (curr < -meet) {
          animationComp.swipeLeft()
        } else if (curr > meet) {
          animationComp.swipeRight()
        } else {
          animationComp.swipeNot()
        }
      }
    })
  }
}
</script>

<style scoped>
.mobile-banner {
  /* min-width: 100px;
  min-height: 100px; */
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
