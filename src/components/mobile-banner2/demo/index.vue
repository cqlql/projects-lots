<template>
  <div style="height:300px">
    <MobileBanner :imgs="imgs" :timer-interval="timerInterval" :type="type" />
    <p>
      <button @click="restart">还原</button>
      <button @click="changeImgs">更换图片</button>
      <button @click="clearImgs">清空图片</button>
      <button @click="start">开启自动切换 1000ms</button>
      <button @click="stop">停止自动切换</button>
      <label>间隔时间：<input v-model="timerInterval" type="text"></label>
      <label>动画类型
        <select v-model="type">
          <option value="Fade">渐变</option>
          <option value="Move">移动</option>
        </select>
      </label>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import MobileBanner from '../index.vue'

@Component({
  components: {
    MobileBanner
  }
})
export default class MobileBannerDemo extends Vue {
  timerInterval = 0
  imgs: string[] = []
  type = 'Move'
  created () {
    this.restart()
  }
  restart () {
    this.imgs = [
      'https://img20.360buyimg.com/babel/s590x470_jfs/t1/71657/36/811/90591/5cf0992bEbedc5968/5811f6e6885aa79d.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/pop/s590x470_jfs/t1/35566/22/8894/89520/5cf09f96Eaad51d43/473a70dbda131d1b.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/da/s590x470_jfs/t1/45170/18/1300/97198/5cf11302E98732d77/76d682cb81b56414.jpg!q90!cc_590x470.webp'
    ]
    this.timerInterval = 1000
  }
  changeImgs () {
    this.imgs = [
      'https://img1.360buyimg.com/pop/s590x470_jfs/t1/49219/35/4018/79238/5d1c83d5E48444dcc/83f09614c35a937e.jpg!q90!cc_590x470.webp',
      'https://img1.360buyimg.com/da/s590x470_jfs/t1/78952/13/3431/103621/5d1aaa15E46a1bf7a/90694b02870870e5.jpg!q90!cc_590x470.webp'
    ]
  }
  stop () {
    this.timerInterval = 0
  }
  start () {
    this.timerInterval = 1000
  }
  clearImgs () {
    this.imgs = []
  }
}
</script>
