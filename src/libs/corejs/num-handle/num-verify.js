/**
 * 数字输入强制纠正：最多2位小数
 *
 * 目前未被使用，使用时需重新命名
 * */
function numberCorrect (num) {
  // 这是另一个验证正则备份
  // var reg = /^\d*\.{0,1}\d{0,2}$/;

  num = num.replace(/\.+/g, '.')

  // 限制只有一个小数点
  var index = num.indexOf('.')
  if (index > -1) {
    var pre = num.substr(0, index + 1)
    var next = num.substr(index + 1)
    num = pre + next.replace(/\.\d*/g, '')
  }

  // 限制只有2位小数
  num = num.replace(/(\.\d{2})\d+/, '$1')

  return num
}
