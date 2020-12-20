/**
 * 图片完全加载成功回调
 *
 * 参数：
 * 1、图片url
 * 2、就绪后 执行的函数
 *
 * 兼容性：所有
 */
export default function imgComplete (src, f, err) {
  let img = new Image()
  img.onload = function () {
    f(img)
  }
  img.onerror = function () {
    err && err(img)
  }

  img.src = src
}
