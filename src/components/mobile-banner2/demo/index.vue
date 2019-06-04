<template>
  <div class="mobile-banner">
    banner
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
@Component
export default class MobileBannerDemo extends Vue {
  mounted () {
    console.log(this.$el)
  }
}
</script>

<style scoped>
.mobile-banner {
  background: #ddd;
  height: 300px;
}
</style>
