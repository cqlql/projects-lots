
## 开始动画 animateTransformY.start(el, y, complete)
y 与起始值 一样情况将直接同步触发 complete

## 示例

```js
let animateTransformY = new AnimateTransformY()
// 设置起始值，默认 0，设置正确的起始值可避免原地不动不触发 transitionEnd 情况
animateTransformY.setStartY(0)
// 设置 transition 的 className，默认 transition-active
animateTransformY.setTransitionActiveClassName('transition-active')

// 开始动画
animateTransformY.start(el, y, complete)
```
