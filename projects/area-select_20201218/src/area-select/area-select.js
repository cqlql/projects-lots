// ！！直接 js 方式使用，待实现！！

import Vue from 'vue'
import AreaSelectComp from './AreaSelectBase.vue'

export default class AreaSelect {
  areaSelect = null // 组件实例
  isShow = false

  init () {
    const areaSelect = new Vue({
      render: h => h(AreaSelectComp, {
        attrs: {
          get: this.getRegionList
        }
      })
    }).$mount()
    document.body.appendChild(areaSelect.$el)
  }

  show () {
    const { areaSelect } = this
    if (areaSelect === null) {
      this.init()
    }
  }

  hide () {}
  change () {}
  destroy () {}

  getRegionList (id = '1') {
    console.log('请求')
    return new Promise((resolve, reject) => {
      resolve([])
    })
  }
}
