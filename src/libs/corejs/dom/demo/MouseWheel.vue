<template>
  <div>
    <button @click="remove">移除事件</button>
    <div class="box">滚轮区</div>

  </div>
</template>

<script>
import mouseWheel from '../mouse-wheel'

export default {
  mounted () {
    this.removeWheel = mouseWheel(this.$el, function (e) {
      console.log(e.deltaY)
      if (e.deltaY < 0) {
        // 往上滚
      } else {
        // 往下滚
      }
    })
  },
  methods: {
    remove () {
      this.removeWheel && this.removeWheel()
    }
  }
}
</script>

<style scoped>
.box {
  width: 600px;
  height: 300px;
  border: 2px solid;
  margin: 10px;
  box-sizing: border-box;
  padding: 100px 0 0;
  text-align: center;
  font-size: 20px;
}
</style>
