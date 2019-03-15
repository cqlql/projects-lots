/**
 * 图片尺寸 就绪 回调
 * 此时 图片只在加载中，但尺寸已就绪
 *
 * 参数：
 * 1、图片url
 * 2、就绪后 执行的函数。传入一个参数，格式：{w:0,h:0,img:img}
 *
 * 兼容性：所有
 */
// 旧版
// export default function imgSizeComplete (src, f, err) {
//   let img = new Image()
//   let iserror = false

//   function tryExcu () {
//     if (iserror) return
//     if (img.complete || img.width) {
//       f(img)
//       return
//     }

//     setTimeout(tryExcu, 100)
//   }

//   img.onerror = function () {
//     err && err(img)
//     iserror = true
//   }

//   img.src = src

//   tryExcu()
// }

export default function (src) {
  let img = new Image()
  let iserror = false

  return new Promise(function (resolve, reject) {
    function tryExcu () {
      if (iserror) return
      if (img.complete || img.width) {
        resolve(img)
        return
      }

      setTimeout(tryExcu, 100)
    }

    img.onerror = function (err) {
      reject(err)
      iserror = true
    }

    img.src = src

    tryExcu()
  })
}
