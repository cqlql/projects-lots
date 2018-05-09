/* eslint-disable */
import dragMobile from '../modules/corejs/drag/drag-mobile'
import drag from '../modules/corejs/drag/drag'


// 核心精度测试

let canvas = document.querySelector('canvas')

var ctx = canvas.getContext("2d");
ctx.strokeStyle = 'red'
ctx.lineWidth = 1;
ctx.lineCap = "round"; // 末端样式

function draw (x, y) {
  ctx.beginPath();
  // 右边x轴开始画，也就是参数所示，画的起始点是 x100, y50
  // 参数依次是：圆心x, 圆心y, r, 起始弧度, 结束弧度, 默认顺时针
  ctx.arc(x, y, 2, 0, Math.PI * 2);
  ctx.stroke();

}
let infoData = []
let preTime
let preX
let preY
let eDrag = canvas
let xData = []

let options = {
  elem: eDrag,

  onDown(e){

  },
  onStart: function (e) {
    let touche = e.touches ? e.touches[0] : e
    let {pageX, pageY} = touche

    console.log('---',pageX, pageY)
    preTime = Date.now()
    preX = pageX
    preY = pageY
    infoData = []
    info.innerHTML = infoData.join('<br/>')
    draw(pageX, pageY)
    xData = []

  },
  onMove: function (e) {

    let touche = e.touches ? e.touches[0] : e
    let {pageX, pageY} = touche
    let currX = pageX
    let currY = pageY

    console.log('---m',pageX, pageY)

    let xlen = currX - preX
    let ylen = currY - preY

    let curTime = Date.now()
    let timeLen = curTime-preTime

    infoData.push(`m${~~xlen},${timeLen}`)
    xData.push([~~xlen, timeLen])

    draw(pageX, pageY)
    preTime = curTime
    preX = currX
    preY = currY
    e.preventDefault()
  },
  onEnd: function (e) {
    xData.push([0, Date.now() - preTime])

    let x = 0
    let time = 0
    let d
    for (let i = xData.length, j = 0; i--;) {
      d = xData[i]
      x += d[0]
      time += d[1]
      if (j >= 2) {
        break
      }
      j++
    }
    let speed = x/time * 100
    let infotxt = ''
    let min = 25
    if (speed > min) {
      infotxt = '右滑动'
    } else if (speed < -min){
      infotxt = '左滑动'
    }
    infotxt += x + ',' + time + ',' + speed.toFixed(3)
    infoData.push(infotxt)
    info.innerHTML = infoData.join('<br/>')
  }
}

drag(options)
dragMobile(options)

//
// eDrag.addEventListener('touchstart', function (e) {
//   let touche = e.touches[0];
//   let {pageX, pageY} = touche
//   console.log('---',pageX, pageY)
//   preTime = Date.now()
//   preX = pageX
//   preY = pageY
//   infoData = []
//   info.innerHTML = infoData.join('<br/>')
//   draw(pageX, pageY)
//   xData = []
// });
//
// eDrag.addEventListener('touchmove', function (e) {
//   let touche = e.touches[0];
//
//   let {pageX, pageY} = touche
//   let curTime = Date.now()
//   let currX = pageX
//   let currY = pageY
//   console.log('---move',pageX, pageY)
//   // infoData.push(`---m${pageX},${pageY},${curTime-preTime}`)
//   let s = (currX-preX)*100/(curTime-preTime)
//   s = ~~s
//   // 18 3 18
//   infoData.push(`m${s},${~~(currX-preX)},${curTime-preTime}`)
//   xData.push([~~(currX-preX), curTime-preTime])
//
//   draw(pageX, pageY)
//   preTime = curTime
//   preX = currX
//   preY = currY
//   e.preventDefault()
//
// });
//
// eDrag.addEventListener('touchend', function (e) {
//   console.log(xData)
//   let x = 0
//   let time = 0
//   let d
//   for (let i = xData.length, j = 0; i--;) {
//     d = xData[i]
//     x += d[0]
//     time += d[1]
//     if (j >= 2) {
//       break
//     }
//     j++
//   }
//   let speed = x/time
//   let infotxt = ''
//   let min = 25
//   if (x > min) {
//     infotxt = '右滑动'
//   } else if (x < -min){
//     infotxt = '左滑动'
//   }
//   infotxt += x + ',' + time + ',' + speed.toFixed(3)
//   infoData.push(infotxt)
//   info.innerHTML = infoData.join('<br/>')
// });
//
// eDrag.addEventListener('touchcancel', function (e) {
//
// });
//
// function getAngle (xlen, ylen) {
//   return 180 / Math.PI * Math.atan(ylen / xlen)
// }
// console.log(getAngle(3, 4))
