// end 发生后立马删除。保证一次性使用。再次调用最好再 end 事件后，否则可能不准确
// 多属性情况也只会执行一次 end。说明removeEventListener后将不会再触发剩下的 end
// 注册后删除transition导致不触发end，然后会造成永久性多次注册？答案是不会，下次动画会触发之前的没清理的end，然后触发之前的removeEventListener删除，只是会在这次动画触发多次end而已
export default function transitionendOnce (el, cb) {
  function end () {
    console.log('end')
    eventBind(el, 'removeEventListener', end)
    cb()
  }
  eventBind(el, 'addEventListener', end)
  // 返回一个删除函数，手动删除
  return function () {
    eventBind(el, 'removeEventListener', end)
  }
}

function eventBind (el, type, fn) {
  el[type]('transitionend', fn)
  el[type]('webkitTransitionEnd', fn)
}
