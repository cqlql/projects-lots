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
import autoprefix from '@/modules/corejs/css/autoprefix.ts'
import transitionendOnce from '@/modules/corejs/animation/transitionend-once.ts'
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
  loadImg (index: number) {
    let list = this.list
    let preItem = list[index - 1]
    if (preItem) preItem.isShow = true
    let item = list[index]
    if (item) item.isShow = true
    let nextItem = list[index + 1]
    if (nextItem) nextItem.isShow = true
  }
  animate (elem: HTMLElement, x: number, cb: () => void = () => {}) {
    let { classList } = elem
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
}
.item {
  position: absolute;
  width: 100%;
}
.transitionActive {
  transition:transform 0.3s ease;
}
</style>
