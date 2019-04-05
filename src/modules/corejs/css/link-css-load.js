/**
 * 外链 script 加载执行
 * 目前不考虑 ie9 以下
 * */

/**
 * @param string src 链接
 * @param object [config] 配置
 */
export default function (href) {
  return new Promise(function (resolve, reject) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = href
    link.onload = function () {
      resolve(link)
    }
    link.onerror = function () {
      reject(new Error('css 文件加载失败'))
      link.remove()
    }
    document.head.appendChild(link)
  })
}
