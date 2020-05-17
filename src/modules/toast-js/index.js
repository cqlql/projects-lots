import $style from './toast.css?module'
// import transition from '@/modules/corejs/animation/transition.js'
// import transitionendOnce from '@/modules/corejs/animation/transitionend-once.js'
import transitionendOncePromise from '@/modules/corejs/animation/transitionend-once-promise.js'
import timeoutAsync from '@/modules/corejs/time/timeout-async'

class Toast {
  text (text) {
    this.show({
      text
    })
  }

  // success () {
  //   this.show({
  //     type: 'success',
  //     text
  //   })
  // }

  error (text) {
    this.show({
      type: 'error',
      text
    })
  }

  async show ({ text, type }) {
    const el = document.createElement('div')
    const eText = document.createElement('div')
    el.appendChild(eText)
    el.className = $style.toast
    eText.className = $style.txt
    document.body.appendChild(el)

    eText.textContent = text
    type = $style[type]
    el.className = $style.toast + (type ? (' ' + type) : '')
    const { classList, style } = el
    style.opacity = 0
    classList.add($style.transitionActive)
    await timeoutAsync(1)
    style.opacity = 1
    await transitionendOncePromise(el)
    await timeoutAsync(1600)
    style.opacity = 0
    await transitionendOncePromise(el)
    el.remove()
  }
}

const t = new Toast()

function toast (text) {
  t.text(text)
}

toast.text = function (v) { t.text(v) }
toast.error = function (v) { t.error(v) }
toast.show = function (v) { t.show(v) }
// toast.success = t.success

export default toast
