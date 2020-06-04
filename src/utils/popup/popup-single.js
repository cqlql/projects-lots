/**
 * 弹窗单实例
 * */

import Popup from './popup'

function popup ({title, width, content, hasTopBar, created, beforeClose}) {
  let newPopup = new Popup({
    title,
    width,
    content,
    hasTopBar,
    created,
    beforeClose
  })

  newPopup.show()

  popup.close = function () {
    newPopup.close()
  }

  return newPopup
}

// 避免还没调用过弹窗，此时弹窗未初始首先调用close报错
popup.close = function () {
}

export default popup
