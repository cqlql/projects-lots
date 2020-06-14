<template>
  <div>
    <div class="banner" style="height:100px">
      <a class="go-left" @click="goLeft">左边</a>
      <MobileBanner ref="vMobileBanner" :imgs="imgs" :timer-interval="timerInterval" />
      <a class="go-right" @click="goRight">右边</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import MobileBanner from '../index.vue'

interface AnimationComp extends Vue {
  show (index: number): void
  move (x: number): void
  swipeLeft (): void
  swipeRight (): void
  swipeNot (): void
}
@Component({
  components: {
    MobileBanner
  }
})
export default class PcFullWidth extends Vue {
  timerInterval = 0
  imgs: string[] = []
  created () {
    this.restart()
  }

  restart () {
    this.imgs = [
      'https://img20.360buyimg.com/babel/s590x470_jfs/t1/71657/36/811/90591/5cf0992bEbedc5968/5811f6e6885aa79d.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/pop/s590x470_jfs/t1/35566/22/8894/89520/5cf09f96Eaad51d43/473a70dbda131d1b.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/da/s590x470_jfs/t1/45170/18/1300/97198/5cf11302E98732d77/76d682cb81b56414.jpg!q90!cc_590x470.webp'
    ]
    // this.timerInterval = 1000
  }

  resize () {

  }

  bindResize () {
    window.addEventListener('resize', this.resize)
  }

  unBindResize () {
    window.removeEventListener('resize', this.resize)
  }

  goLeft () {
    (this.$refs.vMobileBanner as AnimationComp).swipeLeft()
  }

  goRight () {
    (this.$refs.vMobileBanner as AnimationComp).swipeRight()
  }
}
</script>
