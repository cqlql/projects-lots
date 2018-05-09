/**
 * 元素放大
 * */
import ZoomTouch from './elem-zoom'
import popup from '../popup/popup-single'
import autoPrefix from '../corejs/dom-css/autoprefix'
import click from '../corejs/dom/click'

export default function (elem, css, created) {
  // 铺满屏幕
  function fullCenter (elem) {
    let {innerHeight, innerWidth} = window
    let {clientWidth: elemW, clientHeight: elemH} = elem
    let boxRatio = innerWidth / innerHeight
    let elemRatio = elemW / elemH
    let w
    let h
    if (boxRatio > elemRatio) {
      h = innerHeight
      w = h * elemRatio
    } else {
      w = innerWidth
      h = w / elemRatio
    }
    return {
      w,
      h
    }
  }

  function setCss (el, css) {
    if (css) {
      let {style} = el
      for (let name in css) {
        if (css.hasOwnProperty(name)) {
          style[autoPrefix(name)] = css[name]
        }
      }
    }
  }

  popup({
    created () {
      setTimeout(() => {
        let elzBox = document.createElement('div')
        let {w, h} = fullCenter(elem)
        elzBox.innerHTML = elem.outerHTML
        let elemz = elzBox.children[0]
        let eStyle = elzBox.style
        eStyle.width = '100%'
        eStyle.height = '100%'
        elemz.style.width = w + 'px'
        elemz.style.height = h + 'px'
        setCss(elemz, css)

        let {elemCont} = this
        let {style} = elemCont
        style.maxHeight = '100%'
        style.width = '100%'
        style.height = '100%'
        style.overflow = 'visible'
        style.left = '0'
        style.top = '0'
        style[autoPrefix('transform')] = 'none'
        style.boxShadow = 'none'
        style.backgroundColor = 'transparent'
        elemCont.replaceChild(elzBox, elemCont.firstElementChild)

        let zoomTouch = new ZoomTouch()

        zoomTouch.init({
          elem: elzBox,
          elemz,
          minScale: 0.5,
          maxScale: 5
        })

        zoomTouch.center(0.8)

        click(elzBox, () => {
          this.close()
        })

        created && created(elzBox, elemz)
      }, 0)
    }
  })
}
