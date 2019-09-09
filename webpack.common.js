/* eslint comma-dangle: "off" */
const ScriptPlugin = require('./build/script-plugin')

module.exports = {
  // 不打包的模块
  // 键为 import 调用名，值为全局名称
  externals: {
    vue: 'Vue'
    // 'vue-router': 'VueRouter'
  },
  plugins: [
    // 转 .net 的 cshtml 模板
    // new (require('./build/cshtml-plugin.js'))(),

    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin({
      1: 'http://style.shenduxuetang.com/vue/2.5.22/vue.runtime.min.js',
      // 2: 'js/vue-router.min.js', // 配合 copy-webpack-plugin 使用
    })
  ]
}
