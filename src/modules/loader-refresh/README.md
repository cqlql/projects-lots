
# 到底加载+下拉刷新

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
