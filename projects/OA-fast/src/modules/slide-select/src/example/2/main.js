/*
此处调用只有显示时才加载
*/
import '../../slide-select.css'
import SlideSelect from '../../slide-select-popup'
import AreaData from '../../area-data'

let areaData = new AreaData()
let slideSelect = new SlideSelect()

areaData.onlyOnce() // 保证数据只绑定一次，当前页面只有此选择时使用

slideSelect.onSelect = ({result, resultTxt, currCityList, currCountyList, selectIndexs, areasData}) => {
  if (areaData.isLoad) return
  let {provinces} = areasData
  // console.log(result, resultTxt, currCityList, currCountyList, selectIndexs)
  let {0: i, 1: j, 2: k} = selectIndexs
  slideSelect.close()
}

document.querySelector('#test1').addEventListener('click', function () {
  slideSelect.onceInit(() => {
    slideSelect.show()
  })
  slideSelect.use(areaData)
})

document.querySelector('#test2').addEventListener('click', function () {
  slideSelect.onceInit(() => {
    slideSelect.show()
  })
  slideSelect.use(areaData, () => {
    areaData.select([5, 3, 1])
  })
})

document.querySelector('#test3').addEventListener('click', function () {
  areaData.optionalCity = areaData.optionalCounty = true
  slideSelect.onceInit(() => {
    slideSelect.show()
  })
  slideSelect.use(areaData, () => {
    areaData.select([5, 3, 1])
  })
})
