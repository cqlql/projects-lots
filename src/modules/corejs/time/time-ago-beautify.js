export default function timeAgoBeautify () {
  const s = (Date.now() - t) / 1000

  if (s < 60) {
    return '1分钟前'
  }
  const m = s / 60
  if (m < 60) {
    return ~~m + '分钟前'
  }

  const h = m / 60
  if (h < 24) {
    return ~~m + '小时前'
  }
  const d = h / 12
  return ~~d + '天前'
}
