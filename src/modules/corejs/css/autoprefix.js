/**
 * 自动加前缀
 * 检测浏览器支持的属性。如果直接支持便不处理
 *
 * 使用 JSON.stringify(document.body.style) 查看可测试 css 属性
 *
 * @param {string} cssPropertyName 不带前缀的，减号风格的 css 名称
 * @param {string} type 可选，'js'[默认]、 'css'
 * @return {string|undefined} 如果不支持此属性，返回 undefined
 */
export default function autoprefix (cssPropertyName, type = 'js') {
  // 检测 cssPropertyName
  if (process.env.NODE_ENV !== 'production') {
    if (/^(-webkit-|-Moz-|-ms-)/.test(cssPropertyName)) {
      throw new Error('不能带浏览器前缀')
    }
  }
  let propertyName
  let humpName = minusHump(cssPropertyName)
  let style = document.body.style

  if (humpName in style) { // 直接支持情况
    propertyName = {
      js: humpName,
      css: cssPropertyName
    }
  } else {
    let humpNameCapital = humpName.replace(/^\w/, w => w.toUpperCase())
    let cssPrefixes = ['ms', 'Moz', 'webkit']
    for (let i = cssPrefixes.length; i--;) {
      let prefix = cssPrefixes[i]
      let jsName = prefix + humpNameCapital
      if (jsName in style) {
        propertyName = {
          js: jsName,
          css: `-${prefix}-` + cssPropertyName
        }
        break
      }
    }
  }
  return propertyName && propertyName[type]
}

/**
 * 减号转驼峰
 *
 * @param {string} word 减号开头，返回值将会首字母大写。
 * @return {string} 首字母小写的驼峰格式字符串，如果参数 word 减号开头，返回值将会首字母大写。
 * */
function minusHump (word) {
  // let w = word.replace(/^-/, '') // 去掉头部减号
  return word.replace(/-\w/g, function (d) {
    return d[1].toUpperCase()
  })
}
