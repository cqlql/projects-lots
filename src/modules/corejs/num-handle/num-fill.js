/**
 * 数位补0
 * */
export default function numfill (number, len = 2) {
  if (len === 2) { // 处理2位
    if (number < 10) {
      return '0' + number
    }
  } else {
    number = '' + number
    let num = len - number.length
    if (num > 0) {
      return new Array(num + 1).join('0') + number
    }
  }
  return number
}
