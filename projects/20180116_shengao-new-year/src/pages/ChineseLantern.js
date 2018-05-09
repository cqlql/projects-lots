import click from '../modules/corejs/dom/click'
import elemZoomPopup from '../modules/zoom-touch/elem-zoom-popup'
import AudioPlay from '../modules/audio-play/audio-play'
let audioPlay = new AudioPlay()
// let eItems = document.querySelector('.lantern-content').children
let eItems = document.querySelector('.wrapper6-content,.lantern-content,.wrapper5-content').children
let tNum = eItems.length

click(document.querySelector('.lantern-list,.wrapper6-list,.wrapper5-list'), function (e) {
  let {target} = e
  if (target.tagName === 'IMG') {
    audioPlay.play(`../mp3/${~~(Math.random() * 3) + 1}.mp3`)
    let index = ~~(Math.random() * 100) % tNum
    elemZoomPopup(eItems[index], {
      color: 'red',
      fontSize: '50px',
      textAlign: 'center',
      padding: '10px 20px 20px',
      // whiteSpace: 'nowrap',
      backgroundColor: 'rgba(225,225,225,0.8)'
    })
  }
})
