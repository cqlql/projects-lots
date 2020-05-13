# 到底加载

## 一般使用示例

```html
<template>
  <div>
    <div v-for="(item, key) of list" :key="key" class="item">
      <div class="tit">{{ item.t }}</div>
    </div>
    <BottomLoad :load="load" />
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
        return
      }
      return 'finish' // 结束
    }
  }
}
</script>

```

## 指定其他容器, 默认 window

```html
<BottomLoad :get-elem="() => $el.parentElement" />
```

## 指定起始页, 默认 1

```html
<BottomLoad :start-page="0" />
```

## 初始不自动加载, 默认会加载

```html
<BottomLoad :init-start="false" />
```

## 重新加载 1, 不检测直接加载

```js
this.$refs.vBottomLoad.restart()
```

## 重新加载 2, 将进行检测是否需要加载

```js
this.$refs.vBottomLoad.retryStart()
```



## 函数 load 说明

需要加载时触发，说明滚动到底了

**必须是异步函数，或者返回 promise 也行**

`let status = load (page)`：

1. 返回一个状态值 status ：
  - `'continue'` 缺省值。表示还有下一页，继续检测是否到底
  - `'finish'` 彻底结束，再没有数据了
  - `'noData'` 没有得到任何数据
2. page 参数：当前需加载的页数

