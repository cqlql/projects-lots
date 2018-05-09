// getAreaById
import idConvert from './id-convert'
import getProvinceById from './get-province-by-id'
import find from './find'
import {cities, counties} from '../../data/areas.js'

/**
 * @param id string 比如 '540101'
 *
 * @return string 如 '广东深圳'
 * */
export default function (id, separator = '') {
  let idArr = idConvert(id)
  let {0: provinceId, 1: cityId, 2: countieId} = idArr
  let provinceName = getProvinceById(provinceId).name
  let cityName = cityId ? separator + find(cities[provinceId], cityId).name : ''
  let countieName = countieId ? separator + find(counties[cityId], countieId).name : ''

  return provinceName + cityName + countieName
}
