// 取具体省份，根据id
// getProvinceById

import {provinces, provinceIds} from '../../data/areas.js'

export default function (id) {
  return provinces[provinceIds[id]]
}
