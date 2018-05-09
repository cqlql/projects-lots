/* eslint-disable */
function correct (num) {
  // 这是另一个验证正则备份
  // var reg = /^\d*\.{0,1}\d{0,2}$/;

  num = num.replace(/\.+/g, '')

  if (num > 99) {
    num = 99 + ''
  }
  console.log(num)

  // // 限制只有一个小数点
  // var index = num.indexOf('.')
  // if (index > -1) {
  //   var pre = num.substr(0, index + 1)
  //   var next = num.substr(index + 1)
  //   num = pre + next.replace(/\.\d*/g, '')
  // }
  //
  // // 限制只有2位小数
  // num = num.replace(/(\.\d{2})\d+/, '$1')

  return num
}

export default {
  install (Vue) {
    Vue.directive('input-number', {
      inserted: function (el, binding, vnode) {
        let input = vnode.__inputNumber = function () {
          el.value = correct(el.value)
        }
        el.addEventListener('input', input)
      },
      unbind (el, binding, vnode) {
        el.removeEventListener('input', vnode.__inputNumber)
      }
    })
  }
}
