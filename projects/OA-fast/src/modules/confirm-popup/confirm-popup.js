/**
 * 确认弹窗
 * */
import './confirm-popup.css'
import click from '../corejs/click'
import Popup from './popup'
/* eslint-disable */
function confirmPopupHandle ({title, des, btns, confirm = () => { }, cancel = () => { }}) {
  let popup
  let eTitle
  let eDes
  let eBtns
  let gConfirm = confirm
  let gCancel = cancel

  function init (mainElem) {
    init = () => { }
    eTitle = mainElem.querySelector('.tit')
    eDes = mainElem.querySelector('.des')
    eBtns = mainElem.querySelector('.btns')

    click(eBtns, function (e) {

      let classList = e.target.classList
      if (classList.contains('sure-btn')) {
        gConfirm()
      } else if (classList.contains('cancel-btn')) {
        popup.close()
        gCancel()
      }
    })
  }
  confirmPopupHandle = function ({
    title,
    des,
    btns,
    confirm = () => {
    },
    cancel = () => {
    }
  }) {
    gConfirm = confirm
    gCancel = cancel

    eTitle.innerHTML = title
    eDes.innerHTML = des

    if (btns) {
      eBtns.innerHTML = btns
    }

    popup.show()
  }
  popup = new Popup({
    title: title,
    content: `<div class="confirm-popup">
<div class="des">${des}</div><div class="btns">${btns ? btns : '<a class="button sure-btn" href="javascript:;">确认</a><a class="button cancel-btn" href="javascript:;">取消</a>'}</div></div>`,
    created () {
      init(this.ePopupMain)
    }
  })
  confirmPopup.close = function () {
    popup.close()
  }
  popup.show()
}

function confirmPopup (params) {
  confirmPopupHandle(params)
}

// 避免还没调用过弹窗，此时弹窗未初始首先调用close报错
confirmPopup.close = function () {}

export default confirmPopup
