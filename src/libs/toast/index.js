import $style from './toast.css?module'
// import transition from '@/utils/corejs/animation/transition.js'
// import transitionendOnce from '@/utils/corejs/animation/transitionend-once.js'
import transitionendOncePromise from '@/utils/corejs/animation/transitionend-once-promise.js'
import timeoutAsync from '@/utils/corejs/time/timeout-async'

class Toast {
  text (text) {
    this.show({
      text
    })
  }

  success (text) {
    this.show({
      type: 'success',
      text
    })
  }

  error (text) {
    this.show({
      type: 'error',
      text
    })
  }

  async show ({ text, type }) {
    const el = document.createElement('div')
    const eText = document.createElement('span')
    let position = 'bottom' // 位置
    if (type === 'success') {
      const eTickIcon = document.createElement('div')
      eTickIcon.className = $style.tickIcon
      eTickIcon.innerHTML = '<svg viewBox="0 0 1024 1024"><path d="M962 237.778l-585 630-315-405 115.313-98.438 199.688 208.125 495-424.688 90 90z" fill="currentColor"></path></svg>'
      el.appendChild(eTickIcon)
      position = 'center'
    } else if (type === 'error') {
      const eErrIco = document.createElement('i')
      eErrIco.className = $style.errorIcon
      el.appendChild(eErrIco)
      position = 'center'
    }

    el.appendChild(eText)
    el.className = $style.toast
    eText.className = $style.text

    document.body.appendChild(el)

    eText.textContent = text
    type = $style[type] || ''
    el.className = $style.toast + ' ' + $style[position] + ' ' + type

    // fade 动画
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
toast.success = function (v) { t.success(v) }

export default toast
