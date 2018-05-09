/**
 * each - 弃用
 * 兼容对象+数组
 *
 * */
/*
// 备份。循环对象专用
each (obj, fn) {
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
  }
}
*/
export default function each (obj, fn) {
  var key
  let len = obj.length

  if (len === undefined) {
    for (key in obj) {
      if (fn(key, obj[key]) === false) {
        break
      }
    }
  } else {
    for (key = 0; key < len; key++) {
      if (fn(key, obj[key], len) === false) {
        break
      }
    }
  }
}
