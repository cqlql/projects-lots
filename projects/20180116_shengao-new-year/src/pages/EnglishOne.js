// import Turntable from '../modules/turntable/turntable'
import autoPrefix from '../modules/corejs/dom/css/autoprefix'
import AudioPlay from '../modules/audio-play/audio-play'
import Animation from '../modules/turntable2/animation2'
class Turntable {
  init ({el, count, complete, offsetDeg}) {
    this.animation = new Animation()
    this.count = count
    this.maxDeg = 360
    this.offsetDeg = offsetDeg
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

        el.style[transform] = 'rotate3d(0,0,1,' + x + 'deg)'
      },
      400,
      complete
    )
  }

  stop (i) {
    let {animation, maxDeg, pieDeg, offsetDeg} = this
    animation.stop(() => {
      return maxDeg - this.x % maxDeg + (i * pieDeg) + offsetDeg + maxDeg
    })
  }

  getIsRun () {
    return this.animation.isRun
  }
}
let transform = autoPrefix('transform')[1]
let selectedIndex = null
let preSelectedIndex = 0
let eItems = document.querySelector('.question-content').children
let turntable = new Turntable()
let audioPlay = new AudioPlay()

turntable.init({
  el: document.querySelector('.img1'),
  count: 10,
  offsetDeg: 20,
  complete () {
    eItems[preSelectedIndex].style.display = 'none'
    eItems[selectedIndex].style.display = 'block'
    preSelectedIndex = selectedIndex
  }
})

document.querySelector('.img2').onclick = function () {
  audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
  if (turntable.getIsRun()) return
  let t = ~~(Math.random() * 10)
  turntable.start()
  turntable.stop(10 - t)
  selectedIndex = t
}
