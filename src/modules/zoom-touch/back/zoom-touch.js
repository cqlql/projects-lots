/**
 * 触摸放大基础
 *
 * */

import offsetxy from '../corejs/dom/offsetxy'

export default class ZoomTouch {
  constructor ({eBox, onZoom} = {}) {
    this.eBox = eBox
    // this.eImg=eImg;
    if (onZoom) this.onZoom = onZoom
    this.imgWidth = this.imgHeight = 0// 图片原始高宽
    this.boxX = this.boxY = 0// 容器相对于页面内容坐标。在zoomTouchInit 中被初始

    // /// 公开
    this.currW = this.currH = 0// 当前图片高宽。核心实现是通过比例得到 高宽的，所以有比例就有高宽。此为被动字段
    this.currY = this.currX = 0// 当前坐标
    this.currScale = 1// 当前放大比例
    // 点击手势情况出发
    this.minScale = 0.5// 最小比例 根据容器高宽决定 在容器高宽改变时更新(当前是根据图片自身大小，需根据容器高宽换算，否则最小尺寸也会撑破容器)
    this.maxScale = 10// 最大比例
    // 点击手势情况出发
    this.onClick = () => {}
  }

  zoomTouchInit () {
    this.zoomTouchInit = () => {
    }// 清理，保证只会执行一次

    // 实现核心，双点坐标
    // 获取的是相对于浏览器内容窗口。如果是以偏离浏览器窗口的div为窗口实现效果，且有滚动条情况下，centerXY需加上div滚动条卷去距离
    function getDoubleToucheXY (touche1, touche2) {
      let xLen
      let yLen
      let centerX
      let centerY

      xLen = Math.abs(touche1.pageX - touche2.pageX)
      yLen = Math.abs(touche1.pageY - touche2.pageY)

      if (touche1.pageX < touche2.pageX) {
        centerX = touche1.pageX + xLen / 2
      } else {
        centerX = touche2.pageX + xLen / 2
      }

      if (touche1.pageY < touche2.pageY) {
        centerY = touche1.pageY + yLen / 2
      } else {
        centerY = touche2.pageY + yLen / 2
      }

      return {
        centerX: centerX,
        centerY: centerY,

        // 两点连线长度
        diameter: Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2))
      }
    }

    let zoomStart = (t1, t2) => {
      preX = this.currX
      preY = this.currY
      preScale = this.currScale

      startDataXY = getDoubleToucheXY(t1, t2)
    }
    let zoomMove = (t1, t2) => {
      let moveDateXY = getDoubleToucheXY(t1, t2)

      let centerX = moveDateXY.centerX
      let centerY = moveDateXY.centerY
      let moveX = moveDateXY.centerX - startDataXY.centerX
      let moveY = moveDateXY.centerY - startDataXY.centerY
      let scale = moveDateXY.diameter / startDataXY.diameter

      let toX
      let toY
      let toW
      let toH
      let toScale

      // 算比例
      this.currScale = toScale = preScale * scale

      // 限制比例
      if (toScale < this.minScale) {
        this.currScale = toScale = this.minScale
        scale = toScale / preScale
      } else if (toScale > this.maxScale) {
        this.currScale = toScale = this.maxScale
        scale = toScale / preScale
      }

      // 算高宽
      this.currW = toW = this.imgWidth * toScale
      this.currH = toH = this.imgHeight * toScale

      /// 算 x y
      // 中心点相对于图片坐标
      let offsetX = centerX - preX - this.boxX
      let offsetY = centerY - preY - this.boxY
      // 中心点相对于图片坐标比例
      let offsetXS = offsetX / toW
      let offsetYS = offsetY / toH
      // 缩放了多少长度
      let zoomW = toW * (1 - scale)
      let zoomH = toH * (1 - scale)
      //
      this.currX = toX = offsetXS * zoomW + moveX * scale + preX
      this.currY = toY = offsetYS * zoomH + moveY * scale + preY

      this.onZoom(toX, toY, toW, toH, toScale)
    }
    let zoomEnd = () => {}

    // 单点移动 事件处理
    let singleStart = (touche) => {
      preX = this.currX
      preY = this.currY

      startX = touche.pageX
      startY = touche.pageY
    }
    let singleMove = (touche) => {
      let moveX = touche.pageX
      let moveY = touche.pageY

      let toX
      let toY

      this.currX = toX = moveX - startX + preX
      this.currY = toY = moveY - startY + preY

      this.onZoom(toX, toY, this.currW, this.currH, this.currScale)
    }
    let singleEnd = () => {
    }

    let startDataXY // 临时记录 多点记录开始坐标参数
    // 临时记录 单点记录开始坐标
    let startX
    let startY
    // 临时记录
    let preX
    let preY
    let preScale
    // 双点放大开始
    let isStart = 0
    // 单点拖动开始
    let isSingleStart = 0

    // 是否是点击
    let isClick = false

    this.eBox.addEventListener('touchstart', function (e) {
      let touches = e.touches
      let len = touches.length

      if (len === 2) {
        isStart = 1
        zoomStart(touches[0], touches[1])
        e.preventDefault()

        isClick = false
      } else {
        if (isStart) {
          isStart = 0
          zoomEnd()
        }

        // 处理单点移动逻辑。2点以上也当单点处理
        isSingleStart = 1
        singleStart(touches[0])

        if (len === 1) {
          isClick = true
        }

        e.preventDefault()
      }
    })
    this.eBox.addEventListener('touchmove', function (e) {
      let touches = e.touches
      if (isStart) {
        zoomMove(touches[0], touches[1])
        e.preventDefault()
      } else if (isSingleStart) { // 处理单点
        singleMove(touches[0])
      }

      // 有移动情况 判断不是点击事件。android 由于 preventDefault 原因，造成move误差大，需要移动的长度来精确
      if (isClick) {
        if (Math.abs(touches[0].pageX - startX > 1) || Math.abs(touches[0].pageY - startY > 1)) {
          isClick = false
        }
      }
    })

    this.eBox.addEventListener('touchend', (e) => {
      let touches = e.touches
      let len = touches.length

      if (len === 2) {
        isStart = 1
        zoomStart(touches[0], touches[1])
      } else {
        if (isStart) {
          isStart = 0
          zoomEnd()
        }

        // 处理单点
        if (len) {
          isSingleStart = 1
          singleStart(touches[0])
        } else {
          if (isSingleStart) {
            isSingleStart = 0
            singleEnd()
          }

          // 点击手势
          if (isClick) {
            this.onClick()
          }
        }
      }
    })
  }

  // 容器高宽改变
  // 可以不给值，不给值将主动获取容器高宽。如此设计是为了利用现有高宽，节约效率
  sizeChange (w, h) {}

  // 放大开始，传入图片原始尺寸
  zoomInit (w, h) {
    this.zoomTouchInit()
    this.imgWidth = w
    this.imgHeight = h

    this.currW = w * this.currScale
    this.currH = h * this.currScale

    this.rexyBox()
  }

  rexyBox () {
    let boxXY = offsetxy(this.eBox)
    this.boxX = boxXY.left
    this.boxY = boxXY.top
  }
}
