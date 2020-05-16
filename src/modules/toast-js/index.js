import $style from './toast.css?module'
class Toast {
  init () {
    if (this.isInit) {
      this.isInit = true
      return
    }
    const el = document.createElement('div')
    const eText = document.createElement('div')
    el.appendChild(eText)
    el.className = $style.toast
    eText.className = $style.txt
    document.body.appendChild(el)

    // this.setText = v => {
    //   eText.textContent = v
    // }
    // this.setType = v => {
    //   el.className = $style.toast + ' ' + v
    // }
    this.set = ({ text, type }) => {
      eText.textContent = text
      type = $style[type]
      el.className = $style.toast + (type ? (' ' + type) : '')
    }
  }

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

  show (options) {
    this.init()
    this.set(options)
  }
}

const t = new Toast()

function toast (text) {
  t.text(text)
}

toast.text = function (v) { t.text(v) }
// toast.success = t.success
toast.error = function (v) { t.error(v) }
toast.show = function (v) { t.show(v) }

export default toast
