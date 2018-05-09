
/**
 * 元素层级遍历
 * 此遍历能映射 dom 元素层级结构
 *
 * 未完成，目前只在此记录
 * */

function htmlToMd (box) {
  box = $(box).children('ul')
  let text = ''

  // i 可记录当前层级数
  function cb (i) {
    box.each(function () {
      $(this).children('li').each(function () {
        let _box = $(this).children('ul')
        let name = $(this).children('a').text()

        name = name.replace(/\n/g, '')
        name = name.replace(/\s+/g, ' ')
        text += (new Array(i + 2)).join('#') + ' ' + name + '\n'
        if (_box) {
          box = _box
          cb(i + 1)
        }
      })
    })
  }

  cb(0)

  return text
}
