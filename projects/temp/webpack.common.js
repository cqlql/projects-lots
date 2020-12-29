/* eslint comma-dangle: "off" */
const ScriptPlugin = require('../../build/script-plugin')

const postcssConfig = require('../../postcss.config')
postcssConfig.plugins.pop() // 不要 rem

module.exports = {
  // indexTemplate: null, // 不要默认的 index.html 模板
  rootPath: __dirname, // 当前运行的项目路径，默认当前，子项目情况需要传
  // splitCss: true,
  // friendlyError: false, // 开启定制的控制台消息，默认true。某些配置错误可能看不到，这种情况需关闭
  // cache: false, // 关闭缓存 loader。如果css未改变，将不会触发拆分css，也不会插入link标签到 html 模板中，但开发环境很少去拆分css
  postcss: postcssConfig, // 子项目可能拥有不同的 postcss config
  webpack: {
    entry: {
      app: './src/main.js'
    },
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
        1: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.min.js',
        // 2: 'js/vue-router.min.js', // 配合 copy-webpack-plugin 使用
      })
    ]
  }
}
