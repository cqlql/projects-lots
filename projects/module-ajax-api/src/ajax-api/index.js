
import ajax, {ajaxLogin} from './ajax'

const api = {
  token: '',
  // userId: '',
  // userName: '',
  login () {
    return ajaxLogin.post('/comm/v1/token', {
      account: '466893', // userId
      password: '123456' // pwd
    })
  },
  async getExam (id) {
    // let token = this.token
    if (!this.token) {
      let info = await this.login()
      ajax.token = this.token = info.token
    }
    // console.log({"code":0,"message":"ok","result":{"token":"bac47191-1d43-441a-a9b6-f4edb3e80e38","uid":"466893","username":"王锐","role":0}})

    let data = await ajax.get('/pi/v1/exams/do?exam_id=' + id)
    return data.data
  }
  // submit () {
  //   return ajax.post('/Data/Submit', {
  //     userId: this.userId,
  //     userName: this.userName,
  //     examId: answer.examId,
  //     results: answer.submit,
  //     campusId: '4973983044197569754'
  //   })
  // }
}

export default api
