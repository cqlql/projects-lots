
// import { provinces, cities, counties } from './areas'

function getAreasData () {
  return import(/* webpackChunkName: "areas" */ './areas')
}

const areaSelect = {
  getProvinces () {
    // return provinces
    return getAreasData().then(({ provinces }) => {
      return provinces
    })
  },
  getCities (provinceId) {
    // return cities[provinceId] || []
    return getAreasData().then(({ cities }) => {
      return cities[provinceId] || []
    })
  },
  getCounties (cityId) {
    // return counties[cityId] || []
    return getAreasData().then(({ counties }) => {
      return counties[cityId] || []
    })
  }
}

export default areaSelect
