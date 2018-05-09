let slideSelect = {
  loadSlideSelect () {
    let {slideSelect} = this
    if (slideSelect) {
      return new Promise(function (resolve) {
        resolve(slideSelect)
      })
    }
    return import(/* webpackChunkName: "SlideSelect" */ './slide-select-popup').then(({default: SlideSelect}) => {
      slideSelect = this.slideSelect
      if (slideSelect) {
        return slideSelect
      }

      slideSelect = this.slideSelect = new SlideSelect()
      return slideSelect
    })
  },
  // loadAreaData (options) {
  //   return import(/* webpackChunkName: "SlideSelect" */ './area-data').then(({default: AreaData}) => {
  //     let areaData = this.areaData || new AreaData()
  //
  //     // 过滤处理
  //     let {idsIgnore} = options
  //     if (idsIgnore) {
  //       idsIgnore.forEach(id => {
  //         id += ''
  //         if (id.length === 2) {
  //           areaData.provinceIgnore[id] = true
  //         } else if (id.length === 4) {
  //           areaData.cityIgnore[id] = true
  //         } else if (id.length === 6) {
  //           areaData.countyIgnore[id] = true
  //         }
  //       })
  //     }
  //     this.areaData = areaData
  //     return areaData
  //   })
  // },
  // loadAreaSelect: async function (options = {}) {
  //   let slideSelect = await this.loadSlideSelect()
  //   let areaData = await this.loadAreaData({
  //     idsIgnore: options.idsIgnore
  //   })
  //   return {slideSelect, areaData}
  // },
  slideSelect: null
  // areaData: null
}
export default {
  install (Vue) {
    Vue.prototype.$slideSelect = slideSelect
  }
}
