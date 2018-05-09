
// idConvert
/**
 * @param id string 比如 '540101'
 *
 * @return array 如 ['54','5401','540101']
 * */
export default function (id) {
  let area = []
  ;(id + '').replace(/\d\d/g, function (v, i, str) {
    area.push(str.substr(0, i + 2))
  })
  return area
}
