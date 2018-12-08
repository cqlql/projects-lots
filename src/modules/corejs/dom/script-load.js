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

// 兼容ie 版本
// let PromiseSimple = window.Promise

// if (PromiseSimple) {
//   PromiseSimple = function (init) {
//     init(data => this.resolve(data), error => this.reject(error))
//     this.successExec = () => { }
//     this.errorExec = () => { }
//   }
//   PromiseSimple.prototype.resolve = function (data) {
//     this.successExec(data)
//   }
//   PromiseSimple.prototype.reject = function (error) {
//     this.errorExec(error)
//   }
//   PromiseSimple.prototype.then = function (successExec) {
//     this.successExec = successExec
//     return this
//   }
//   PromiseSimple.prototype.catch = function (errorExec) {
//     this.errorExec = errorExec
//     return this
//   }
// }

// function scriptLoad ({ src, success = () => { }, error = () => { }, complete = () => { }, charset = 'utf-8' }) {
//   let script = document.createElement('script')
//   script.type = 'text/javascript'
//   script.charset = charset
//   script.src = src
//   if ('onload' in script) {
//     script.onload = function () {
//       success()
//       complete()
//       script.remove()
//     }
//     script.onerror = function () {
//       error(new Error('js 加载失败'))
//       complete()
//       script.remove()
//     }
//   } else { // ie 情况
//     script.attachEvent('onreadystatechange', function () {
//       if (script.readyState === 'complete' || script.readyState === 'loaded') {
//         success()
//         complete()
//       }
//     })
//   }
//   (document.head || document.body).appendChild(script)
// }

// export default function (src, { charset } = {}) {
//   return new Promise(function (resolve, reject) {
//     scriptLoad({
//       src,
//       charset,
//       success: resolve,
//       error: reject
//     })
//   })
// }

// 依次加载多个 js
// function load (urls, success, error) {
//   function excu () {
//     let url = urls.shift()
//     if (url) {
//       scriptLoad({
//         src: url,
//         success: excu,
//         error
//       })
//     } else {
//       success()
//     }
//   }
//   excu()
// }

// load([
//   'http://p2y63v1s4.bkt.clouddn.com/vue/2.5.13/vue.min.js',
//   'http://p2y63v1s4.bkt.clouddn.com/vue-router/3.0.1/vue-router.min.js'
// ], function () {

// })
