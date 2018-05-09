export default class {
  constructor ({el, data, labels, legends}) {
    this.el = el
    this.labels = labels
    this.data = data
    this.legends = legends

    // 加的 base 为比例缩放基础参数
    this.basePadding = this.padding = {t: 16, r: 10, b: 10, l: -10}
    this.baseOffset = this.offset = 30 // 本质也是 padding，四边共同的padding，解决锯齿问题
    this.baseAxesExtend = this.axesExtend = 10 // 轴延长
    this.baseGridExtend = this.gridExtend = 4 // 网格延长
    // this.baseXSpace = this.xSpace = 40
    this.baseLabelWidth = this.labelWidth = 130

    this.baseWidth = this.width = 600
    this.baseHeight = this.height = 300

    this.scale = 1

    this.startX = 0
    this.startY = 0
    this.innerWidth = 0
    this.innerHeight = 0

    this.count = 0 // 数据刻度
    this.partW = 0 // 刻度宽
    this.partH = 0 // 刻度高

    this.valueCount = 5 // 值刻度

    this.angle = Math.PI / 180 * 300

    this.handleDom()
    // this.buildXLabels()
    // this.buildYLabels()
    // this.handleLegend()
    // this.update()
  }
  bindData ({data, labels, legends}) {
    this.labels = labels
    this.data = data
    this.legends = legends
    this.count = labels.length - 1

    this.handleLegend()
    this.update()
  }

  handleDom () {
    // let cvs = document.createElement('canvas')
    // this.el.appendChild(cvs)
    // this.ctx = cvs.getContext('2d')

    let {el} = this

    let elLegend = this.elLegend = document.createElement('ul')
    elLegend.className = 'chart-box-legend'
    el.appendChild(elLegend)

    let cvs = document.createElement('canvas')
    let cbsBox = this.cbsBox = document.createElement('div')
    cbsBox.className = 'chart-box-cvs'
    cbsBox.appendChild(cvs)
    el.appendChild(cbsBox)
    this.ctx = cvs.getContext('2d')

    let elLabels = this.elLabels = document.createElement('div')
    cbsBox.appendChild(elLabels)
  }

  handleBoxXYWH () {
    let {padding, offset, width, height, count, valueCount} = this
    let {t, r, b, l} = padding

    let startX = this.startX = l + offset
    let startY = this.startY = t + offset

    let innerWidth = width - startX - r - offset
    let innerHeight = height - startY - b - offset

    let partW = this.partW = ~~(innerWidth / count)
    let partH = this.partH = ~~(innerHeight / valueCount)
    this.innerWidth = partW * count
    this.innerHeight = partH * valueCount
  }

  computeLineData () {
    let {startX, startY, innerHeight, partW, data} = this

    let lineData = []
    let lineData3 = []
    data.forEach(ds => {
      let lines = []
      let x = startX
      ds.forEach(p => {
        lines.push([x, startY + ~~(innerHeight * (1 - p))])
        x += partW
      })
      // 3
      let lines3 = []
      let count = lines.length
      // 只有 2点情况不经过这里
      for (let i = 1; i < count - 1; i++) {
        lines3.push([lines[i - 1], lines[i], lines[i + 1]])
      }
      // 只有2点情况
      if (count === 2) {
        lines3.push([lines[0], lines[1]])
      }
      lineData3.push(lines3)
      lineData.push(lines)
    })

    return [lineData, lineData3]
  }

  dragLine ({0: data, 1: lineData3}) {
    let {ctx} = this
    // let bgcs = ['rgba(255,99,132,0.4)', 'rgba(54,162,235,0.4)']
    // let bgcs = ['#ff6384', '#36a2eb']
    let bcs = ['#ff6384', '#36a2eb']

    ctx.lineJoin = 'round'
    ctx.lineWidth = 2

    // 画线
    // data.forEach((ds, i) => {
    //   ctx.strokeStyle = bcs[i]
    //   ctx.beginPath()
    //   ds.forEach(({0: x, 1: y}, i) => {
    //     ctx.lineTo(x, y)
    //   })
    //   ctx.stroke()
    // })

    // 画曲线
    let degree = 0.4 // 弯曲程度
    lineData3.forEach((d, i) => {
      let pp // 上一点的偏移点
      let len = d.length
      ctx.strokeStyle = bcs[i]
      ctx.beginPath()
      if (len === 1) {
        let lines = d[0]
        let p1 = lines[0]
        let p2 = lines[1]

        ctx.moveTo(p1[0], p1[1])
        pp = [p1[0] + 20 * degree, p1[1]]
        ctx.bezierCurveTo(pp[0], pp[1], p2[0] - 20 * degree, p2[1], p2[0], p2[1])
      } else {
        d.forEach((lines, i) => {
          let p1 = lines[0]
          let p2 = lines[1]
          let p3 = lines[2]
          let center = [~~((p3[0] - p1[0]) / 2 * degree), ~~((p3[1] - p1[1]) / 2 * degree)]
          let lp = [p2[0] - center[0], p2[1] - center[1]]
          let rp = [p2[0] + center[0], p2[1] + center[1]]
          if (!pp) {
            ctx.moveTo(p1[0], p1[1])
            pp = [p1[0] + 20 * degree, p1[1]]
          }
          ctx.bezierCurveTo(pp[0], pp[1], lp[0], lp[1], p2[0], p2[1])
          if (i === len - 1) {
            ctx.bezierCurveTo(rp[0], rp[1], p3[0] - 20 * degree, p3[1], p3[0], p3[1])
          }
          pp = rp
        })
      }

      ctx.stroke()
    })

    // 画点
    data.forEach((ds, i) => {
      ctx.fillStyle = bcs[i]
      ds.forEach(({0: x, 1: y}) => {
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      })
    })
  }

  dragYAxes () {
    let {startX, startY, innerHeight, axesExtend, scale, ctx} = this
    let endY = startY + innerHeight

    // 延长
    startY -= axesExtend
    endY += axesExtend

    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, endY)
    ctx.closePath()
    ctx.stroke()

    ctx.fillStyle = '#999'
    ctx.textAlign = 'center'
    ctx.font = 20 * scale + 'px consolas'
    ctx.fillText('正确率(%)', startX, startY - 10 * scale)
  }

  dragXAxes () {
    let {ctx, startX, startY, innerWidth, innerHeight, axesExtend} = this
    startY = startY + innerHeight
    let endX = startX + innerWidth

    // 延长
    startX -= axesExtend
    endX += axesExtend

    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, startY)
    ctx.closePath()
    ctx.stroke()
  }

  dragYGrid () {
    let {ctx, startX, startY, innerWidth, partH, valueCount, baseGridExtend} = this

    let ydata = []
    let y = startY
    let endX = startX + innerWidth
    for (let i = valueCount; i--;) {
      ydata.push([startX - baseGridExtend, y, endX + baseGridExtend])
      y += partH
    }

    // 画
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    ydata.forEach(d => {
      let {0: sx, 1: sy, 2: ex} = d
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(ex, sy)
      ctx.closePath()
      ctx.stroke()
    })
  }

  dragXGrid () {
    let {ctx, startX, startY, innerHeight, partW, count, baseGridExtend} = this
    let endY = startY
    startY = startY + innerHeight
    let x = startX + partW
    let xdata = []
    for (let i = count; i--;) {
      xdata.push([x, startY + baseGridExtend, endY - baseGridExtend])
      x += partW
    }

    // 画
    ctx.strokeStyle = '#ddd'
    ctx.lineWidth = 1
    xdata.forEach(d => {
      let {0: sx, 1: sy, 2: ey} = d
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(sx, ey)
      ctx.closePath()
      ctx.stroke()
    })
  }

  getYLabelsXY () {
    let {startX, startY, partH, valueCount} = this

    startX *= 0.8
    let ydata = []
    let y = startY
    for (let i = valueCount + 1; i--;) {
      ydata.push([startX, y])
      y += partH
    }
    return ydata
  }

  updateYLabels () {
    let {ctx, valueCount, scale} = this
    let ydata = this.getYLabelsXY()

    ctx.fillStyle = '#666'
    ctx.font = 24 * scale + 'px consolas'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ydata.forEach(({0: x, 1: y}, i) => {
      // ctx.beginPath()
      // ctx.arc(x, y, 5, 0, Math.PI * 2)
      // ctx.closePath()
      // ctx.fill()
      ctx.fillText(((valueCount - i) / valueCount * 100).toFixed(0), x, y)
    })
  }

  getXLabelsXY () {
    let {startX, startY, partW, count, innerHeight, scale} = this

    startY = startY + innerHeight + (16 * scale)
    let xdata = []
    let x = startX
    for (let i = count + 1; i--;) {
      xdata.push([x, startY])
      x += partW
    }
    return xdata
  }

  updateXLabels () {
    let {ctx, labels, scale, angle} = this
    let xdata = this.getXLabelsXY()

    ctx.fillStyle = '#666'
    ctx.font = 24 * scale + 'px consolas'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'

    xdata.forEach(({0: x, 1: y}, i) => {
      // ctx.beginPath()
      // ctx.arc(x, y, 5, 0, Math.PI * 2)
      // ctx.closePath()
      // ctx.fill()
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.fillText(labels[i], 0, 0)
      ctx.restore()
    })
  }

  measureTextSize () {
    let {ctx, labels, scale, angle} = this
    ctx.font = 24 * scale + 'px consolas'

    let maxTxtWidth = 0
    let firstTxtWidth = 0
    labels.forEach((label, i) => {
      let w = ctx.measureText(label).width
      if (w > maxTxtWidth) {
        maxTxtWidth = w
      }
      if (i === 0) {
        firstTxtWidth = w
      }
    })
    return {
      maxH: ~~(-Math.sin(angle) * maxTxtWidth),
      firstW: ~~(Math.cos(angle) * firstTxtWidth)
    }
  }

  handleLegend () {
    let {legends, elLegend} = this
    let ht = ''
    let bgcs = ['#ff6384', '#36a2eb']
    legends.forEach((v, i) => {
      ht += `<li><b style="background-color:${bgcs[i]}"></b><span>${legends[i]}</span></li>`
    })
    elLegend.innerHTML = ht
  }

  update () {
    let {el, ctx, baseWidth, baseHeight, basePadding} = this

    let w = this.width = el.clientWidth * 2
    let scale = this.scale = w / baseWidth

    let txtSize = this.measureTextSize()

    let h = this.height = ~~(baseHeight * scale)
    this.padding = {
      t: ~~(basePadding.t * scale),
      r: ~~(basePadding.r * scale),
      b: ~~(basePadding.b * scale),
      l: ~~(basePadding.l * scale) + txtSize.firstW
    }
    this.offset = ~~(this.baseOffset * scale) // 本质也是 padding，四边共同的padding
    this.axesExtend = ~~(this.baseAxesExtend * scale) // 轴延长
    this.gridExtend = ~~(this.baseGridExtend * scale) // 网格延长
    // this.xSpace = ~~(this.baseXSpace * scale)
    this.labelWidth = ~~(this.baseLabelWidth * scale)

    el.style.fontSize = 24 / 2 * scale + 'px'

    let cvs = ctx.canvas
    cvs.width = w
    cvs.height = h + txtSize.maxH
    ctx.translate(0.5, 0.5)
    ctx.clearRect(0, 0, w, h)

    this.handleBoxXYWH()
    this.dragXGrid()
    this.dragYGrid()
    this.dragYAxes()
    this.dragXAxes()
    this.dragLine(this.computeLineData())
    this.updateYLabels()
    this.updateXLabels()
  }
}
