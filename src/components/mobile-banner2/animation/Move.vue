<template>
  <div>
    <ul>
      <li v-for="(item,key) of list" :key="key">
        <img :src="item.isShow && item.url" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator'

interface imgItem {
  isShow: boolean
  url: string
}

@Component
export default class Move extends Vue {
  @Prop() readonly imgs!: string[]
  @Prop() readonly index!: number
  list: imgItem[] = []
  move (x: number) {
    console.log(x)
  }
  @Watch('imgs')
  onImgsChanged () {
    this.listSet()
  }
  created () {
    this.listSet()
    this.list[this.index].isShow = true
  }
  listSet () {
    this.list = this.imgs.map(url => ({
      isShow: false,
      url
    }))
  }
}
</script>
