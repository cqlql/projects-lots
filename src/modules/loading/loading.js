/**
 *
 * 满屏加载中指示
 *
 */

import './loading.css'
const preloaderFull = {

  el: null,

  isInit: null,
  // isShow: false,

  timeId: null,

  init () {
    // 保证只执行一次
    this.isInit = 1

    let el = document.createElement('div')

    el.innerHTML = `<div class="preloader-full">
    <div class="preloader-modal">
        <div class="preloader preloader-white"></div>
    </div>
</div>`

    this.el = el = el.children[0]

    document.body.appendChild(el)
  },

  // 公开
  show ({ mask = false, time = 300 } = {}) {
    this.isInit || this.init()
    this.hide()
    const { classList } = this.el
    const ex = () => {
      classList.add('show-load')
      if (mask) {
        classList.add('mask')
      }
    }

    classList.add('show') // 防重复点击

    if (time) {
      this.timeId = setTimeout(ex, time)
    } else {
      ex()
    }
  },

  hide () {
    // this.isShow = false
    clearTimeout(this.timeId)
    if (this.el) {
      const { classList } = this.el
      classList.remove('show')
      classList.remove('show-load')
      classList.remove('mask')
    }
  }
}

export default preloaderFull
