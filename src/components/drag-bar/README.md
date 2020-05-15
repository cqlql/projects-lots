# 窗口宽拖动改变 - 简单、高度可配置

适合3个及以上的窗口拖动改变

## 快速使用

```html
<template>
  <div class="bd">
    <div class="left-box" :style="{width:w+'px'}">
      <div class="type-menu">
        <ul>
          <li>窗口宽度拖动改变</li>
          <li>css</li>
          <li>css-modules</li>
          <li>express</li>
          <li>html</li>
          <li>js</li>
          <li>js-dom-webapis</li>
          <li>js-es6等新规范</li>
          <li>linux</li>
          <li>nodejs</li>
        </ul>
      </div>
      <DragBar :class="$style.bar" :size.sync="w" @change="change" :max="400" :min="50" />
    </div>
    <div class="right-box" :style="{left:w+'px'}">
      <section>
        <p>left: {{ w }}px</p>
        <p>移动的长度: {{ moveLen }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import DragBar from '@/components/drag-bar'
export default {
  components: {
    DragBar
  },
  data () {
    return {
      w: 200,
      moveLen: 0
    }
  },
  methods: {
    change ({ len }) {
      this.moveLen = len
    }
  }
}
</script>

<style module>
.bar {
  background-color: rgba(57, 152, 214, 0.6);
  width: 10px;
}

</style>

<style scoped>
.left-box {
  position: fixed;
  width: 400px;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
}

.right-box {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 10px;
}
.type-menu {
  padding: 10px;
}
</style>

```