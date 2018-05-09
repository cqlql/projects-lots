import autoPrefix from '../modules/corejs/dom/css/autoprefix'
import Animation from '../modules/turntable2/animation2'
import AudioPlay from '../modules/audio-play/audio-play'

let audioPlay = new AudioPlay()
let transform = autoPrefix('transform')[1]

class Turntable {
  constructor ({el, count, complete}) {
    this.animation = new Animation()
    this.count = count
    this.maxDeg = 360
    this.totalLength = count * 100
    this.pieDeg = 360 / this.count
    this.el = el
    this.x = 0
    this.complete = complete
  }

  start () {
    let x = this.x
    let {el, maxDeg, complete} = this
    this.animation.start(
      100,
      s => {
        x += s

        x %= maxDeg

        this.x = x

        el.style[transform] = 'translate(-50%,-50%) rotate3d(0,0,1,' + x + 'deg)'
      },
      600,
      complete
    )
  }

  stop (i) {
    let {animation, maxDeg, pieDeg} = this
    animation.stop(() => {
      return maxDeg - this.x % maxDeg + (i * pieDeg)
    })
  }

  getIsRun () {
    return this.animation.isRun
  }
}

let selectedIndex = null
// let preSelectedIndex = 0
// let eItems = document.querySelector('.question-content').children

let el = document.querySelector('.dial2')
let turntable = new Turntable({
  el,
  count: 12,
  offsetDeg: 0,
  complete () {
    location.href = `chineseRead${selectedIndex + 1}.html`
    // eItems[preSelectedIndex].style.display = 'none'
    // eItems[selectedIndex].style.display = 'block'
    // preSelectedIndex = selectedIndex
  }
})
// turntable.init()
// turntable.maxSpeed = 8// 最高速度，单位deg
// turntable.rotate = function (deg) {
//   el.style[transform] = 'translate(-50%,-50%) rotate3d(0,0,1,' + deg + 'deg)'
// }

document.querySelector('.start2').onclick = function () {
  audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
  if (turntable.getIsRun()) return
  let t = ~~(Math.random() * 12)
  turntable.start()
  turntable.stop(t)
  selectedIndex = t
}
