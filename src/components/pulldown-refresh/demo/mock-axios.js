
import getMockList from '@/components/bottom-load/demo/mock-data.js'
const useList = getMockList()
const axios = {
  get (url) {
    const page = /page=([^&]+)/.exec(url)[1]
    const nodata = /nodata=([^&]+)/.exec(url)[1]
    const onepage = /onepage=([^&]+)/.exec(url)[1]
    console.log(url)
    return new Promise(function (resolve) {
      setTimeout(function () {
        if (nodata === 'true') {
          resolve([])
          return
        }
        if (onepage === 'true') {
          resolve(useList[2])
          return
        }
        resolve(useList[page - 1] || [])
      }, 1000)
    })
  }
}
export default axios
