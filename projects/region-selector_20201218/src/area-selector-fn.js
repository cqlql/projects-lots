import Vue from 'vue'
import AreaSelectorComp from './AreaSelector.vue'

export default class AreaSelectorFn {
  areaSelector = null // 组件实例
  isShow = false
  // constructor () {
  //   this.areaSelector = null // 组件实例
  //   this.isShow = false
  // }

  init () {
    const AreaSelector = Vue.extend(AreaSelectorComp)
    const areaSelector = new AreaSelector().$mount()
    this.areaSelector = areaSelector
    // areaSelector.$props.get = getRegionList
    console.log(areaSelector)
    document.body.appendChild(areaSelector.$el)
  }

  show () {
    const { areaSelector } = this
    console.log(areaSelector)
    if (areaSelector === null) {
      this.init()
    }
  }

  hide () {}
  change () {

  }

  destroy () {

  }
}
