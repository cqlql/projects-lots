export default class {
  constructor ({el, data, ylabels, dataLabels, legends}) {
    this.el = el
    this.ylabels = ylabels
    this.dataLabels = dataLabels
    this.data = data
    this.legends = legends

    // 加的 base 为比例缩放基础参数
    this.basePadding = this.padding = {t: 10, r: 10, b: 40, l: 100}
    this.baseOffset = this.offset = 30 // 本质也是 padding，四边共同的padding，解决锯齿问题
    this.baseAxesExtend = this.axesExtend = 10 // 轴延长
    this.baseGridExtend = this.gridExtend = 4 // 网格延长
    // this.baseXSpace = this.xSpace = 40
    this.baseLabelWidth = this.labelWidth = 130

    this.baseWidth = this.width = 600
    this.baseHeight = this.height = 400

    this.scale = 1

    this.startX = 0
    this.startY = 0
    this.innerWidth = 0
    this.innerHeight = 0

    this.count = 0
    this.partW = 0 // 刻度宽
    this.basePartH = this.partH = 80 // 刻度高

    this.xCount = 5 // x 刻度

    this.handleDom()
    // this.buildYLabels()
    // this.handleLegend()
    // this.update()
    // this.bindData({data, ylabels, dataLabels, legends})
  }
  bindData ({data, ylabels, dataLabels, legends}) {
    this.ylabels = ylabels
    this.dataLabels = dataLabels
    this.data = data
    this.legends = legends
    this.count = data.length

    this.buildYLabels()
    this.handleLegend()

    this.update()
  }

  handleDom () {
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
    let {ctx, padding, offset, width, count, xCount, partH} = this
    let {t, r, b, l} = padding

    let innerHeight = this.innerHeight = partH * count
    let height = this.height = innerHeight + t + b + offset * 2

    let startX = this.startX = l + offset
    this.startY = t + offset

    let innerWidth = width - startX - r - offset

    let partW = this.partW = ~~(innerWidth / xCount)

    this.innerWidth = partW * xCount

    let cvs = ctx.canvas
    cvs.width = width
    cvs.height = height
    ctx.translate(0.5, 0.5)
    ctx.clearRect(0, 0, width, height)
  }

  computeBarData () {
    let {startX, startY, innerWidth, innerHeight, data, scale} = this

    let barSpace = ~~(8 * scale)
    let barChildSpace = ~~(2 * scale)

    let count = data.length
    let partH = ~~(innerHeight / count)

    let barData = []
    let y = startY
    data.forEach(d => {
      let childCount = d.length
      let childPartH = ~~((partH - barSpace * 2) / childCount)

      let childY = y + barSpace
      let childBarData = []
      d.forEach((p, i) => {
        let w = ~~(innerWidth * p)
        let y = childY
        if (i !== 0) {
          y += barChildSpace * 2
        }
        childBarData.push([startX, y, w, childPartH - barChildSpace])
        childY += childPartH
      })
      y += partH
      barData.push(childBarData)
    })

    return barData
  }

  dragBar (data) {
    let {ctx, dataLabels, scale} = this
    let bgcs = ['rgba(255,99,132,0.4)', 'rgba(54,162,235,0.4)']
    // let bgcs = ['#ff6384', '#36a2eb']
    let bcs = ['#ff6384', '#36a2eb']
    let minW = 80 * scale

    ctx.lineWidth = 1
    ctx.font = 24 * scale + 'px consolas'
    // ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    data.forEach((d, i) => {
      let dl = dataLabels[i]
      d.forEach((p, i) => {
        let {0: x, 1: y, 2: w, 3: h} = p
        ctx.fillStyle = bgcs[i]
        ctx.strokeStyle = bcs[i]
        ctx.fillRect(x, y, w, h)
        ctx.strokeRect(x, y, w, h)
        ctx.fillStyle = '#0082d9'
        if (w < minW) {
          ctx.textAlign = 'left'
          ctx.fillText(dl[i], (x + w) * 1.04, y + h / 2)
        } else {
          ctx.textAlign = 'right'
          ctx.fillText(dl[i], (x + w) * 0.99, y + h / 2)
        }
      })
    })
  }

  dragYAxes () {
    let {ctx} = this
    let {startX, startY, innerHeight, axesExtend} = this
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
  }

  dragXAxes () {
    let {ctx, startX, startY, innerWidth, innerHeight, axesExtend, scale} = this
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

    ctx.fillStyle = '#999'
    ctx.textAlign = 'right'
    ctx.font = 20 * scale + 'px consolas'
    ctx.fillText('掌握率(%)', endX + 20 * scale, startY + 56 * scale)
  }

  dragYGrid () {
    let {ctx, startX, startY, innerWidth, partH, count, gridExtend} = this

    let ydata = []
    let y = startY
    let endX = startX + innerWidth
    for (let i = count; i--;) {
      ydata.push([startX - gridExtend, y, endX + gridExtend])
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
    let {ctx, startX, startY, innerHeight, partW, xCount, gridExtend} = this
    let endY = startY
    startY = startY + innerHeight
    let x = startX + partW
    let xdata = []
    for (let i = xCount; i--;) {
      xdata.push([x, startY + gridExtend, endY - gridExtend])
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
    let {startX, startY, partH, count} = this

    startX *= 0.9
    let ydata = []
    let y = startY
    for (let i = count; i--;) {
      ydata.push([startX, y + partH / 2])
      y += partH
    }
    return ydata
  }

  getXLabelsXY () {
    let {startX, startY, innerHeight, partW, xCount, scale} = this

    startY = startY + innerHeight + (10 * scale)
    let xdata = []
    let x = startX
    for (let i = xCount + 1; i--;) {
      xdata.push([x, startY])
      x += partW
    }
    return xdata
  }

  buildYLabels () {
    let {ylabels, elLabels} = this
    let lbs = ''
    ylabels.forEach(n => {
      lbs += `<div class="y-label"><span>${n}</span></div>`
    })
    elLabels.innerHTML = lbs
    this.eYLables = elLabels.children
  }
  updateYLabels () {
    let ydata = this.getYLabelsXY()
    let lbs = this.eYLables
    let labelWidth = this.labelWidth
    ydata.forEach(({0: x, 1: y}, i) => {
      let style = lbs[i].style
      style.left = x / 2 - labelWidth + 'px'
      style.top = y / 2 + 'px'
      // style.transform = `translate(${x / 2 - labelWidth}px,${y / 2}px)`
      style.width = labelWidth + 'px'
    })
  }
  updateXLabels () {
    let {ctx, scale, xCount} = this
    let xdata = this.getXLabelsXY()

    ctx.fillStyle = '#666'
    ctx.font = 24 * scale + 'px consolas'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    xdata.forEach(({0: x, 1: y}, i) => {
      ctx.fillText((i / xCount * 100).toFixed(0), x, y)
    })
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
    let {el, baseWidth, basePadding, basePartH} = this

    let w = this.width = el.clientWidth * 2
    let scale = this.scale = w / baseWidth
    // let h = this.height = ~~(baseHeight * scale)

    this.padding = {
      t: ~~(basePadding.t * scale),
      r: ~~(basePadding.r * scale),
      b: ~~(basePadding.b * scale),
      l: ~~(basePadding.l * scale)
    }
    this.offset = ~~(this.baseOffset * scale) // 本质也是 padding，四边共同的padding
    this.axesExtend = ~~(this.baseAxesExtend * scale) // 轴延长
    this.gridExtend = ~~(this.baseGridExtend * scale) // 网格延长
    // this.xSpace = ~~(this.baseXSpace * scale)
    this.labelWidth = ~~(this.baseLabelWidth * scale / 2)

    this.partH = ~~(basePartH * scale)

    el.style.fontSize = 24 * scale / 2 + 'px'

    this.handleBoxXYWH()
    this.dragXGrid()
    this.dragYGrid()
    this.dragBar(this.computeBarData())
    this.dragYAxes()
    this.dragXAxes()
    this.updateYLabels()
    this.updateXLabels()
  }
}
