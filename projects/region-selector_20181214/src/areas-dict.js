/* eslint-disable */
/* 生成 id 对应索引数据，方便查询。cities(3k)、counties(34k) 数据量太大，还是直接循环查询吧 */
import { provinces, cities, counties } from './areas'

let provinceDict = {}
provinces.forEach((d, i) => {
  provinceDict[d.id] = i
})
console.log(JSON.stringify(provinceDict))

function each (obj, fn) {
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) fn(obj[k], k)
  }
}
function generateDict (data) {
  let newData = {}
  each(data, list => {
    list.forEach((d, i) => {
      newData[d.id] = i
    })
  })
  console.log(JSON.stringify(newData))
}
console.log('---------')
generateDict(cities)
console.log('---------')
generateDict(counties)
