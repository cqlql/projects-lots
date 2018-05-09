/**
 * 字母转换
 * Created by cql on 2017/4/20.
 */

// 索引转大写
export function toLetter (index) {
  return String.fromCharCode(index * 1 + 65)
}
// 索引转小写
export function toLowerLetter (index) {
  return String.fromCharCode(index * 1 + 97)
}
// 大写字母转索引
export function letterToIndex (letter) {
  return letter.charCodeAt() - 65
}
