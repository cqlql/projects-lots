/**
 * 满屏加载中指示
 *
 */

import './loading.css'
const preloaderFull = {
  el: null,
  isInit: null,
  timeId: null,
  isShow: false,

  init () {
    // 保证只执行一次
    if (this.isInit) return
    this.isInit = true

    let el = document.createElement('div')
    el.innerHTML = '<div class="preloader-full"><div class="preloader-modal"><div class="preloader preloader-white"></div></div></div>'
    this.el = el = el.children[0]
    document.body.appendChild(el)
  },

  // 公开
  show ({ mask = false, time = 200 } = {}) {
    this.init()
    if (this.isShow) return
    this.isShow = true

    const { classList } = this.el
    function showLoad () {
      classList.add('show2')
      if (mask) {
        classList.add('mask')
      }
    }

    // 防重复点击
    classList.add('show1')

    if (time) {
      this.timeId = setTimeout(showLoad, time)
    } else {
      showLoad()
    }
  },

  hide () {
    this.isShow = false
    clearTimeout(this.timeId)
    if (this.el) {
      const { classList } = this.el
      classList.remove('show1')
      classList.remove('show2')
      classList.remove('mask')
    }
  }
}

export default preloaderFull
