/* eslint comma-dangle: "off" */
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const ScriptPlugin = require('../../build/script-plugin')
const merge = require('webpack-merge')
const getProdConf = require('../../build/webpack.prod')

// 命令行参数
// const argv = require('yargs').argv
// const isTest = argv['test'] === true // 有时候可能需要测试编译结果

const baseProdConf = getProdConf({
  dirname: __dirname, // 如果是子项目则需要传
  // splitCss: true, // css 拆分
  sourceMap: false, // 默认为 true
  indexTemplate: null
})

// 打包输出路径设置：
let outputPath = 'E:\\_work\\asp_net\\sd.plamclass.com.v2\\sd.plamclass.com\\SD.PalmClass.Web\\Content\\HomePageV2'

const prodConf = {
  entry: { 'input-autosuggest': './src/input-autosuggest.window.js' }, // 更改 js 包文件名
  output: {
    path: outputPath,
    // library: 'jsLib',
    // libraryTarget: 'window',
    // libraryExport: 'default',
    library: 'InputAutosuggest',
    libraryTarget: 'window',
    libraryExport: 'default',
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
        // filterRemove(outputPath, /(^js|\.css|\.map)$/)
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
  ]
}
delete baseProdConf.entry.main // 删掉默认入口
webpack(merge(baseProdConf, prodConf), require('../../build/msg-webpack'))
