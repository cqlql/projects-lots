/* eslint comma-dangle: "off" */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompileEventsPlugin = require('./build/compile-events-plugin')
const filterRemove = require('./build/filter-remove')
const getProdConf = require('./build/webpack.prod')
const commConf = require('./webpack.common')

// 命令行参数使用
// const argv = require('yargs').argv
// const isTest = argv['test'] === true

// 打包输出路径设置：
const outputPath = path.resolve(__dirname, './dist')

const conf = {
  output: {
    path: outputPath
  },
  plugins: [
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
    })
  ]
}

webpack(getProdConf({
  // indexTemplate: null, // 不要默认的 index.html 模板
  // splitCss: true, // css 拆分，默认 false
  // sourceMap: false, // 默认 true
  // checkCode: true, // 默认 false。不压缩代码，并标注模块路径信息，方便检查编译代码是否有问题
  // bundleAnalyzer: true, // 打包分析，生成 report.html 文件，默认不生成
  mergeConf: merge(commConf, conf)
}), require('./build/msg-webpack'))
