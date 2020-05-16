# 文字跑马灯组件

## 数据改变情况调用 change 方法

会根据内容自动开始滚动

```js
this.$refs.vMarqueeTextDown.change()
```

## 经测试，滚动条实现的性能更好

优于 animation，但没有 animation 平滑

