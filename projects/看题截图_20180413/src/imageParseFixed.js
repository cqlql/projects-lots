// export default function ({ x, y, w, h, url }) {
//   // 图片原始高宽
//   var aw = 595
//   var ah = 842

//   var imgOffsetX = -x / aw * 100
//   var imgOffsetY = -y / ah * 100
//   return `<div style="position: relative; overflow: hidden; padding-top: ${h / w * 100}%;"><div style="display: block; position: absolute; left: 0px; top: 0px; height: 100%; width: ${aw / w * 100}%;"><img src="${url}" style="position: absolute; width: 100%; transform: translate(${imgOffsetX}%, ${imgOffsetY}%);"/></div>
//   </div>`
// }

export default function ({ point, links, success }) {
  function imgComplete (src, f, err) {
    let img = new Image()
    img.onload = function () {
      f(img)
    }
    img.onerror = function () {
      err && err(img)
    }
    img.src = src
  }

  function pointToPx (point) {
    console.log(595 / 156, 842 / 217)
    return point
    // console.log(595 / 156, point)
    // return 595 / 156 * point
    // return point / 26.667 * 2.8346
  }

  function getXYWH ({ start_x: startX, start_y: startY, end_x: endX, end_y: endY }) {
    return {
      x: 595 / 156 * pointToPx(startX),
      y: 842 / 217 * pointToPx(startY),
      w: 595 / 156 * pointToPx(endX - startX),
      h: 842 / 217 * pointToPx(endY - startY)
    }
  }
  imgComplete(links[0], function (img) {
    // 图片原始高宽
    let aw = img.width
    let ah = img.height

    const { x, y, w, h } = getXYWH(point)
    console.log({ aw, ah, x, y, w, h })

    let imgOffsetX = -x / aw * 100
    let imgOffsetY = -y / ah * 100

    let imgs = ''
    links.forEach(src => {
      imgs += `<img src="${src}" style="position: absolute; width: 100%; transform: translate(${imgOffsetX}%, ${imgOffsetY}%);"/>`
    })

    success(`<div style="position: relative; overflow: hidden; padding-top: ${h / w * 100}%;"><div style="position: absolute; left: 0px; top: 0px; height: 100%; width: ${aw / w * 100}%;">${imgs}</div>
  </div>`)
  })
}
