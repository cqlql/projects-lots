export default class {
  constructor () {
    this.initSelectIndex = [0, 1]

    // 是否开启可选
    this.optionalCity = false
    this.optionalCounty = false

    this.provinceIgnore = {}
    this.cityIgnore = {}
    this.countyIgnore = {}
  }

  init (slideSelect, success = () => {}) {
    let selectIndexs = this.indexs = this.selectIndexs || this.initSelectIndex
    this.slideSelect = slideSelect
    let data = this.data = [[], [], []]

    slideSelect.setData(data)
    slideSelect.setTits(['地区选择'])
    this.isLoad = true
    import(/* webpackChunkName: "areas" */ '../../../data/areas.js').then(areasData => {
      let {provinceIgnore} = this
      let {provinces, cities, counties} = areasData

      let selectData = data[0]
      let newProvinces = []
      provinces.forEach(function (d) {
        if (!provinceIgnore[d.id]) {
          selectData.push(d.name)
          newProvinces.push(d)
        }
      })
      this.areasData = {
        provinces: newProvinces,
        cities,
        counties
      }
      slideSelect.setData(selectData, 0)

      slideSelect.select(selectIndexs)
      this.setCityData()

      this.updateInfo()
      this.isLoad = false
      success()
    })
  }

  /* onlyOnce () {
    let {init} = this
    this.init = function () {
      this.init = function (s, success = () => {}) {
        success()
      }
      init.apply(this, arguments)
    }
  } */

  setCityData () {
    let {slideSelect, cityIgnore} = this
    let {provinces, cities} = this.areasData
    let {sels} = slideSelect
    let selIndex = sels[0].currIndex
    let cityList = cities[provinces[selIndex].id] || [{
      id: 0,
      name: '空'
    }]
    if (this.optionalCity && cityList[0].id !== 0) {
      cityList.unshift({
        id: 0,
        name: '不选'
      })
    }
    let selectData = this.data[1] = []
    let newCityList = []
    cityList.forEach(function (d) {
      if (!cityIgnore[d.id]) {
        selectData.push(d.name)
        newCityList.push(d)
      }
    })
    slideSelect.setData(selectData, 1)

    this.currCityList = newCityList

    this.setCountyData()
  }

  setCountyData () {
    let {slideSelect, countyIgnore} = this
    let {sels} = slideSelect
    let cityData = this.currCityList[sels[1].currIndex]
    let {counties} = this.areasData
    let countyList = counties[cityData.id] || [{
      id: 0,
      name: '空'
    }]
    if (this.optionalCounty && countyList[0].id !== 0) {
      countyList.unshift({
        id: 0,
        name: '不选'
      })
    }
    let selectData = this.data[2] = []
    let newcountyList = []
    countyList.forEach(function (d) {
      if (!countyIgnore[d.id]) {
        newcountyList.push(d)
        selectData.push(d.name)
      }
    })
    slideSelect.setData(selectData, 2)

    this.currCountyList = newcountyList
  }

  onChange (i) {
    // 联动
    if (i === 0) {
      this.setCityData()
    } else if (i === 1) {
      this.setCountyData()
    }

    this.updateInfo()
  }

  onClose () {}

  onSelect () {
    this.selectIndexs = this.indexs
  }

  select (indexs) {
    let {slideSelect} = this
    slideSelect.select(indexs)
    this.setCityData()
    this.updateInfo()
    this.selectIndexs = indexs
  }

  selectById (id) {
    import(/* webpackChunkName: "areas" */ '../../areas/get-indexs-by-id.js').then(({default: getIndexsById}) => {
      // let indexs = getIndexsById(id)
      this.select(getIndexsById(id))
    })
  }

  updateInfo () {
    let {slideSelect, data} = this
    let {sels} = slideSelect

    let indexs = this.indexs = []
    let result = this.result = []

    for (let i = 0, len = data.length; i < len; i++) {
      let index = sels[i].currIndex
      let name = data[i][index]
      if (/(空|不选)/.test(name)) {
        continue
      }
      result.push(name)
      indexs.push(index)
    }

    this.resultTxt = slideSelect.elInfo.textContent = result.join('-')
  }
}
