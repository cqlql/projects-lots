/* eslint-disable */

import drag from './modules/corejs/drag/drag'
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
drag({
  elem: document,
  onMove (e) {
    e.preventDefault()
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
})

restart()

function pushHistory () {
  let cns = document.createElement('canvas')
  cns.width = canvas.width
  cns.height = canvas.height
  cns.getContext('2d').drawImage(canvas, 0, 0)
  history.length = historyIndex
  history.push(cns)
  historyIndex = historyIndex + 1
  box.appendChild(cns)
}

function backHistory () {
  historyIndex--

  if (historyIndex < 0) {
    historyIndex = 0
  } else {
    ctx.clearRect(0, 0, winW, winH)
    if (historyIndex) {
      let cns = history[historyIndex - 1]
      ctx.drawImage(cns, 0, 0)
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
  cns && ctx.drawImage(cns, 0, 0)

  ctx.strokeStyle = 'red'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 5
}

window.onresize = function () {
  restart()
}

click(eGoBack, function () {
  backHistory()
})

click(eClear, function () {
  ctx.clearRect(0, 0, winW, winH)
  historyIndex = 0
})

