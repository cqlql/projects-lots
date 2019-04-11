# 到底加载<!-- omit in toc -->
- [一般使用示例](#%E4%B8%80%E8%88%AC%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)
- [指定其他容器, 默认 window](#%E6%8C%87%E5%AE%9A%E5%85%B6%E4%BB%96%E5%AE%B9%E5%99%A8-%E9%BB%98%E8%AE%A4-window)
- [指定起始页, 默认 1](#%E6%8C%87%E5%AE%9A%E8%B5%B7%E5%A7%8B%E9%A1%B5-%E9%BB%98%E8%AE%A4-1)
- [重新加载 1, 不检测直接加载](#%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD-1-%E4%B8%8D%E6%A3%80%E6%B5%8B%E7%9B%B4%E6%8E%A5%E5%8A%A0%E8%BD%BD)
- [重新加载 2, 将进行检测是否需要加载](#%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD-2-%E5%B0%86%E8%BF%9B%E8%A1%8C%E6%A3%80%E6%B5%8B%E6%98%AF%E5%90%A6%E9%9C%80%E8%A6%81%E5%8A%A0%E8%BD%BD)
- [事件 load 说明](#%E4%BA%8B%E4%BB%B6-load-%E8%AF%B4%E6%98%8E)

## 一般使用示例

```html
<template>
  <div>
    <div v-for="(item, key) of list" :key="key" class="item">
      <div class="tit">{{ item.t }}</div>
    </div>
    <BottomLoad @load="load" />
  </div>
</template>
<script>
import BottomLoad from '@/components/bottom-load/BottomLoad.vue'
export default {
  components: {
    BottomLoad
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async load ({ complete, page }) {
      let d = await axios.get('/getData?page=' + page)
      if (d.length) {
        this.list = this.list.concat(d)
        complete()
      } else {// 彻底结束
        if (page === 1) complete('noData') // 没任何数据情况
        else complete('finish')
      }
    }
  }
}
</script>

```

## 指定其他容器, 默认 window

```html
<BottomLoad @load="load" :getElem="() => $el.parentElement" />
```

## 指定起始页, 默认 1

```html
<BottomLoad @load="load" :startPage="0" />
```

## 重新加载 1, 不检测直接加载

```js
this.$refs.vBottomLoad.restart()
```

## 重新加载 2, 将进行检测是否需要加载

```js
this.$refs.vBottomLoad.retryStart()
```

## 事件 load 说明

需要加载时触发，说明滚动到底了

`load ({ complete, page })`回调并传入一个对象，目前有两个值：

1. complete(status) 加载完成后执行，可传入一个状态值：
  - `'continue'` 默认值，可不给。表示还有下一页，继续检测是否到底
  - `'finish'` 彻底结束，再没有数据了
  - `'noData'` 没有得到任何数据
2. page 当前需加载的页数

