import './popup.css'
import '../corejs/common'
import click from '../corejs/dom/click'

/**
 *
 * @param outsideClose 点背景关闭。默认开启
 * @param beforeClose 通过 return false 可阻止关闭
 * @param keepLive 是否缓存
 * */
export default class Popup {
  constructor ({ title = '', content = '', width, outsideClose = true, hasTopBar, keepLive, created = () => {}, beforeClose = () => {} } = {}) {
    this.title = title
    this.content = content
    this.outsideClose = outsideClose
    this.width = width
    this.hasTopBar = hasTopBar
    this.keepLive = keepLive
    this.created = created // 此处可绑定 vue 实例。此时元素被创建，但还未添加到文档中
    // this.beforeShow = beforeShow
    this.beforeClose = beforeClose
    // this.afterClose = afterClose

    this.elemRoot = null// 根元素
    this.elemMain = null// 居中内容的上一层
    this.elemCont = null// 内容层，可控制窗口宽度
    this.closing = false // 禁止操作 开关。关闭动画进行中标识
    this.isLive = false // 是否被缓存
  }

  init () {
    let {width} = this
    let html = `<div class="popup-full-page none hide" style="${width ? width + 'px' : 'auto'}">
    <div class="pfg-bg"></div>
    <div class="pfg-main">
        <div class="pfg-bd">
            ${this.hasTopBar ? '<div class="pfg-top-bar"><div class="tit">' + this.title + '</div><b class="close">✖</b></div>' : ''}
            <div class="pfg-cont">${this.content}</div>
        </div>
    </div>
</div>`

    let template = document.createElement('div')
    template.innerHTML = html

    this.elemRoot = template.children[0]
    this.elemMain = this.elemRoot.children[1]
    this.elemCont = this.elemMain.children[0]

    this.created(this)

    document.body.appendChild(this.elemRoot)

    // 关闭处理
    click(this.elemMain, e => {
      let classList = e.target.classList
      if (classList.contains('close')) {
        // 关闭按钮关闭
        this.close()
      } else if (this.outsideClose && classList.contains('pfg-main')) {
        // 点外面关闭
        this.close()
      }
    })
  }

  show () {
    if (this.isLive === false) this.init()
    this.isLive = true

    this.animeEnter()
  }

  close () {
    if (this.closing || this.beforeClose()) return
    this.closing = true

    this.animeLeave(() => {
      this.closing = false
      if (!this.keepLive) {
        this.elemRoot.remove()
        this.isLive = false
      }
    })
  }

  animeEnter () {
    let {elemRoot} = this
    let {classList} = elemRoot
    classList.remove('none')
    setTimeout(() => {
      classList.add('anime-active')
      classList.remove('hide')
      this.bindAnimeEnd(elemRoot, () => {
        classList.remove('anime-active')
      })
    }, 0)
  }

  animeLeave (cb) {
    let {elemRoot} = this
    let {classList} = elemRoot
    classList.add('anime-active')
    classList.add('hide')
    this.bindAnimeEnd(elemRoot, () => {
      classList.remove('anime-active')
      classList.add('none')
      cb()
    })
  }

  bindAnimeEnd (elem, cb) {
    let transitionend = () => {
      elem.removeEventListener('transitionend', transitionend)
      elem.removeEventListener('webkitTransitionEnd', transitionend)
      cb()
    }
    elem.addEventListener('transitionend', transitionend)
    elem.addEventListener('webkitTransitionEnd', transitionend)
  }
}
