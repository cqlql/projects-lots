import autoprefix from '../modules/corejs/dom/css/autoprefix'
// import Turntable from './scienceOne/turntable'
import Animation from '../modules/turntable2/animation2'
import AudioPlay from '../modules/audio-play/audio-play'
let audioPlay = new AudioPlay()
let transform = autoprefix('transform')[1]

class Turntable {
  constructor ({el, count}) {
    this.animation = new Animation()
    this.count = count
    this.totalLength = count * 100
    this.el = el
    this.x = 0
  }

  start () {
    let x = this.x
    let {el, totalLength} = this
    this.animation.start(
      100,
      s => {
        x += s

        x %= totalLength

        this.x = x

        el.style[transform] = 'translateX(-' + x + '%)'
      },
      600
    )
  }

  stop (i) {
    let {animation, totalLength} = this
    animation.stop(() => {
      return totalLength - this.x % totalLength + (i * 100)
    })
  }

  getIsRun () {
    return this.animation.isRun
  }
}

export default function (count) {
  let transform = autoprefix('transform')[0]
  let eMove = document.querySelector('.scienceOne-list')
  let eItems = eMove.children

  for (let i = 0, len = eItems.length; i < len; i++) {
    eItems[i].style[transform] = `translateX(${i * 100}%)`
  }

  let turntable = new Turntable({
    el: eMove,
    count,
    complete () {
    }
  })

  let isStart = 0
  document.querySelector('.goBack button').addEventListener('click', ({target}) => {
    audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
    if (isStart) {
      turntable.stop(~~(Math.random() * 10) % 6)
    } else {
      if (turntable.getIsRun()) return
      turntable.start()
    }
    isStart = !isStart
    target.textContent = isStart ? '停止' : '开始'
  })

  // turntable.start()
}
