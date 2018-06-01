function imageParse ({ point, links, success }) {
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
    return point / 26.667 * 2.8346
  }

  function getXYWH ({ start_x: startX, start_y: startY, end_x: endX, end_y: endY }) {
    return {
      x: pointToPx(startX),
      y: pointToPx(startY),
      w: pointToPx(endX - startX),
      h: pointToPx(endY - startY)
    }
  }
  imgComplete(links[0], function (img) {
    // 图片原始高宽
    let imgW = img.width
    let imgH = img.height

    const options = getXYWH(point)
    options.urls = links
    options.imgW = imgW
    options.imgH = imgH
    success(buildHtml(options))
  })
}

function buildHtml ({imgW, imgH, x, y, w, h, urls}) {
  let imgOffsetX = -x / imgW * 100
  let imgOffsetY = -y / imgH * 100

  let imgs = ''
  urls.forEach(src => {
    imgs += `<img src="${src}" style="position:absolute;width:100%;height:100%;transform:translate(${imgOffsetX}%,${imgOffsetY}%);"/>`
  })

  return `<div style="position:relative;overflow:hidden;padding-top:${h / w * 100}%;"><div style="position:absolute;left:0px;top:0px;height:${imgH / h * 100}%;width:${imgW / w * 100}%;">${imgs}</div></div>`
}

imageParse.fixedSizeParse = function ({ point, links, success }) {
  // 图片原始高宽
  let imgW = 156
  let imgH = 217

  function getXYWH ({ start_x: startX, start_y: startY, end_x: endX, end_y: endY }) {
    return {
      x: startX % imgW,
      y: startY % imgH,
      w: endX - startX,
      h: endY - startY
    }
  }

  const options = getXYWH(point)
  console.log(options)

  options.urls = links
  options.imgW = imgW
  options.imgH = imgH

  success(buildHtml(options))
}

export default imageParse
