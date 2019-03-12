import AjaxCache from '@/modules/ajax-api/ajax-cache.js'

describe('ajax-cache', function () {
  let count = 0 // 请求次数
  // mock
  const axios = {
    get (url) {
      count++
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({
            data: null
          })
        }, 1000)
      })
    }
  }

  test('结果测试，请求次数测试，缓存测试', function () {
    let ajaxCache = new AjaxCache(function () {
      return axios.get('/Power/GetClassesInGrades')
    })
    let d1
    ajaxCache.request().then(d => {
      d1 = d
      expect(d.data).toEqual(null)
    })

    let d2
    // 请求2。并发调用。不应该再次走真实请求。所以 count 必须为 1
    ajaxCache.request().then(d => {
      d2 = d
      expect(d === d1).toEqual(true) // 确保拿的是缓存
    })
    // 请求3。并发调用
    ajaxCache.request().then(d => {
      expect(d === d2).toEqual(true) // 确保拿的是缓存
    })
    expect(count).toEqual(1)
  })

  test('是否拿的缓存2', async function () {
    let ajaxCache = new AjaxCache(function () {
      return axios.get('/Power/GetClassesInGrades')
    })
    let d = await ajaxCache.request()
    expect(d.data).toEqual(null)

    let d2 = await ajaxCache.request() // 走缓存
    expect(d === d2).toEqual(true)
  })
})
