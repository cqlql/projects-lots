## 概述
使用 typescript 实现

目前只有二种动画方式：
1. 无掉头移动 `./animation/Move.vue`
2. 渐变 `./animation/Move.vue`
3. ...待扩展

简单使用示例

```html
<template>
  <MobileBanner :imgs="imgs" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import MobileBanner from '../index.vue'

@Component({
  components: {
    MobileBanner
  }
})
export default class MobileBannerDemo extends Vue {
  imgs: string[] = [
    '1.jpg',
    '2.jpg',
    '3.jpg'
  ]
}
</script>
```