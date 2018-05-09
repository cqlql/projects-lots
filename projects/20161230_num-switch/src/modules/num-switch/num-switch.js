import Animation from '../corejs/animation/animation'
export default class NumSwitch {
  constructor () {
    let itemHeight = this.itemHeight = 188
    this.contHeight = itemHeight * 11
    this.animation = new Animation()
  }
  start (num, cb) {
    let {animation, contHeight, itemHeight, move} = this
    let turns = 2 // 圈数
    let y = contHeight * turns + itemHeight * (num + 1)
    animation.stop()
    animation.start(function (v) {
      v = v * y

      if (v > contHeight) {
        v = v % contHeight
      }

      move(v)
      // console.log(v)
      // eMove.style.marginTop = -v + 'px'
    }, 2000, cb)
  }
}
/*
h = 50, fHgt = h * 10
function effect () {
  var eMove = document.getElementById('move')

  // 可以在此设置圈数
  var length = fHgt * 1 + h * ~~(Math.random() * 10)

  animation.stop()
  animation.start(function (v) {

    v = v * length

    if (v > fHgt) {
      v = v % fHgt
    }

    eMove.style.marginTop = -v + 'px'

  }, 2000)
}
*/
