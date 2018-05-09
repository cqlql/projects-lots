// getAreaByIds
import getAreaById from './get-area-by-id'

/**
 * @param array ids
 * @return array
 * */
export default function (ids) {
  let names = []
  ids.forEach(id => {
    names.push(getAreaById(id + ''))
  })
  return names
}
