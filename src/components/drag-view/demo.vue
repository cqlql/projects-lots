<template>
  <div>
    <DragView :s="$style" :initialWidth="200" :maxWidth="400" @resize="onResize">
      <div class="type-menu">
        <ul>
          <li data-index="0" class="selected">canvas 画图</li>
          <li data-index="1">css</li>
          <li data-index="2">css-modules</li>
          <li data-index="3">express</li>
          <li data-index="4">html</li>
          <li data-index="5">js</li>
          <li data-index="6">js-dom-webapis</li>
          <li data-index="7">js-es6等新规范</li>
          <li data-index="8">linux</li>
          <li data-index="9">nodejs</li>
          <li data-index="10">postcss</li>
          <li data-index="11">reactjs</li>
          <li data-index="12">sass</li>
          <li data-index="13">svg</li>
          <li data-index="14">typescript</li>
          <li data-index="15">vue-router</li>
          <li data-index="16">vuejs</li>
          <li data-index="17">vuex</li>
          <li data-index="18">其他</li>
          <li data-index="19">其他语言</li>
          <li data-index="20">功能代码临时记录</li>
          <li data-index="21">单元测试</li>
          <li data-index="22">工具</li>
          <li data-index="23">工程-gulp</li>
          <li data-index="24">工程-rollup</li>
          <li data-index="25">工程-webpack</li>
          <li data-index="26">工程-webpack4</li>
          <li data-index="27">工程-其他</li>
          <li data-index="28">移动端 web 问题</li>
          <li data-index="29">规范化</li>
        </ul>
      </div>
    </DragView>
    <div class="right-box" :style="{left:x+'px'}">
      <section><h1 id="canvas.drawImage" data-index="0">canvas.drawImage</h1><p>提供直接绘制图片的功能</p><section><h2 id="语法" data-index="1">语法</h2><p>canvas.drawImage(image, dx, dy)</p></section><section><h2 id="兼容问题：" data-index="2">兼容问题：</h2><p><strong>浏览器：</strong> Android webkit 53.30 v4.0</p><p><strong>image 参数</strong></p><ul><li>是另一个canvas，则必须加到页面才能成功绘制。</li><li>是 img 元素，src 是 base 64，好像也无法绘制(待确定)</li></ul></section></section>
    </div>
  </div>
</template>

<script>
import DragView from './index'
export default {
  components: {
    DragView
  },
  data () {
    return {
      x: 200
    }
  },
  methods: {
    onResize (leftWidth) {
      this.x = leftWidth
    }
  }
}
</script>

<style module>
.bar {
  background-color: rgba(57, 152, 214, 0.6);
  width: 10px;
  right: -6px;
}
.leftBox {
  position: fixed;
  width: 400px;
  top: 0;
  left: 0;
  bottom: 0;
}

</style>

<style scoped>
.right-box {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 0 20px;
}
.type-menu {
  height: 100%;
  background-color: #f7f7f7;
  border-right: 1px solid #efefef;
  box-sizing: border-box;
  overflow-x: hidden;
}

.type-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.type-menu li {
  padding: 8px 10px;
  font-size: 14px;
  white-space: nowrap;
  color: #555;
  cursor: pointer;
}

.type-menu li:hover {
  background-color: #e4e4e4;
}

.type-menu li.selected {
  background-color: #3998d6;
  color: #fff;
}

.menu {
  overflow: hidden;
  height: 100%;
}
::-webkit-scrollbar {
  width: 14px;
}

::-webkit-scrollbar-track {
  background-color: #f3f3f3;
}

::-webkit-scrollbar-track-piece {
  background-color: #f3f3f3;
}

::-webkit-scrollbar-thumb {
  background-color: #f3f3f3;
  border: solid 1px silver;
}

::-webkit-scrollbar-corner {
  background-color: #f3f3f3;
}

::-webkit-resizer {
  background-repeat: no-repeat;
  background-position: bottom right;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #f3f3e0;
}
</style>
