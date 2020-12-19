<template>
  <div>
    <p>由于涉及双指交互，所以需在移动端查看：<a href="#/zoom-touch">https://cqlql.gitee.io/docs/#/zoom-touch</a></p>
    <div class="zoom" ref="eZoom">此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。此处为放大文本。</div>
  </div>
</template>

<script>
import ZoomTouch from '@/libs/zoom-touch/zoom-touch.js'
export default {
  mounted () {
    // 直接指定一个放大元素
    // new ZoomTouch(this.$refs.eZoom)
    // 分别指定事件元素和放大元素
    new ZoomTouch({
      elemEvent: document,
      elem: this.$refs.eZoom
    })
  }
}
</script>

<style>
p {
  margin: 20px;
}
.zoom {
  background-color: #eee;
  /* margin-left: 100px;
  margin-top: 100px; */
  /* height: 1000px; */
  margin: 20px;
}
</style>
