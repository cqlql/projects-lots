
# 滚动到底加载

## loaded 回调
- 必须在元素渲染就绪可获取高度后再回调 loaded

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

## 注意

### 一条数据都没不能显示 finish 文本

这种情况直接隐藏控件。再定制自己的没数据 ui

```js
// 隐藏控件
this.$refs.LoaderBottom.hide()
```

## 一些问题解决

### 页面切换动画造成的多次加载问题

数据渲染后，如果 body 高度没有变化，300ms 后才进行加载(300ms动画结束)

## 优化记录

### 20181130

新增渲染组件后是否自动加载

```xml
<LoaderBottom :firstLoad="false">
```
