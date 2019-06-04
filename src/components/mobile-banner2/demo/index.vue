<template>
  <div class="mobile-banner">
    banner
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import swipex from '@/modules/corejs/drag/swipex'

@Component
export default class MobileBannerDemo extends Vue {
  mounted () {
    swipex({
      elem: this.$el as HTMLElement,
      // onDown () {},
      onMove (xlen) {
        console.log(xlen)
      },
      onSwipeLeft () {},
      onSwipeRight () {},
      onSwipeNot () {}
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
