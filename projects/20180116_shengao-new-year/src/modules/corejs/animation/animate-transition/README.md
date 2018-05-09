
## 开启动画，动画前设置

```js
animateTransition.setTransition('1.3s ease')
// animateTransition.setTransitionClassName('transition-active') // 待实现
// animateTransition.setTransitionProperty('opacity,transform') // 待实现，估计还
```

## 动画开始 `animateTransition.start(el, css, complete)`

complete 不会触发情况：目标值与当前值一样，此种情况不能调用 start，请再调用前判断好

## 示例

```js
let animateTransition = new AnimateTransition()
animateTransition.setTransition('1.3s ease')
// animateTransition.setTransitionClassName('transition-active') // 待实现
// animateTransition.setTransitionProperty('opacity,transform') // 待实现，估计还得考虑前缀情况

let preX
let preY
let preO
function animateCss () {
  let x = 200 * Math.random()
  let y = 200 * Math.random()
  let o = 1 * Math.random()
  if (preX === x && preY === y && preO === o) {
    complete()
  }
  animateTransition.start($el, {
    transform: `translate(${x}px,${y}px)`,
    opacity: o
  }, complete)
  preX = x
  preY = y
  preO = o
}

```

## *增强

```js

//  动画起始值
animateTransition.setStartValue({
  x: 0,
  y: 0,
  scale: 0,
  opacity: 0
})

// 开始动画
animateTransition.start($el, {
  x: 0,
  y: 1,
  scale: 1,
  opacity: 1
}, complete)

```



