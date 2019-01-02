/* 测试环境 字体使用外链 */
const postcss = require('postcss')
module.exports = postcss.plugin('myPostcssPlugin', function myplugin (options) {
  return function (css) {
    options = options || {}
    // 外链字体加 http
    if (options.disable) return
    css.walkAtRules(function (rule) {
      if (rule.name === 'font-face') {
        rule.walkDecls(function (decl, i) {
          if (decl.prop === 'src') {
            decl.value = decl.value.replace(/\/\//g, 'http://')
          }
        })
      }
    })
  }
})
