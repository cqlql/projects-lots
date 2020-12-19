// 字符串长度。英文占1位，中文2位
export default function (s) {
  return s.length + (s.match(/[^\x20-\xff]/g) || '').length
}
