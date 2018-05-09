// getGradeName
import grades from '../../data/grades'

/**
 * 取名称
 *
 * @param [string,number] id
 * @return [string]
 * */
export default function (id) {
  return grades[id]
}
