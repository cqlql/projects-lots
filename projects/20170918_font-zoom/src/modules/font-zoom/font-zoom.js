import autoprefix from '../corejs/dom/css/autoprefix'
let transform = autoprefix('transform')[1]

export default function fontZoom (el) {
  let boxH = 245
  let count = el.children.length
  let rootHeight = 35
  let rootContHeight = count * rootHeight
  let scale = boxH / rootContHeight

  el.style[transform] = `scale(${scale}) translateY(${-(rootContHeight - boxH) / 2 / scale}px)`
}

// function handle1 () {
//   let boxH = 245
//   let count = 20
//   let maxCount = parseInt(boxH / (12 * 1.6))
//   if (count > maxCount) {
//     count = maxCount
//   }
//
//   let rh = boxH / count
//   let lineHeight = 1.46
//   let fontSize = rh / lineHeight
//
//   addCssText(`
// .box li{
// height:${rh}px;
// font-size:${fontSize}px
// }
// `)
//
// }
