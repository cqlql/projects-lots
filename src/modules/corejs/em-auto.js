// 频率间隔执行
// function ExcuInterval () {
//   let status = 0
//   return function (fn, time) {
//     if (status) return
//     status = 1
//     setTimeout(function () {
//       fn()
//       status = 0
//     }, time)
//   }
// }
// let excu = ExcuInterval()

// 延时有效执行
let timeId
function excu (callBack, time) {
  clearTimeout(timeId)
  timeId = setTimeout(callBack, time)
}

// 解决部分安卓手机屏幕宽度值问题
let getWidth = function () {
  return window.innerWidth
}
if (window.innerWidth > window.screen.width) {
  getWidth = function () {
    return window.screen.width
  }
}

// 自适应
// 固定加到 head 中
var style = document.documentElement.style
function adaptive () {
  // 视口宽度
  var w = getWidth()
  if (!w) return
  if (w > 750) w = 750
  else if (w < 320) w = 320
  // 公式：基础html字体宽度 / 基础屏幕宽度(编码时使用的宽度) / 当前宽度
  style.fontSize = 100 / 375 * w + 'px'
}
addEventListener('resize', () => { excu(adaptive, 400) })
adaptive()
