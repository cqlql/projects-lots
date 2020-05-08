- [下拉刷新 + 到底加载](#%e4%b8%8b%e6%8b%89%e5%88%b7%e6%96%b0--%e5%88%b0%e5%ba%95%e5%8a%a0%e8%bd%bd)
  - [快速使用](#%e5%bf%ab%e9%80%9f%e4%bd%bf%e7%94%a8)
  - [指定其他容器, 默认 window](#%e6%8c%87%e5%ae%9a%e5%85%b6%e4%bb%96%e5%ae%b9%e5%99%a8-%e9%bb%98%e8%ae%a4-window)
  - [指定起始页, 默认 1](#%e6%8c%87%e5%ae%9a%e8%b5%b7%e5%a7%8b%e9%a1%b5-%e9%bb%98%e8%ae%a4-1)
  - [初始不自动加载, 默认会加载](#%e5%88%9d%e5%a7%8b%e4%b8%8d%e8%87%aa%e5%8a%a8%e5%8a%a0%e8%bd%bd-%e9%bb%98%e8%ae%a4%e4%bc%9a%e5%8a%a0%e8%bd%bd)
  - [手动刷新](#%e6%89%8b%e5%8a%a8%e5%88%b7%e6%96%b0)
  - [设置内容最小高度](#%e8%ae%be%e7%bd%ae%e5%86%85%e5%ae%b9%e6%9c%80%e5%b0%8f%e9%ab%98%e5%ba%a6)
  - [props 属性](#props-%e5%b1%9e%e6%80%a7)
  - [函数 load 特别说明](#%e5%87%bd%e6%95%b0-load-%e7%89%b9%e5%88%ab%e8%af%b4%e6%98%8e)
- [(只有)下拉刷新](#%e5%8f%aa%e6%9c%89%e4%b8%8b%e6%8b%89%e5%88%b7%e6%96%b0)
  - [函数 load 说明](#%e5%87%bd%e6%95%b0-load-%e8%af%b4%e6%98%8e)



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
<!--自身，即 PulldownRefresh 组件根元素，需css设置容器高度，一般 fiexd 控制高度的情况多一些-->
<PulldownRefreshPlus :get-elem="() => 'self'" />
  <!--指定其他元素，只能是组件之上的元素-->
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
## 设置内容最小高度

否则没内容时将没有拖动区域

**自身为容器情况可不用设置，自己控制根元素css即可**

```html
<PulldownRefreshPlus :min-Height="500" />
```

如果用到了 rem 可能需要如下方式计算

```js
// 头部留空 50 情况
let minHeight = window.innerHeight - 50 * parseFloat(document.documentElement.style.fontSize) / 100
```





## props 属性

| 参数        | 说明                                                                                        | 类型                                     | 默认值 |
| ----------- | ------------------------------------------------------------------------------------------- | ---------------------------------------- | ------ |
| colorTop    | 顶部load 图标颜色                                                                           | string                                   | black  |
| colorBottom | 底部load 图标颜色                                                                           | string                                   | black  |
| initStart   | 渲染组件后是否自动加载：只针对 BottomLoad                                                   | string                                  | true   |
| minHeight   | 最小内容高度。否则没内容时将没有拖动区域，不给则根据内容撑。(自身为容器不用设置)                                 | number                                   | -      |
| startPage   | 起始页                                                                                      | number                                   | 1      |
| load        | 加载回调，函数中写ajax实现，并返回一个值(`'finish'`,`'noData'`)决定下一步操作。下面详细说明 | async function(page:number) state:string | -      |
| getElem     | 设置容器元素，不给则以 window 为容器                                                        | function, 'self'                                 | -      |

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