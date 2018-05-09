/**
 * 放大看图弹窗
 *
 * 在show之后才会进行初始化，所以放心new
 *
 * */

import htmlToElems from '../corejs/dom/html-to-elems'
import PictureZoom from './picture-zoom'

export default class PictureZoomPopup extends PictureZoom {
  // constructor () {
  //   super()
  // }

  // show 执行时才执行，只执行一次
  pictureZoomPopupInit (cb) {
    // 清空。保证只执行一次
    this.pictureZoomPopupInit = function (cb) {
      cb()
    }

    this.eBox = htmlToElems(`<div class="picture-zoom picture-zoom-popup"></div>`)[0]

    // 点击关窗
    this.onClick = () => {
      this.eBox.classList.remove('show')
    }

    document.body.appendChild(this.eBox)

    setTimeout(cb, 0)
  }

  // /// 公共
  show (src, min, max) {
    this.pictureZoomPopupInit(() => {
      this.initImg(src, min, max)

      this.eBox.classList.add('show')
    })
  }
}
