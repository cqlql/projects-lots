<template>
  <div class="mobile-banner">
    <component :is="currentComponent" ref="animation" :imgs="imgs" :width="width" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import swipex from '@/modules/corejs/drag/swipex.ts'
import Move from './animation/Move.vue'
import Timer from '@/modules/corejs/time/timer.ts'

interface AnimationComp extends Vue {
  locked: boolean
  move (x: number): void
  swipeLeft (): void
  swipeRight (): void
  swipeNot (): void
}

@Component({
  components: {
    Move
  }
})
export default class MobileBanner extends Vue {
  currentComponent = 'Move'
  // index = 0
  imgs: string[] = []
  width = 300
  timer!: Timer
  get animationComp () {
    return this.$refs.animation as AnimationComp
  }
  get imgsCount () {
    return this.imgs.length
  }
  @Watch('imgsCount')
  onImgsChanged () {
    this.timerStart()
  }
  created () {
    this.imgs = [
      'https://img20.360buyimg.com/babel/s590x470_jfs/t1/71657/36/811/90591/5cf0992bEbedc5968/5811f6e6885aa79d.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/pop/s590x470_jfs/t1/35566/22/8894/89520/5cf09f96Eaad51d43/473a70dbda131d1b.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/da/s590x470_jfs/t1/45170/18/1300/97198/5cf11302E98732d77/76d682cb81b56414.jpg!q90!cc_590x470.webp'
    ]
  }
  mounted () {
    this.width = this.$el.clientWidth
    let xFullLen = 0
    let that = this
    this.timer = new Timer({
      time: 1000,
      callback () {
        that.animationComp.swipeLeft()
      }
    })
    swipex({
      elem: this.$el as HTMLElement,
      onDown () {
        return that.animationComp.locked !== true
      },
      onStart () {
        xFullLen = 0
        that.timer.stop()
      },
      onMove (xlen) {
        xFullLen += xlen
        that.animationComp.move(xFullLen)
      },
      onEnd () {
        that.timerStart()
      },
      onSwipeLeft () {
        that.animationComp.swipeLeft()
      },
      onSwipeRight () {
        that.animationComp.swipeRight()
      },
      onSwipeNot () {
        // 此处处理超过 1/3 后进行滑动
        let meet = 1 / 3
        let curr = xFullLen / that.width
        if (curr < -meet) {
          that.animationComp.swipeLeft()
        } else if (curr > meet) {
          that.animationComp.swipeRight()
        } else {
          that.animationComp.swipeNot()
        }
      }
    })
    this.timerStart()
  }
  timerStart () {
    if (this.imgsCount > 1) {
      this.timer.tryStart()
    } else {
      this.timer.stop()
    }
  }
}
</script>

<style scoped>
.mobile-banner {
  background: #ddd;
  width: 590px;
  height: 470px;
  overflow: hidden;
  margin: 0 auto;
}
</style>
