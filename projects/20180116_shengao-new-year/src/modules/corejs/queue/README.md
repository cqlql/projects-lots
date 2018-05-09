<!-- created on 2018/1/12 -->

# 队列


```js
this.queue.excu(complete => {
  let x = this.x
  let y = this.y

  if (this.preX === x && this.preY === y) {
    complete()
  } else {
    classList.add('transition-active')
    transitionendOnce($el, function () {
      classList.remove('transition-active')
      complete()
    })
    $el.style[transform] = `translate(${x}px,${y}px)`
  }
})
```
