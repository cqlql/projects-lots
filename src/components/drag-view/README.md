# 窗口宽拖动改变

## 快速使用

```html
<template>
  <div class="dv-demo">
    <DragView :initialWidth="200" :maxWidth="400" :width.sync="x">
      <div class="type-menu">
        <ul>
          <li class="selected">窗口宽度拖动改变</li>
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
    </DragView>
    <div class="right-box" :style="{left:x+'px'}">
      <section>
        {{x}}px
      </section>
    </div>
  </div>
</template>

<script>
import DragView from '@/components/drag-view'
export default {
  components: {
    DragView
  },
  data () {
    return {
      x: 200
    }
  }
}
</script>

<style scoped>

.dv-demo >>> {
  .dv-bar {
    background-color: rgba(57, 152, 214, 0.6);
    width: 10px;
    /* right: -6px; */
  }
  .dv-box {
    position: absolute;
    width: 400px;
    top: 0px;
    left: 0px;
    bottom: 0;
    z-index: 1;
  }
}

.right-box {
  position: absolute;
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