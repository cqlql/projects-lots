
// 快捷键，组合键，热键

function keyCtrl (el, cb, cbUp = () => {}) {
  let ctrlDown = false

  function keydown (e) {
    const { keyCode } = e
    if (keyCode === 17) {
      ctrlDown = true
    } else if (ctrlDown) {
      if (cb(keyCode)) {
        e.preventDefault()
      }
    }
  }
  function keyup ({ keyCode }) {
    if (keyCode === 17) {
      ctrlDown = false
    }
    cbUp(keyCode)
  }

  el.addEventListener('keydown', keydown)
  el.addEventListener('keyup', keyup)
  return function () {
    el.removeEventListener('keydown', keydown)
    el.removeEventListener('keyup', keyup)
  }
}

function keyCtrlShift (el, cb) {
  let shiftDown = false
  keyCtrl(el, keyCode => {
    if (keyCode === 16) {
      shiftDown = true
    } else if (shiftDown) {
      if (cb(keyCode)) {
        return true
      }
    }
  }, keyCode => {
    if (keyCode === 16) {
      shiftDown = false
    }
  })
}

export {
  keyCtrl,
  keyCtrlShift
}
