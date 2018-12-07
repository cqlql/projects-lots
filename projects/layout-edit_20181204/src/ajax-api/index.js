import Ajax from './ajax'
// import AjaxApp from './app'

const ajax = new Ajax(function (data) {
  if (data.code === 0) {
    return data.data
  }
  return new Error(data.message)
})
const ajaxGo = new Ajax(function (data) {
  if (data.code === 0) {
    return data.result
  }
  return new Error(data.message)
})

const api = {
  token: '',
  userId: '',
  userName: '',
  login (data) {
    return ajaxGo.post('/comm/v1/token', data)
  },
  getExam (data) {
    return ajax.post('/Data/GetExam', data)
  },
  fileUpload () {
    return new Promise(function (resolve) {
      resolve('https://www.baidu.com/img/baidu_jgylogo3.gif')
    })
  }
}

export default api
