window.$docsify.plugins.push(function (hook, vm) {
  var selectedIndexs
  var eSidebarNav

  var eStyle = document.createElement('style')
  eStyle.textContent = '.sidebar-nav ul ul {display: none;}'
  document.head.appendChild(eStyle)

  function setIndex (el) {
    // 替换纯文本
    var txt = el.childNodes[0]
    if (txt.nodeType === 3) {
      var newEl = document.createElement('a')
      newEl.href = 'javascript:;'
      newEl.innerHTML = txt.nodeValue
      el.replaceChild(newEl, txt)
    }

    var ul = el.querySelector('ul')
    if (!ul) {
      ul = el.nextElementSibling
      if (!ul || ul.tagName !== 'UL') return
    }
    var lis = ul.children
    for (var i = 0, len = lis.length; i < len; i++) {
      var ele = lis[i]
      ele.dataset.foldIndex = i
      setIndex(ele)
    }
  }
  function fold (indexs, v) {
    var ul = eSidebarNav.querySelector('ul')
    each(indexs, function (i) {
      var li = ul.children[i]
      if (!li) return false
      if (v === 'none') li.classList.remove('active')
      else li.classList.add('active')
      ul = li.querySelector('ul')
      if (!ul) {
        ul = li.nextElementSibling
        if (!ul || ul.tagName !== 'UL') return
      }
      ul.style.display = v
    })
  }
  hook.init(function () {
    // 初始化时调用，只调用一次，没有参数。
    selectedIndexs = []
  })

  hook.doneEach(function () {
    // 每次路由切换时数据全部加载完成后调用，没有参数。
    // ...
    eSidebarNav = document.querySelector('.sidebar-nav')
    setIndex(eSidebarNav)
    fold(selectedIndexs, 'block')
  })

  hook.ready(function () {
    // 初始化并第一次加完成数据后调用，没有参数。
    eSidebarNav = document.querySelector('.sidebar-nav')
    setIndex(eSidebarNav)
    eSidebarNav.addEventListener('click', function (e) {
      // var target = e.target
      foldByElem(e.target)
    })
    function foldByElem (target) {
      var indexs = []
      scopeElements(target, elem => {
        if (elem === eSidebarNav) return false
        if (elem.tagName === 'LI') {
          indexs.unshift(elem.dataset.foldIndex)

          // 文档内容特殊处理
          elem = elem.parentElement.previousElementSibling
          if (elem && elem.tagName === 'LI') {
            indexs.unshift(elem.dataset.foldIndex)
          }
        }
      })
      if (indexs.length > 0) {
        fold(selectedIndexs, 'none')
        fold(indexs, 'block')
        selectedIndexs = indexs
      }
    }
    let selected = eSidebarNav.querySelector('.app-sub-sidebar,.active')
    if (selected) {
      foldByElem(selected.parentElement)
    }
  })
})

function scopeElements (startElem, listener) {
  startElem = startElem.nodeType === 1 ? startElem : startElem.parentElement
  go(startElem)

  function go (that, child) {
    if (listener(that, child) !== false) {
      go(that.parentElement, that)
    }
  }
}

function each (obj, fn) {
  for (var k in obj) {
    if (obj.hasOwnProperty(k) && fn(obj[k], k) === false) break
  }
}
