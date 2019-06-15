import QueueWait from '@/modules/corejs/queue/queue-wait.ts'

export default class LoadOnce {
  isComplete = false
  private isLoad = false
  private result!: any
  private queueWait = new QueueWait()

  load (load: () => Promise<any>) {
    if (this.isLoad) {
      return new Promise(resolve => {
        this.queueWait.add(resolve)
      })
    }
    if (this.isComplete) {
      return new Promise(resolve => {
        resolve(this.result)
      })
    }
    this.isLoad = true
    return new Promise(resolve => {
      load().then(result => {
        this.isLoad = false
        this.isComplete = true
        this.result = result
        resolve(this.result) // 保证第一次先执行
        this.queueWait.excu(result) // 执行剩下队列
      })
    })
    // 保证第一次先执行 async funtion  定时器方案，不可取
    // let result = this.result = await load()
    // // 注意，这里第一次的请求反而是最后执行的。如果有特殊要求，给 queueWait.excu(result) 加上定时器，如下
    // setTimeout(() => { this.queueWait.excu(result) }, 1)
    // return result
  }
}
