/**
 * json 对象 -> search params
 **/
export default function (obj) {
  let data = ''
  fn(obj)
  return data.substr(1)

  function fn (obj, name) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let val = obj[key]
        let newName = name ? name + '[' + key + ']' : key
        if (val instanceof Array || val instanceof Object) {
          fn(val, newName)
        } else {
          if (val === undefined || val === null) continue // 跳过 undefined 和 null
          data += '&' + newName + '=' + encodeURIComponent(val)
        }
      }
    }
  }
}
