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

  // 如果不增加到 dom 中，ios 取到的高宽是反的
  // img.style.display = 'none' // none 也不行
  // 在 onload 事件获取也不行
  // 所以只能 dom 中
  // 而且只要从dom中一删除，立马又恢复反的了
  // canvas 问题：被旋转的图片画到 canvas 上，即使增加到 dom 中也是反的，只能通过其他方式解决，见下面的注释
  let box = document.createElement('div')
  box.appendChild(img)
  let { style } = box
  style.width = style.height = 0
  style.overflow = 'hidden'
  document.body.append(box)

  let iserror = false

  return new Promise(function (resolve, reject) {
    function tryExcu () {
      if (iserror) return
      if (img.complete || img.width) {
        let { width, height } = img
        box.remove()
        resolve({
          width: width,
          height: height,
          rotate: width !== img.width // 是否被旋转变形。变形修复可反转高宽，然后使用 canvas 重新生成图片数据修正(注意这不是彻底旋转修复，只是修复变形问题，彻底修复需使用 exif-js)
        })
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
