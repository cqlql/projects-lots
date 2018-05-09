/**
 * url 查询参数转对象
 *
 * @param search string
 *
 * @return object json对象。
 *  传空字符串返回空对象 '' -> {}
 *  传没有值的参数 q&test -> {q:undefined,sdfsdf:undefined}
 *
 * @example
 * searchParams('q=URL&test=222')
 * searchParams('?q=URL&test=222')
 * */
export default function searchParamParse (search) {
  let json = {}
  search = search.replace(/^\?/, '')
  if (search) {
    search.split('&').forEach(kv => {
      let kvs = kv.split('=')
      json[kvs[0]] = kvs[1]
    })
  }
  return json
}
