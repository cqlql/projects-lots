/* eslint comma-dangle: "off" */
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('./build/compile-events-plugin')
const filterRemove = require('./build/filter-remove')
const ScriptPlugin = require('./build/script-plugin')
const merge = require('webpack-merge')
const getProdConf = require('./build/webpack.prod')

// 命令行参数
// const argv = require('yargs').argv
// const isTest = argv['test'] === true // 有时候可能需要测试编译结果

const baseProdConf = getProdConf({
  splitCss: true, // css 拆分
  // sourceMap: false, // 默认为 true
})

// 打包输出路径设置：
let outputPath = path.resolve(__dirname, './dist')

const prodConf = {
  // 不打包的模块
  // 键为 import 调用名，值为全局名称
  externals: {
    'vue': 'Vue'
    // 'vue-router': 'VueRouter'
  },
  output: {
    path: outputPath
  },
  plugins: [
    // 新增环境变量
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     APP_TEST: JSON.stringify(isAppTest + '')
    //   }
    // })
    // 转 .net 的 cshtml 模板
    // new (require('./build/cshtml-plugin.js'))(),

    // 编译事件
    new CompileEventsPlugin({
      compile () {
        // 编译前删除
        // filterRemove(outputPath, /\.(jpg|js|ttf)$/)
        filterRemove(outputPath, /(^js|\.css|\.map)$/)
      },
      done () {
        // 编译后删除
        // filterRemove(outputPath, /\.(css)$/)
      }
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.min.js'),
    //     to: path.resolve(outputPath, 'js/vue-router.min.js'),
    //   }
    // ]),
    // 添加指定的 cdn 包。或者指定路径的包也行
    new ScriptPlugin([
      'http://style.shenduxuetang.com/vue/2.5.22/vue.runtime.min.js',
      // 配合 copy-webpack-plugin 使用
      // 'js/vue-router.min.js',
    ]),
    // 打包分析
    new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
      analyzerMode: 'static',
      reportFilename: './report.html',
      openAnalyzer: false // 自动打开
    })
  ]
}

webpack(merge(baseProdConf, prodConf), require('./build/msg-webpack'))
