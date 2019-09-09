// 注意，此插件必须在 HtmlWebpackPlugin 插件之后

// links 参数 将为所有模板增加
// 参数示例，其中 key 为排序值 {1: 'http://style.shenduxuetang.com/vue/2.5.22/vue.runtime.min.js',2: 'js/vue-router.min.js'}
function ScriptPlugin (links) {
  this.links = links
}

ScriptPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', compilation => {
    // 编译开始
    compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
      const scripts = {
        ...this.links,
        ...htmlPluginData.plugin.options.scripts
      }

      const before = {}
      const after = {}
      const beforeKeys = []
      const afterKeys = []
      const beforeArr = []
      const afterArr = []

      for (const key in scripts) {
        if (Object.prototype.hasOwnProperty.call(scripts, key)) {
          if (key.indexOf('a') === 0) {
            const i = key.substr(1)
            after[i] = scripts[key]
            afterKeys.push(i)
          } else {
            before[key] = scripts[key]
            beforeKeys.push(key)
          }
        }
      }

      beforeKeys.sort((a, b) => a - b)
      afterKeys.sort((a, b) => a - b)

      beforeKeys.forEach(k => {
        beforeArr.push(before[k])
      })

      afterKeys.forEach(k => {
        afterArr.push(after[k])
      })
      htmlPluginData.assets.js = [
        ...beforeArr,
        ...htmlPluginData.assets.js,
        ...afterArr
      ]
    })
  })
}

module.exports = ScriptPlugin
