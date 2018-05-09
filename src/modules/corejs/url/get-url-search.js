/**
 * getUrlSearch
 * 取 url search 参数值
 *
 * @param search 可以为null，此时也将返回null
 * @return 没有返回null
 * */
export default function (name, search) {
  let reg = new RegExp(name + '=([^&]+)')
  let match = reg.exec(search)

  if (match) {
    return match[1]
  }
  return match
}
