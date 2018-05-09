import wx from 'weixin-js-sdk'
import app_g from "@/global"
import Queue from './wxConfigInitQueue'
let isInit = false
let isLoad = false
const queue = new Queue()
export default function (cb) {
  return new Promise((resolve, reject) => {
    if (isInit) {
      cb()
      return
    }
    queue.add(cb)
    if (isLoad) {
      return
    }
    isLoad = true
    this.$ajax(app_g.api.api_102, {
      method: 'post',
      data: this.GetSign()
    }).then(res => {
      if (res.data.Basis.State == 200) {
        wx.config(eval(`(${res.data.Result})`))
        isInit = true
        queue.excu()
        resolve()
      } else {
        queue.clear()
        reject(new Error(res.data.Basis.Msg))
      }
    }).catch(e => {
      queue.clear()
      reject(e)
    }).then(() => {
      isLoad = false
    })
  })
}
