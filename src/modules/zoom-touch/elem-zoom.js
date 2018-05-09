import drag from './drag-zoom'
import autoPrefix from '../corejs/dom-css/autoprefix'
import offsetxy from '../corejs/dom/offsetxy'

/**
 * @param elem 容器
 * @param elemz 放大元素
 *
 *
 * */
export default class {
  init ({elem, elemz}) {
    const transform = autoPrefix('transform')

    let {left: elPageX, top: elPagey} = offsetxy(elemz)
    let {clientWidth: elw, clientHeight: elh} = elem // 容器高宽
    let {offsetWidth: elzw, offsetHeight: elzh} = elemz // 放大元素高宽
    if (elzw === 0 || elzh === 0) {
      throw new Error('放大元素高宽不能为0')
    }
    let currScale = 1
    let preScale = 1
    let cStartX
    let cStartY
    let prex
    let prey
    let prew
    let preh
    let currx = 0
    let curry = 0
    let originX
    let originY

    function toScale (x, y) {
      // transform-origin 默认是50%. 这样写可能更容易明白： elzw * 0.5 * (scale - 1)
      let otherX = elzw / 2 * (currScale - 1)
      let otherY = elzh / 2 * (currScale - 1)
      x = x + otherX
      y = y + otherY
      elemz.style[transform] = `translate(${x}px,${y}px) scale(${currScale})`
      // elemz.style[transformOrigin] = `${originX*100}% ${originY*100}%`
    }

    drag({
      elem,
      onStart: (cPageX, cPageY) => {
        prex = currx
        prey = curry
        prew = elzw * preScale
        preh = elzh * preScale
        preScale = currScale
        cStartX = cPageX
        cStartY = cPageY

        // 两点中心所在元素位置
        let offsetx = cPageX - elPageX - currx
        let offsety = cPageY - elPagey - curry

        let w = elzw * currScale
        let h = elzh * currScale

        originX = offsetx / w
        originY = offsety / h
      },
      onMove: (cPageX, cPageY, scale) => {
        currScale = preScale * scale
        if (currScale < 0.5) {
          currScale = 0.5
          scale = currScale / preScale
        } else if (currScale > 3) {
          currScale = 3
          scale = currScale / preScale
        }

        let moveLenX = cPageX - cStartX
        let moveLenY = cPageY - cStartY

        // -- 算高宽 --
        let w = elzw * currScale
        let h = elzh * currScale

        // -- xy 坐标 --
        // 增减的高宽
        let tow = prew * (scale - 1)
        let toh = preh * (scale - 1)
        let x = moveLenX - originX * tow + prex
        let y = moveLenY - originY * toh + prey

        /// 限制。高宽限制已经通过最小比例控制，只需处理坐标限制
        // 坐标限制
        let minX = elw - w
        let minY = elh - h
        if (x > 0) x = 0
        else if (x < minX) x = minX
        if (y > 0) y = 0
        else if (y < minY) y = minY
        // 居中情况
        if (w < elw) {
          x = (elw - w) / 2
        }
        if (h < elh) {
          y = (elh - h) / 2
        }

        currx = x
        curry = y

        // 方案1:普通
        // elemz.style.width = w + 'px'
        // elemz.style.height = h + 'px'
        // elemz.style[transform] = `translate(${x}px,${y}px)`

        // 方案2:scale
        toScale(x, y)
      }
    })

    this.center = function (scale) {
      currScale = scale

      // -- 算高宽 --
      let w = elzw * currScale
      let h = elzh * currScale

      let x = (elw - w) / 2
      let y = (elh - h) / 2

      currx = x
      curry = y

      toScale(x, y)
    }
  }
}
