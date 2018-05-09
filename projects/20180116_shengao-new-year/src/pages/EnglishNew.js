
import autoprefix from '../modules/corejs/dom/css/autoprefix'
import Animation from '../modules/corejs/animation/animation'
import AudioPlay from '../modules/audio-play/audio-play'

let audioPlay = new AudioPlay()
let transform = autoprefix('transform')[1]

let animation = new Animation()

let eBox = document.querySelector('.new-list')
let eItems = eBox.children

let preIndex = 0
let pre = -1
let isRun = 0
function start () {
  if (isRun) return
  isRun = 1
  animation.start(function (p) {
    let i = ~~((p * 120) / 10)
    if (pre !== i) {
      let index = ~~(Math.random() * 12) % 12
      // eItems[preIndex].style.opacity = 1
      // eItems[index].style.opacity = 0.6
      eItems[preIndex].style[transform] = 'translateY(0) scale(1)'
      eItems[index].style[transform] = 'translateY(-40px) scale(1.5)'
      preIndex = index
    }
    pre = i
  }, 2000, function () {
    setTimeout(function () {
      isRun = 0
      location.href = 'englishNew1.html?i=' + preIndex
    }, 400)
  })
}

document.getElementById('start').onclick = function () {
  audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
  start()
}
