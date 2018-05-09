/**
 * 放大看图
 *
 *
 *
 * */
import imgSizeComplete from '../corejs/dom/img-size-complete'
import autoPrefix from '../corejs/dom/css/autoprefix'
import htmlToElems from '../corejs/dom/html-to-elems'
import toFragment from '../corejs/dom/to-fragment'
import ZoomTouch from './zoom-touch'

let transform = autoPrefix('transform')[1]

export default class PictureZoom extends ZoomTouch {
  constructor ({eBox} = {}) {
    super({
      // 容器。事件范围
      eBox
      // 放大回调，只要坐标尺寸改变就将调用
      // onZoom: (x, y, w, h, scale) => {
      //     this.zoom(x, y, w, h, scale);
      // }
    })

    this.boxW = this.boxH = 0// 容器高宽
  }

  PictureZoomInit () {
    this.PictureZoomInit = () => {
    }// 清理，保证只会执行一次

    let childs = htmlToElems(`<img/>`)

    this.eImg = childs[0]
    this.eBox.appendChild(toFragment(childs))
  }

  // 更新容器尺寸坐标
  // 1、初始情况调用  2、当容器尺寸发生改变后调用
  resizeBox () {
    this.boxW = this.eBox.clientWidth
    this.boxH = this.eBox.clientHeight

    this.minScale = this.boxW / this.imgWidth * 0.5
  }

  // 放大执行
  onZoom (x, y, w, h, scale) {
    /// 限制。高宽限制已经通过最小比例控制，只需处理坐标限制
    // 坐标限制
    let minX = this.boxW - w
    let minY = this.boxH - h

    if (x > 0) this.currX = x = 0
    else if (x < minX) this.currX = x = minX
    if (y > 0) this.currY = y = 0
    else if (y < minY) this.currY = y = minY
    // 居中情况
    if (w < this.boxW) {
      this.currX = x = (this.boxW - w) / 2
    }
    if (h < this.boxH) {
      this.currY = y = (this.boxH - h) / 2
    }

    // 使用 scale 自动中心偏移坐标
    let otherX = this.imgWidth / 2 * (scale - 1)
    let otherY = this.imgHeight / 2 * (scale - 1)

    x = x + otherX
    y = y + otherY

    this.eImg.style[transform] = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + scale + ', ' + scale + ')'
  }
  // /// 公开

  // 更新容器尺寸坐标，更新选择框，更新 放大元素位置
  // 当容器尺寸改变时可直接调用
  resize () {
    this.resizeBox()

    this.toDefault()
  }

  // 只是单纯设置比例
  setScaleRestrict (min, max) {
    if (min !== undefined) {
      this.minScale = min
    }
    if (max !== undefined) {
      this.maxScale = max
    }
  }

  // 图片完整显示居中
  toFullCenter () {
    let boxRatio = this.boxW / this.boxH
    let imgRatio = this.imgWidth / this.imgHeight

    let w
    let h
    let scale
    if (boxRatio > imgRatio) {
      this.currH = h = this.boxH
      this.currW = w = h * imgRatio
      this.currScale = scale = h / this.imgHeight
    } else {
      this.currW = w = this.boxW
      this.currH = h = w / imgRatio
      this.currScale = scale = w / this.imgWidth
    }
    this.onZoom(0, 0, w, h, scale)
  }

  // 默认位置。数据生效。回到当前坐标尺寸数据
  // 当 图片换 或者 容器尺寸改变后可调用
  // 可反复调用
  toDefault () {
    this.onZoom(this.currX, this.currY, this.currW, this.currH, this.currScale)
  }

  // 初始或者更换图片，可以设置最大最小比例
  // 必须第一次执行
  initImg (src, min, max) {
    imgSizeComplete(src, (img) => {
      this.PictureZoomInit()
      this.eImg.src = src
      this.zoomInit(img.width, img.height)
      this.resizeBox()
      this.setScaleRestrict(min, max)
      this.toFullCenter()
      // this.toDefault();
    }, () => {

    })
  }
}
