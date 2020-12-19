
function keyCtrl (el, cb, cbUp = () => {}) {
  let ctrlDown = false
  el.addEventListener('keydown', function (e) {
    let {keyCode} = e
    if (keyCode === 17) {
      ctrlDown = true
    } else if (ctrlDown) {
      if (cb(keyCode)) {
        e.preventDefault()
      }
    }
  })
  el.addEventListener('keyup', function ({keyCode}) {
    if (keyCode === 17) {
      ctrlDown = false
    }
    cbUp(keyCode)
  })
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
