/* eslint-disable */

import click from './modules/corejs/dom/click'
// import Figure from './modules/corejs/drag/figure'

let box = document.createElement('div')
box.style.height = 0
box.style.overflow = 'hidden'
box.style.position = 'fixed'
box.style.transform = 'translateX(-100%)'
box.style.webkitTransform = 'translateX(-100%)'
document.body.appendChild(box)

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

let winW = 0
let winH = 0
let history = []
let historyIndex = 0
let prevx = 0
let prevy = 0
let state = 0
/*drag({
  elem: document,
  onMove (e) {
    let touche = e.touches ? e.touches[0] : e
    let currx = touche.pageX
    let curry = touche.pageY
    ctx.beginPath()
    ctx.moveTo(prevx, prevy)
    ctx.lineTo(currx, curry)
    ctx.closePath()
    ctx.stroke()
    prevx = currx
    prevy = curry
  },
  onDown (e) {
    if (e.target.tagName === 'BUTTON') return false

  },
  onStart (e) {
    let touche = e.touches ? e.touches[0] : e
    prevx = touche.pageX
    prevy = touche.pageY
  },
  onEnd () {
    pushHistory()
  }
})*/

click(document, function (e) {
  if (e.target.tagName === 'BUTTON') return false
  let touche = e.changedTouches ? e.changedTouches[0] : e
  let currx = touche.pageX
  let curry = touche.pageY

  ctx.beginPath()
  // 右边x轴开始画，也就是参数所示，画的起始点是 x100, y50
  // 参数依次是：圆心x, 圆心y, r, 起始弧度, 结束弧度, 默认顺时针
  ctx.arc(currx, curry, 10, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
  if (state) {
    state = 0
    ctx.beginPath()
    ctx.moveTo(prevx, prevy)
    ctx.lineTo(currx, curry)
    ctx.closePath()
    ctx.stroke()
    pushHistory(currx, curry)
  } else {
    state = 1
  }

  prevx = currx
  prevy = curry
})

restart()

function pushHistory (x, y) {
  let cns = document.createElement('canvas')
  cns.width = canvas.width
  cns.height = canvas.height
  cns.getContext('2d').drawImage(canvas, 0, 0)
  history.length = historyIndex
  history.push([cns, x, y])
  historyIndex = historyIndex + 1
  box.appendChild(cns)
  // document.body.appendChild(cns)
}

function backHistory (toBack) {
  if (!toBack) historyIndex--

  if (historyIndex < 0) {
    historyIndex = 0
  } else {
    ctx.clearRect(0, 0, winW, winH)
    if (historyIndex) {
      let cns = history[historyIndex - 1]
      ctx.drawImage(cns[0], 0, 0)
      prevx = cns[1]
      prevy = cns[2]
    }
  }
}

function restart () {
  let w = window.innerWidth
  let h = window.innerHeight
  if (w > winW) {
    winW = canvas.width = w
  }
  if (h > winH) {
    winH = canvas.height = h
  }

  let cns = history[historyIndex - 1]
  cns && ctx.drawImage(cns[0], 0, 0)

  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'red'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 5
}

window.onresize = function () {
  state = 0
  restart()
}

click(eGoBack, function () {
  backHistory(state)
  state = 0
})

click(eClear, function () {
  state = 0
  ctx.clearRect(0, 0, winW, winH)
  historyIndex = 0
})
