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

test('ajax-cache', function () {
  let ajaxCache = new AjaxCache(function () {
    return axios.get('/Power/GetClassesInGrades')
  })
  return ajaxCache.request().then(d => {
    expect(d.data).toEqual(null);
  })
})
