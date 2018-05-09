// buildAreasData
import getAreaDataById from './get-area-data-by-id'

/**
 * 根据多个地区id生成可显示结构
 * @params [array] ids
 * return [object] 如：
   let data = {
    11: {
      name: '北京',
      child: {
        1101: {
          name: '市辖区'
        }
      }
    }
  }
 */
export default function buildAreasData (ids) {
  let data = {}

  ids.forEach(function (id) {
    let curr = getAreaDataById(id + '')

    let d = data
    curr.forEach(function (area, i) {
      let a = d[area.id]
      if (!a) {
        d[area.id] = area
      } else {
        area = a
      }

      d = area.child
      if (!d && i !== 2) {
        d = area.child = {}
      }
    })
  })

  return data
}
