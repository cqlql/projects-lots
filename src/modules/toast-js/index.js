import $style from './toast.css?module'
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

  show ({ text, type }) {
    const el = document.createElement('div')
    const eText = document.createElement('div')
    el.appendChild(eText)
    el.className = $style.toast
    eText.className = $style.txt
    document.body.appendChild(el)

    eText.textContent = text
    type = $style[type]
    el.className = $style.toast + (type ? (' ' + type) : '')

    animation({
      el,
      transitionName: $style.transitionActive,
      end () {}
    })

    setTimeout(() => { el.remove() }, 1600)
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
