/* eslint-disable */

import swipex from '../modules/corejs/drag/swipex'

swipex({
  elem: document,
  onDown () {
    info.innerHTML = ''
  },
  swipeLeft () {
    info.innerHTML = '左滑，'
  },
  swipeRight () {
    info.innerHTML = '右滑，'
  },
  swipeNot () {
    info.innerHTML = '没有，'
  },
  onStart(){},
  onMove(){},
  onEnd(speed){
    info.innerHTML += '速度' + speed
  }
})

