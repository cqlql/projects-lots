<template>
  <div class="view-box">
    <ControlItem v-for="(d, i) of dataCore.controls" :key="i" :d="d" :index="i" />
  </div>
</template>

<script>
import dataApi from './data-api'
import ControlItem from './ControlItem/index'
export default {
  components: {
    ControlItem
  },
  created () {
    this.dataCore = dataApi.core
  }
}
</script>

<style scoped>
.view-box {
  position: relative;
}
</style>
