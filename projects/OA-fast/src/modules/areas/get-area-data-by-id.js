// getAreaDataById
import idConvert from './id-convert'
import find from './find'
import {cities, counties, provinces} from '../../data/areas.js'

/**
 * @param id string 比如 '1301'
 *
 * @return array 如 [{id:13,name:"河北省",tag:"冀",isMunicipalities:false},{id:1301,name:"石家庄市"}];
 * */
export default function (id) {
  let idArr = idConvert(id)
  let {0: provinceId, 1: cityId, 2: countieId} = idArr
  let data = []
  data.push(find(provinces, provinceId))
  if (cityId) {
    data.push(find(cities[provinceId], cityId))
  }
  if (countieId) {
    data.push(find(counties[cityId], countieId))
  }

  return data
}
