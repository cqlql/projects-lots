<template>
  <ul class="move" :style="{[transform]:`translateX(${left}px)`}">
    <li v-if="multiple" class="item" :style="{[transform]:'translateX(-100%)'}">
      <img :src="lastItem.isShow && lastItem.url">
    </li>
    <li v-for="(item,index,key) of list" :key="key" class="item" :style="{[transform]:`translateX(${index*100}%)`}">
      <img :src="item.isShow && item.url">
    </li>
    <li v-if="multiple" class="item" :style="{[transform]:`translateX(${count*100}%)`}">
      <img :src="firstItem.isShow && firstItem.url">
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import autoprefix from '@/libs/corejs/css/autoprefix.ts'
import transitionendOnce from '@/libs/corejs/animation/transitionend-once.ts'
import timeout from '@/libs/corejs/time/timeout-async'
interface imgItem {
  isShow: boolean
  url: string
}

@Component
export default class Move extends Vue {
  @Prop() readonly imgs!: string[]
  @Prop() readonly width!: number
  index = 0
  list: imgItem[] = []
  transform: string = autoprefix('transform') as string
  left = 0
  locked = false
  get count () {
    return this.list.length
  }

  get multiple () {
    return this.count > 1
  }

  get firstItem () {
    return this.list[0]
  }

  get lastItem () {
    return this.list[this.count - 1]
  }

  move (x: number) {
    this.left = x - this.index * this.width
  }

  swipeLeft () {
    if (!this.multiple) {
      this.swipeNot()
      return
    }
    let { index } = this
    index++
    this.loadImg(index)
    this.animate(this.$el as HTMLElement, -index * this.width, () => {
      if (index >= this.count) {
        index = 0
        this.left = 0
      }
      this.index = index
    })
  }

  swipeRight () {
    if (!this.multiple) {
      this.swipeNot()
      return
    }
    let { index } = this
    index--
    this.loadImg(index)
    this.animate(this.$el as HTMLElement, -index * this.width, () => {
      if (index < 0) {
        index = this.count - 1
        this.left = -index * this.width
      }
      this.index = index
    })
  }

  swipeNot () {
    this.animate(this.$el as HTMLElement, -this.index * this.width)
  }

  @Watch('width')
  watchWidth () {
    if (this.locked) return
    this.move(0)
  }

  @Watch('imgs')
  onImgsChanged () {
    this.listSet()
    this.loadImg(0)
    this.index = 0
    this.move(0)
  }

  created () {
    this.listSet()
    this.loadImg(this.index)
    this.move(0)
  }

  listSet () {
    this.list = this.imgs.map(url => ({
      isShow: false,
      url
    }))
  }

  // 三张图加载方案：当前张和旁边两张，尽量不然用户看到加载的过程
  async loadImg (index: number) {
    if (index >= this.count) index = 0
    if (index < 0) index = this.count - 1

    const list = this.list
    const item = list[index]
    item.isShow = true

    await timeout(2000)

    const preItem = list[index - 1] || this.lastItem
    const nextItem = list[index + 1] || list[0]
    preItem.isShow = nextItem.isShow = true
  }

  // 一张图加载方案：只加载当前图片，最快的将整个页面渲染出来
  // loadImg (index: number) {
  //   if (index >= this.count) index = 0
  //   if (index < 0) index = this.count - 1
  //   const item = list[index]
  //   if (item) item.isShow = true
  // }

  animate (elem: HTMLElement, x: number, cb: () => void = () => {}) {
    const { classList } = elem
    classList.add('transitionActive')
    this.locked = true
    transitionendOnce(elem, () => {
      this.locked = false
      classList.remove('transitionActive')
      cb()
    })
    this.left = x
  }
}
</script>

<style scoped>
.move {
  position: relative;
  width: 100%;
  height: 100%;
}
.item {
  position: absolute;
  width: 100%;
  height: 100%;
}
.transitionActive {
  transition:transform 0.3s ease;
}
</style>
