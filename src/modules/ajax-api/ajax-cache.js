import QueueWait from '@/queue/queue-wait'

class AjaxCache {
  constructor (axios) {
    this.cache = null
    this.axios = axios
    this.isLoading = false
    this.queueWait = new QueueWait()
  }
  get () {
    const { cache, queueWait, axios } = this
    // 缓存情况
    if (cache) {
      return new Promise(function (resolve) {
        resolve(cache)
      })
    }
    // 加载中情况
    if (this.isLoading) {
      return new Promise(function (resolve) {
        queueWait.add(resolve)
      })
    }

    this.isLoading = true
    return axios().then(data => {
      this.isLoading = false
      this.cache = data
      queueWait.excu(data)
      return data
    }).catch(e => {
      queueWait.clear()
      this.isLoading = false
      return Promise.reject(e)
    })
  }
}

export default function (axios) {
  const ajaxCache = new AjaxCache(axios)
  function get () {
    return ajaxCache.get()
  }

  return get
}
