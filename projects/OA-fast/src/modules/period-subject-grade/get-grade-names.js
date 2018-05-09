// getGradeNames
import grades from '../../data/grades'

/**
 * 取多个名称
 *
 * @param [array] ids
 * @return [array]
 * */
export default function (ids) {
  let n = []
  ids.forEach(id => {
    n.push(grades[id])
  })
  return n
}
