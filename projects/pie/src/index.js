// import './index.css'
// import getxyByRad from './getxy-by-rad'
// import pie from './pie'
import getxyByRad from './pie/getxy-by-rad'
import pie from './pie/pie'

function chartPie ({el, data, eachData, labels}) {
  // 圆心
  let ox = 100
  let oy = 60

  // 半径
  let r = 45

  // 边框间隙
  let bw = 1

  // 底色值
  let eachBgcs = ['#a9bfff', '#93e3a5', '#83d5ff', '#ffcf78', '#ffc7ad']
  let lcs = ['#ddd']

  // 起始弧度
  let angOft = 120
  let sRad = Math.PI / 180 * -angOft
  let paths = ''
  let texts = ''
  let lines = ''
  let count = data.length
  data.forEach(function (p, i) {
    let isFull = p === 1

    let rad = p * Math.PI * 2
    let r2 = (r - 1) * (eachData[i]) + 1.5
    let bgIndex = i % 5
    let bgcs = eachBgcs[bgIndex]
    if (i > 0 && i === count - 1 && bgIndex === 0) {
      bgcs = eachBgcs[1]
    } else {
      bgcs = eachBgcs[bgIndex]
    }

    if (isFull) {
      paths += `<circle cx="${ox}" cy="${oy}" r="${r}" fill="${bgcs}"/>`
    } else {
      paths += `<path d="${pie({
        ox, oy, r: r2, sRad, rad
      })}"
fill="${bgcs}"
></path>`
      // 画边框
      paths += `<path d="${pie({
        ox, oy, r: r + 1, sRad, rad
      })}"
fill="transparent"
stroke="#fff" stroke-width="${bw}"
></path>`
    }

    // 画线，并记录文本坐标
    let ra = sRad + rad / 2
    let exOft = 20 // 末端折线偏移
    let txOft = 6 // 文本偏移

    if (ra < 0) ra = Math.PI * 2 + ra
    let lineAngle = (180 / Math.PI * ra + 90) % 360
    if (lineAngle > 180) {
      exOft = -exOft
      txOft = -txOft
    }
    let lineBottonOffset = 3
    if (lineAngle > 90 && lineAngle < 270) {
      lineBottonOffset = 10
    }
    let lR2 = r2 / 1.2 // 内部饼图线条起始半径，用来算坐标
    let {x: sx, y: sy} = getxyByRad(ra, lR2 > 1.5 ? lR2 : 1.5, ox, oy)// 起始坐标
    let {x: ex, y: ey} = getxyByRad(ra, r + lineBottonOffset, ox, oy)
    let tx = ex + exOft, ty = ey
    lines += `<polyline points="${sx},${sy} ${ex},${ey} ${tx},${ty}"
fill="none"
stroke="${lcs[i % 1]}"
stroke-width=".5"
></polyline>`

    // svg 文本
    texts += `<text x="${ex + txOft}" y="${ey - 3}" font-size="8" text-anchor="${exOft > 0 ? 'start' : 'end'}" fill="#666">${labels[i]}</text>`

    sRad += rad
  })

  el.innerHTML = `<svg viewbox="0,0,200,120">
${paths}
${lines}
${texts}</svg>`
}

window.transmitData = function (baseData) {
  // 扇形占比
  let data = []
  let eachData = []
  let labels = []

  baseData.forEach(function (d) {
    let {weight, dimension_name} = d
    let w = weight / 100

    data.push(w)
    labels.push(dimension_name)
    eachData.push(1)
  })

  chartPie({
    data,
    eachData,
    labels
  })
}

export default function (el, baseData) {
  // 扇形占比
  let data = []
  let eachData = []
  let labels = []

  baseData.forEach(function (d) {
    let {weight, dimension_name} = d
    let w = weight / 100

    data.push(w)
    labels.push(dimension_name)
    eachData.push(1)
  })

  chartPie({
    el,
    data,
    eachData,
    labels
  })
}
