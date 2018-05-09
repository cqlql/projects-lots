export default function (obj) {
  let data = ''
  fn(obj)
  return data.substr(1)

  function fn (obj, name) {
    for (let key in obj) {
      let val = obj[key]
      let newName = name ? name + '[' + key + ']' : key
      if (val instanceof Array || val instanceof Object) {
        fn(val, newName)
      } else {
        data += '&' + newName + '=' + encodeURIComponent(val)
      }
    }
  }
}
