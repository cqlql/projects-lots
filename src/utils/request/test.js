/* eslint-env jest, mocha */
import axios from '@/ajax/ajax.mock.js'
import AjaxCache from '@/ajax/ajax-cache.js'

describe('ajax', function () {
  it('ajax-cache', function (done) {
    let getClassId = AjaxCache(function (succees) {
      // 此处只能执行一次
      return axios.once.post('/Mccard/ClassBrand/GetGroupEditModel').then(({ data }) => {
        if (data.code === 0) {
          let classId = data.data.id
          if (classId) {
            return classId
          }
        }
        return Promise.reject(new Error('classId 获取失败'))
      })
    })

    async function all () {
      await getClassId().then(d => {
        console.log('1成功', d)
      })
      await getClassId().then(d => {
        console.log('2成功', d)
      })
      await getClassId().then(d => {
        console.log('3成功', d)
      })

      done()
    }
    all()
  })
  it('ajax-cache 获取失败情况', function (done) {
    let getClassId = AjaxCache(function (succees) {
      // 此处只能执行一次
      return axios.once.post('/Mccard/ClassBrand/GetGroupEditModel').then(({ data }) => {
        if (data.code === 1) {
          let classId = data.data.id
          if (classId) {
            return classId
          }
        }
        return Promise.reject(new Error('classId 获取失败'))
      })
    })

    async function all () {
      await getClassId()
    }
    all().catch(e => {
      done()
    })
  })
})
