import QueueWait from '@/modules/corejs/queue/queue-wait'
import loadJs from '@/modules/corejs/dom/script-load'
const names = {
  // 'ck': 1 // 0/undefined 失败 1 加载中 2 加载成功过
}
const queues = {}

export default function (url) {
  // 加载成功过
  if (names[url] === 2) {
    return new Promise(function (resolve) {
      resolve()
    })
  }

  // 加载中
  if (names[url] === 1) {
    return new Promise(function (resolve) {
      queues[url].add(resolve)
    })
  }
  names[url] = 1
  queues[url] = new QueueWait()
  return loadJs(url).then(data => {
    names[url] = 2
    queues[url].excu(data)
    delete queues[url]
  }).catch(() => {
    names[url] = 0
  })
}
