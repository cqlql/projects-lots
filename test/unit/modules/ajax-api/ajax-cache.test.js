import AjaxCache from '@/modules/ajax-api/ajax-cache.js'

// mock
const axios = {
  get (url) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          data: null
        })
      }, 1000)
    })
  }
}

test('ajax-cache', async function () {
  let ajaxCache = new AjaxCache(function () {
    return axios.get('/Power/GetClassesInGrades')
  })

  let d = await ajaxCache.request()
  expect(d.data).toEqual(null)

})
