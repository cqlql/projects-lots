- [下拉刷新 + 到底加载](#%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0--%E5%88%B0%E5%BA%95%E5%8A%A0%E8%BD%BD)
  - [快速使用](#%E5%BF%AB%E9%80%9F%E4%BD%BF%E7%94%A8)
  - [指定其他容器, 默认 window](#%E6%8C%87%E5%AE%9A%E5%85%B6%E4%BB%96%E5%AE%B9%E5%99%A8-%E9%BB%98%E8%AE%A4-window)
  - [指定起始页, 默认 1](#%E6%8C%87%E5%AE%9A%E8%B5%B7%E5%A7%8B%E9%A1%B5-%E9%BB%98%E8%AE%A4-1)
  - [初始不自动加载, 默认会加载](#%E5%88%9D%E5%A7%8B%E4%B8%8D%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD-%E9%BB%98%E8%AE%A4%E4%BC%9A%E5%8A%A0%E8%BD%BD)
  - [手动刷新](#%E6%89%8B%E5%8A%A8%E5%88%B7%E6%96%B0)
  - [props 属性](#props-%E5%B1%9E%E6%80%A7)
  - [函数 load 特别说明](#%E5%87%BD%E6%95%B0-load-%E7%89%B9%E5%88%AB%E8%AF%B4%E6%98%8E)
- [(只有)下拉刷新](#%E5%8F%AA%E6%9C%89%E4%B8%8B%E6%8B%89%E5%88%B7%E6%96%B0)
  - [函数 load 说明](#%E5%87%BD%E6%95%B0-load-%E8%AF%B4%E6%98%8E)




# 下拉刷新 + 到底加载

## 快速使用

```html
<template>
  <div class="statList">
    <PulldownRefreshPlus ref="vPulldownRefresh" :load="load" :min-height="containerMinHeight">
      <div v-for="(item, key) of list" :key="key" class="item">
        <div class="tit">{{ item.t }}</div>
        <div v-for="(it,k) of item.ls" :key="k" class="row">
          <span class="tt">{{ it.t }}</span>
          <span class="ct">{{ it.v }}</span>
        </div>
      </div>
    </PulldownRefreshPlus>
  </div>
</template>
<script>
import PulldownRefreshPlus from '@/components/pulldown-refresh/PulldownRefreshPlus.vue'
export default {
  components: {
    PulldownRefreshPlus
  },
  data () {
    return {
      list: [],
      // 最小容器高度。否则没内容时将没有拖动区域
      containerMinHeight: window.innerHeight - 50
    }
  },
  methods: {
    async load (page) {
      let d = await axios.get('/getData?page=' + page)
      let allList
      if (page === 1) { // 刷新情况
        allList = this.list = d
      } else { // 到底追加情况
        allList = this.list = this.list.concat(d)
      }
      if (!allList.length) {
        return 'noData' // 没有任何数据
      }
      if (!d.length) {
        return 'finish' // 彻底加载完成
      }
    }
  }
}
</script>

```

## 指定其他容器, 默认 window

```html
<PulldownRefreshPlus :get-elem="() => $el" />
```

## 指定起始页, 默认 1

```html
<PulldownRefreshPlus :start-page="0" />
```

## 初始不自动加载, 默认会加载

```html
<PulldownRefreshPlus :init-start="false" />
```

## 手动刷新

```js
this.$refs.vPulldownRefresh.refresh()
```
## props 属性

| 参数        | 说明                                                                                        | 类型           | 默认值 |
| ----------- | ------------------------------------------------------------------------------------------- | -------------- | ------ |
| colorTop    | 顶部load 图标颜色                                                                           | String         | black  |
| colorBottom | 底部load 图标颜色                                                                           | String         | black  |
| initStart   | 渲染组件后是否自动加载：只针对 BottomLoad                                                   | Boolean        | true   |
| minHeight   | 最小容器高度。否则没内容时将没有拖动区域，不给则根据内容撑                                  | Number         | -      |
| startPage   | 起始页                                                                                      | Number         | 1      |
| load        | 加载回调，函数中写ajax实现，并返回一个值(`'finish'`,`'noData'`)决定下一步操作。下面详细说明 | async Function | -      |
| getElem     | 设置容器元素，不给则以 window 为容器                                                        | Function       | -      |

## 函数 load 特别说明

需要加载时触发

**必须是异步函数，或者返回 promise 也行**

```js
{
  methods: {
    async load (page) {
      let d = await axios.get('/getData?page=' + page)
      let allList
      if (page === 1) { // 刷新情况
        allList = this.list = d
      } else { // 到底追加情况
        allList = this.list = this.list.concat(d)
      }
      if (!allList.length) {
        return 'noData' // 没有任何数据
      }
      if (!d.length) {
        return 'finish' // 彻底加载完成
      }
    }
  }
}
```

1. page 参数：当前需加载的页数
2. load 返回一个状态值 ：
  - `'continue'` 缺省值。表示还有下一页，继续检测是否到底
  - `'finish'` 彻底结束，再没有数据了
  - `'noData'` 没有得到任何数据


# (只有)下拉刷新

## 函数 load 说明

需要加载时触发，说明滚动到底了

**必须是异步函数，或者返回 promise 也行**

`let status = load (page)`：

返回一个状态值 status ：
  - `'finish'` 缺省值。请求结束
  - `'noData'` 没有得到任何数据