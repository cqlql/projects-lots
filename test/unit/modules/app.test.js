import Vue from 'vue'
import Ajax from '@/utils/ajax-api/app'

Vue.loading = {
  show () {
    console.log('loading', '显示')
  },
  hide () {
    console.log('loading', '隐藏')
  },
}
Vue.toast = msg => {
  console.log('消息', msg.message || msg)
}

describe('app-proxy', function () {
  it('post 成功。不定制数据', function (done) {
    // 模拟 app 数据返回
    window.NativeJsFunQues = {
      CommonMethod (url, method, data, callBackName) {
        expect(method).toBe('POST')
        setTimeout(function () {
          window[callBackName]({
            status: 200,
            result: {
              id: '10086'
            }
          })
          expect(window[callBackName]).toBeUndefined()
        }, 600)
      }
    }

    const ajaxGo = new Ajax()
    ajaxGo.post().then(d => {
      expect(d.id).toBe('10086')
      done()
    })
  })
  it('post 成功。定制数据', function (done) {
    // 模拟 app 数据返回
    window.NativeJsFunQues = {
      CommonMethod (url, method, data, callBackName) {
        expect(method).toBe('POST')
        setTimeout(function () {
          window[callBackName]({
            code: 0,
            d: {
              id: '10086'
            },
            message: '数据生成失败'
          })
          expect(window[callBackName]).toBeUndefined()
        }, 600)
      }
    }

    const ajaxGo = new Ajax(function (data) {
      if (data.code === 0) {
        return data.d
      }
      return new Error(data.message)
    })
    ajaxGo.post().then(d => {
      expect(d.id).toBe('10086')
      done()
    })
  })
  it('post app native 请求超时', function (done) {
    // 模拟 app 数据返回
    let callBackName
    window.NativeJsFunQues = {
      CommonMethod (url, method, data, $callBackName) {
        callBackName = $callBackName
      }
    }

    const ajaxGo = new Ajax(function (data) {
      if (data.code === 0) {
        return data.d
      }
      return new Error(data.message)
    })
    ajaxGo.post().catch(e => {
      expect(e.message).toBe('native 请求超时')
      expect(window[callBackName]).toBeUndefined()
      done()
    })
  }, 7000)
  it('post app 响应超时', function (done) {
    // 模拟 app 数据返回
    window.NativeJsFunQues = undefined
    const ajaxGo = new Ajax()
    ajaxGo.post().catch(e => {
      expect(e.message).toBe('请求超时')
      done()
    })
  }, 7000)
})
