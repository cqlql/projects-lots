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

// 自适应
// 固定加到 head 中
var style = document.documentElement.style
var screen = window.screen // pc 情况可能需使用 window.innerWidth，否则会固定 750 了
function adaptive () {
  // 视口宽度
  var w = screen.width
  if (!w) return
  if (w > 750) w = 750
  else if (w < 320) w = 320
  // 公式：基础html字体宽度 / 基础屏幕宽度(编码时参照宽度) / 当前宽度
  style.fontSize = 100 / 375 * w + 'px'
}
addEventListener('resize', () => { excu(adaptive, 400) })
adaptive()
// 此问题使用 window.screen 可解决
// excu(adaptive, 600)// 解决部分安卓手机屏幕宽度值问题
