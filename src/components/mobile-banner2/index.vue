<template>
  <div class="mobile-banner">
    <component ref="animation" :is="currentComponent" :imgs="imgs" :index="index"></component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import swipex from '@/modules/corejs/drag/swipex.ts'
import Move from './animation/Move.vue'

interface AnimationComp extends Vue {
  move (x: number): void
}

@Component({
  components: {
    Move
  }
})
export default class MobileBanner extends Vue {
  currentComponent = 'Move'
  index = 0
  imgs: string[] = []
  get animationComp () {
    return this.$refs.animation as AnimationComp
  }
  created () {
    this.imgs = [
      'https://img20.360buyimg.com/babel/s590x470_jfs/t1/71657/36/811/90591/5cf0992bEbedc5968/5811f6e6885aa79d.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/pop/s590x470_jfs/t1/35566/22/8894/89520/5cf09f96Eaad51d43/473a70dbda131d1b.jpg!q90!cc_590x470.webp'
    ]
  }
  mounted () {
    let width = 375
    let xFullLen = 0
    // let xMovePercent = 0
    let that = this
    swipex({
      elem: this.$el as HTMLElement,
      // onDown () {},
      // onStart () {},
      onMove (xlen) {
        xFullLen += xlen
        that.animationComp.move(xFullLen)
      },
      onSwipeLeft () {
        console.log('向左滑动')
      },
      onSwipeRight () {
        console.log('向右滑动')
      },
      onSwipeNot () {
        // 此处处理超过 1/3 后进行滑动
        console.log('没有滑动')
      }
    })
  }
}
</script>

<style scoped>
.mobile-banner {
  background: #ddd;
  height: 300px;
}
</style>
