# 下拉刷新

## 这是针对 body 滚动条的下拉刷新


## 内容太少，高度不够解决方案

通过js计算一个最小高度，见 Demo.vue 源码




## 优化记录

### 20181211

1. 向下拖动 y 为 0，states 更正为 0，之前只要拖动都为 1
2. y 为 0 transform 设为 none，解决 fiexd 以 transform 为参照的一些问题


# 下拉刷新 + 到底加载

## 可控制颜色：特性 color

两个值：`'white'`、`'black'`。默认 `'black'`。


```html
<LoaderRefresh @loadData="loadData" color="white">
  <ul>
    <li v-for="(v,i) in list" :key="i">{{v}}</li>
  </ul>
</LoaderRefresh>
```

## 1.0 新版

1. 加入 isRefresh，无需自己判断

2. 刷新位置现需删掉：

- vLoaderBottom.reset() // 重置激活
- vLoaderBottom.tryLoad() // 检测是否执行加载

3. complete 合并成一个

```js
loadData ({isRefresh, complete, vLoaderBottom}) {
  this.$axios('/test').then(d => {
    if (isRefresh) {
      // 刷新情况

      this.isFinish = 0

      this.list = d

      // [弃用]，现已自动检测
      // 底部加载重置并检测
      - vLoaderBottom.reset() // 重置激活
      - vLoaderBottom.tryLoad() // 检测是否执行加载
    } else {
      // 下拉加载情况

      this.list = this.list.concat(d)

      // 底部加载控件隐藏
      // vLoaderBottom.hide()
    }
    // 加载完成
    // 将进行到底检测。或者传入 true 加载结束
    complete((++this.isFinish > 2))
  })
}

```
