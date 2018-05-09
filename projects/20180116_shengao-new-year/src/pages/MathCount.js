
// import RandomNums from '../modules/random/random-nums'
// import autoprefix from '../modules/corejs/dom/css/autoprefix'
import Animation from '../modules/corejs/animation/animation'
import AudioPlay from '../modules/audio-play/audio-play'
let audioPlay = new AudioPlay()
function getRandomIndex (len) {
  return ~~(Math.random() * 200) % len
}
function getRandomNum (d) {
  return d.splice(getRandomIndex(d.length), 1)[0]
}
function getRandomNums () {
  let d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  return [getRandomNum(d), getRandomNum(d), getRandomNum(d), getRandomNum(d)]
}

let animation = new Animation()
// let randomNums = new RandomNums()
let eBox = document.querySelector('.count-list')
let eItems = eBox.children

// let preIndex = 0
let preItemsIndex = [0]
let pre = -1
let isRun = 0
function start () {
  if (isRun) return
  isRun = 1
  eBox.classList.remove('complete')
  animation.start(function (p) {
    let i = ~~((p * 120) / 10)
    if (pre !== i) {
      // let index = ~~(Math.random() * 12) % 12
      // eItems[preIndex].style.opacity = 1
      // eItems[index].style.opacity = 0.6
      let itemsIndex = getRandomNums()
      preItemsIndex.forEach(i => {
        eItems[i].classList.remove('active')
        // eItems[i].style[transform] = 'translateY(0) scale(1)'
      })
      itemsIndex.forEach(i => {
        eItems[i].classList.add('active')
        // eItems[i].style[transform] = 'translateY(-40px) scale(1.5)'
      })
      // eItems[preIndex].style[transform] = 'translateY(0) scale(1)'
      // eItems[index].style[transform] = 'translateY(-40px) scale(1.5)'
      preItemsIndex = itemsIndex
    }
    pre = i
  }, 2000, function () {
    setTimeout(function () {
      isRun = 0
      eBox.classList.add('complete')
      // location.href = 'englishNew1.html?i=' + preIndex
    }, 600)
  })
}

document.getElementById('start').onclick = function () {
  audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
  start()
}
