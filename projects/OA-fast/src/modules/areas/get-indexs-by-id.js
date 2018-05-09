// getIndexsById
import idConvert from './id-convert'
import find from './find-index'
import {cities, counties, provinceIds} from '../../data/areas.js'

/**
 * @param id string 比如 '540101'
 *
 * @return array 如 [1, 0]
 * */
export default function (id) {
  let idArr = idConvert(id)
  let {0: provinceId, 1: cityId, 2: countieId} = idArr
  let indexs = []
  indexs.push(provinceIds[provinceId])
  if (cityId) {
    indexs.push(find(cities[provinceId], cityId))
  }
  if (countieId) {
    indexs.push(find(counties[cityId], countieId))
  }

  return indexs
}
