import axios from 'axios'
import Ajax from './ajax'
// import AjaxApp from './app'
import answer from '@/views/ques/com/answer'

var CancelToken = axios.CancelToken

// let Ajax = AjaxApp
// if (process.env.NODE_ENV !== 'production') {
//   Ajax = window.AjaxWeb
// }

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
  submit () {
    console.log('提交的数据', answer.submit)
    return ajax.post('/Data/Submit', {
      userId: this.userId,
      userName: this.userName,
      examId: answer.examId,
      results: answer.submit,
      campusId: '4973983044197569754'
    })
  },
  // async fileUpload ({ file, onProgress }) {
  //   // 模拟
  //   for (let i = 4; i--;) {
  //     await new Promise((resolve) => {
  //       onProgress(100 - ~~(i / 4 * 90))
  //       setTimeout(() => {
  //         resolve()
  //       }, 500)
  //     })
  //   }

  //   let src = await new Promise(resolve => {
  //     var fileReader = new FileReader()
  //     // 文件读取 完后触发
  //     fileReader.onload = function (e) {
  //       resolve(e.target.result)
  //     }
  //     // 文件读取为 DataURL，base64
  //     fileReader.readAsDataURL(file)
  //   })
  //   return src
  // }
  async fileUpload ({ file, onProgress, cancelToken }) {
    let fd = new FormData()
    fd.append('file', file)
    let d = await ajax.post('/Mccard/ClassBrand/UploadImage', fd, {
      onUploadProgress: e => {
        if (e.lengthComputable) {
          onProgress((e.loaded / e.total).toFixed(1))
        }
      },
      hasLoading: false,
      cancelToken: new CancelToken(cancelToken)
    })

    // let dataUrl = await new Promise(resolve => {
    //   var fileReader = new FileReader()
    //   // 文件读取 完后触发
    //   fileReader.onload = function (e) {
    //     resolve(e.target.result)
    //   }
    //   // 文件读取为 DataURL，base64
    //   fileReader.readAsDataURL(file)
    // })

    return d.Url
  }
}

export default api
