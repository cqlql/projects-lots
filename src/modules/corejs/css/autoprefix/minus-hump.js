/**
 * 减号转驼峰
 *
 * @param {string} word 减号开头，返回值将会首字母大写。
 * @return {string} 首字母小写的驼峰格式字符串，如果参数 word 减号开头，返回值将会首字母大写。
 *
 *
 * */

export default function (word) {
  // let w = word.replace(/^-/, '') // 去掉头部减号
  return word.replace(/-\w/g, function (d) {
    return d[1].toUpperCase()
  })
}
