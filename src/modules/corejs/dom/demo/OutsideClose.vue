<template>
  <div>
    <div @click="isShow=true">弹出</div>
    <div v-show="isShow" class="box">内容盒子</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import OutsideClose from '../outside-close'

@Component
export default class OutsideCloseDemo extends Vue {
  isShow = false
  outsideClose!: OutsideClose
  mounted () {
    this.outsideClose = new OutsideClose(this.$el as HTMLElement, () => {
      this.isShow = false
    })
  }
  destroyed () {
    this.outsideClose.off()
  }
}
</script>
