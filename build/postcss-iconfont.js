/* 测试环境 字体使用外链 */
var postcss = require('postcss')
module.exports = postcss.plugin('myplugin', function myplugin (options) {
  return function (css) {
    options = options || {}
    if (options.disable) return
    css.walkAtRules(function (rule) {
      if (rule.name === 'font-face') {
        rule.walkDecls(function (decl, i) {
          if (decl.prop === 'src') {
            // 外链字体加 http
            decl.value = decl.value.replace(/\/\//g, 'http://')
          }
        })
      }
    })
  }
})
