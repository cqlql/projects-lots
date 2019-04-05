/**
 * autoPrefix 自动加前缀
 * 检测浏览器支持的属性。如果直接支持便不处理
 *
 * 使用 JSON.stringify(document.body.style) 查看可测试 css 属性
 *
 * @param {string} cssPropertyName 不带前缀的，减号风格的 css 名称
 * @param {string} type 可选，'js'[默认]、 'css'
 * @return {object|undefined} 如果不支持此属性，返回 undefined
 * */
import minusHump from './minus-hump'

let cache = {}
export default function (cssPropertyName, type = 'js') {
  // 检测 cssPropertyName
  if (process.env.NODE_ENV !== 'production') {
    if (/^(-webkit-|-Moz-|-ms-)/.test(cssPropertyName)) {
      throw new Error('不能带浏览器前缀')
    }
  }

  // 如果有直接返回
  let propertyName = cache[cssPropertyName]
  if (propertyName) return propertyName[type]

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
