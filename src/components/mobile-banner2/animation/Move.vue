<template>
  <ul class="move" :style="{[transform]:`translateX(${left}px)`}">
    <li v-if="multiple" class="item" :style="{[transform]:'translateX(-100%)'}">
      <img :src="firstItem.isShow && firstItem.url">
    </li>
    <li v-for="(item,index,key) of list" :key="key" class="item" :style="{[transform]:`translateX(${index*100}%)`}">
      <img :src="item.isShow && item.url">
    </li>
    <li v-if="multiple" class="item" :style="{[transform]:`translateX(${count*100}%)`}">
      <img :src="lastItem.isShow && lastItem.url">
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'
import autoprefix from '@/modules/corejs/css/autoprefix.ts'

interface imgItem {
  isShow: boolean
  url: string
}

@Component
export default class Move extends Vue {
  @Prop() readonly imgs!: string[]
  @Prop() readonly index!: number
  list: imgItem[] = []
  transform: string = autoprefix('transform') as string
  left = 0
  move (x: number) {
    this.left = x
    console.log(x)
  }
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
  @Watch('imgs')
  onImgsChanged () {
    this.listSet()
  }
  created () {
    this.listSet()
    this.show(this.index)
  }
  listSet () {
    this.list = this.imgs.map(url => ({
      isShow: false,
      url
    }))
  }
  show (index: number) {
    let list = this.list
    let preItem = list[index - 1]
    if (preItem) preItem.isShow = true
    list[index].isShow = true
    let nextItem = list[index + 1]
    if (nextItem) nextItem.isShow = true
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
</style>
