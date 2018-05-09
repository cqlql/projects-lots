
export default class {
  constructor () {
    this.audio = new Audio()
  }

  play (src) {
    let {audio} = this
    // 结束事件
    // audio.onended = function () {
    // }
    audio.src = src
    audio.play()
  }

  stop () {
    // this.elem.classList.remove('play')
    this.audio.pause()
  }
}
