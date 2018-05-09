/**
 * 元素查询
 *
 * @example
 // 支持同名
 queryElements(eToolBar,'.name,.name',function (elems) {
    elmA = elems['.name'];
    elmB = elems['.name1'];
 });

 *
 *
 * id，className，tagName 包含着三种选择
 *
 * names 的顺序，需与文档元素同步
 * */

import hasClass from './has-class'

export default function queryElements (rootElem, names, callback) {
  var name,
    resultElems = [],
    nameIds = {},
    test

  if (typeof names === 'string') names = names.split(',')

  setName()

  go(rootElem.children)

  callback(resultElems)

  function go (childs) {
    var nameId = ''
    for (var i = 0, len = childs.length, elem; i < len; i++) {
      elem = childs[i]

      if (!name) {
        return false
      }
      nameId = nameIds[name]
      if (!nameId) {
        nameId = nameIds[name] = ''
      }

      if (test(elem)) {
        resultElems.push(elem)
        resultElems[name + nameId] = elem

        nameIds[name]++

        setName()
      }

      go(elem.children)
    }
  }

  function setName () {
    name = names.shift()

    if (name) {
      var lName = name.substr(0, 1),
        rName = name.substr(1)
      if (lName === '.') {
        test = function (elem) {
          return hasClass(elem, rName)
        };
      } else if (lName === '#') {
        test = function (elem) {
          return elem.id === rName
        };
      } else {
        test = function (elem) {
          // html标签 tagName 大写，但svg标签 tagName 小写
          return elem.tagName.toUpperCase() === name.toUpperCase()
        };
      }
    }
  }
}
