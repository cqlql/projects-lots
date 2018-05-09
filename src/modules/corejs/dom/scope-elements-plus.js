import scopeElements from './scope-elements'

// name : className、tagName
function checkElement (elm, name) {
  let type = name.substr(0, 1)
  let eligibility = false
  switch (type) {
    case '.':
      eligibility = elm.classList.contains(name.substr(1))
      break
    // case '#':
    //   eligibility = elm.id === name.substr(1)
    //   break
    default:
      eligibility = elm.tagName === name
  }
  return eligibility
}

/**
 * scopeElementsPlus 范围内查找，从事件触发元素开始，返回匹配的元素
 * live 实现
 *
 *
 * @param startElem 事件触发元素，一般为 event.target
 * @param rootElem 一般为事件绑定元素
 * @param listener 一般为事件绑定元素
 *
 * 快速使用
 scopeElementsPlus(e.target, document.body, {
    '.b' (elem) {
      console.log(elem) // 返回匹配元素
    }
  })
 * */
export default function scopeElementsPlus (startElem, rootElem, listener) {
  scopeElements(startElem, function (elm) {
    for (let name in listener) {
      if (listener.hasOwnProperty(name)) {
        if (checkElement(elm, name)) {
          listener[name](elm)
          return false
        }
      }
    }
    if (elm === rootElem) return false
  })
}
