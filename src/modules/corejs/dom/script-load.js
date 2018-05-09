/**
 * 外链 script 加载执行
 * 目前不考虑 ie9 以下
 * */

/**
 * @param string src 链接
 * @param object [config] 配置
 */
export default function scriptLoad (src, { charset = 'utf-8' } = {}) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = charset
    script.src = src
    script.onload = function () {
      resolve(script)
      script.remove()
    }
    script.onerror = function () {
      reject(new Error('js 加载失败'))
      script.remove()
    }
    document.head.appendChild(script)
  })
}
