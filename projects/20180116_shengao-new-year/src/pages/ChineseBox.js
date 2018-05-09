import click from '../modules/corejs/dom/click'
import elemZoomPopup from '../modules/zoom-touch/elem-zoom-popup'
import imgComplete from '../modules/corejs/dom/img-complete'
import AudioPlay from '../modules/audio-play/audio-play'
let audioPlay = new AudioPlay()
click(document.querySelector('.box-list'), function (e) {
  let {target} = e
  if (target.tagName === 'IMG') {
    audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
    let src = `../img/tickets${~~(Math.random() * 20) % 6 + 1}.png`
    imgComplete(src, function (img) {
      // 放大看图
      elemZoomPopup(img, {
        backgroundColor: '#fff'
      })
    })
  }
})
