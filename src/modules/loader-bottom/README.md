
# 滚动到底加载

## loaded 回调
- 必须在元素渲染就绪可获取高度后再回调 loaded

elm: 用来更新高度的元素，默认为body，考虑特殊情况，可指定

loaded(false, elm)

```js
loadData (loaded) {
  this.i++
  setTimeout(d => {
    d = [Math.random(), Math.random(), Math.random()]
    this.list = this.list.concat(d)
    if (this.i > 3) {
      // 结束情况执行，传 true
      loaded(1)
    } else {
      this.$nextTick(() => {
        // 元素渲染就绪后再执行
        loaded()
      })
    }
  }, 1000)
}

```

## 重置
通过调用 LoaderBottom 组件的 reStart 方法

```js
this.$refs.LoaderBottom.reStart()
``` 
