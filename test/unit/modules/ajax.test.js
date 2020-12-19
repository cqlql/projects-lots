import Vue from 'vue'
import axios from 'axios'
import Ajax from '@/libs/ajax-api/ajax'

Vue.loading = {
  show () {
    console.log('loading', '显示')
  },
  hide () {
    console.log('loading', '隐藏')
  },
}
Vue.toast = msg => {
  console.log('消息', msg.message)
}

describe('ajax', function () {
  it('post 成功', function(done) {
    // 模拟 axios
    axios.post = function () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
            data: {
              status: 200,
              result: {
                id: '10086'
              }
            }
          })
        }, 300)
      })
    }
    const ajax = new Ajax()
    ajax.post().then(d => {
      expect(d.id).toBe('10086')
      done()
    })
  })

  it('post 失败', function(done) {
    // 模拟 axios
    axios.post = function () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
            data: {
              status: 100,
              result: {
                id: '10086'
              },
              message: '请求失败'
            }
          })
        }, 300)
      })
    }
    const ajax = new Ajax()
    ajax.post().catch(error => {
      done()
    })
  })

  it('post 定制数据状态', function(done) {
    // 模拟 axios
    axios.post = function () {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve({
            data: {
              code: 0,
              data: {
                id: '10000'
              },
              message: '请求失败'
            }
          })
        }, 300)
      })
    }
    const ajax = new Ajax(data => {
      if (data.code === 0) {
        return data.data
      } else {
        return new Error(data.message)
      }
    })
    ajax.post().then(data => {
      expect(data.id).toBe('10000')
      done()
    })
  })
})
