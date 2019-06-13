// import load from './load'
// export default function (urls) {
//   return new Promise((resolve, reject) => {
//     let i = 0
//     function excu () {
//       let url = urls[i]
//       if (url === undefined) {
//         // 完成
//         resolve()
//         return
//       }
//       load(urls[i]).then(() => {
//         // 加载失败这里将不会执行
//         i++
//         excu()
//       })
//     }
//     excu()
//   })
// }

import QueueWait from '@/modules/corejs/queue/queue-wait'

export default class LoadOnce {
  isComplete = false
  private isLoad = false
  private result!: any
  private queueWait = new QueueWait()

  async load (load: () => Promise<any>) {
    if (this.isLoad) {
      return new Promise(resolve => {
        this.queueWait.add(resolve)
      })
    }
    if (this.isComplete) return this.result
    this.isLoad = true
    let result = this.result = await load()
    // 注意，这里第一次的请求反而是最后执行的。如果有特殊要求，给 queueWait.excu(result) 加上定时器，如下
    setTimeout(() => { this.queueWait.excu(result) }, 1)
    return result
  }
}
