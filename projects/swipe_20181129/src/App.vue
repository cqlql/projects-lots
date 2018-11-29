<template>
  <div class="box">
    <p>hello</p>
  </div>
</template>

<script>
import swipex from './swipex.js'
export default {
  mounted () {
    swipex({
      elem: this.$el,
      onMove () {}
    })
  }
}
</script>

<style scoped>
.box {
  height: 600px;
}
.box>>>p {
  background-color: #ddd;
  margin: 0;
}
.box>>>p:nth-child(2n) {
  background-color: #eee;
}
</style>
