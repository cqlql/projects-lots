<template>
  <div>
    move
    {{imgs}}
    <br>
    {{list}}
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
  }
  listSet () {
    this.list = this.imgs.map(url => ({
      isShow: false,
      url
    }))
  }
}
</script>
