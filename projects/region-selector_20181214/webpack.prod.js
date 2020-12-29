/* eslint comma-dangle: "off" */
// const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
const getProdConf = require('../../build/webpack.prod')
const commConf = require('./webpack.common')

const prodConf = getProdConf({
  ...commConf,
  // 包含进 html 文件
  indexTemplate () {
    return [
      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        inlineSource: /app\.js|styles.css/, // 要包含的 js css
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          // 内嵌 css js 压缩, 结合 HtmlWebpackInlineSourcePlugin 可能会压缩2次，非必要还是不要设了
          // minifyCSS: true,
          // minifyJS: true

          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      }),
      // 将抽离的 css、js 包含进 html 文件
      new HtmlWebpackInlineSourcePlugin(),
    ]
  },
  // rootPath: __dirname, // 当前运行的项目路径，默认当前，子项目情况需要传
  splitCss: true, // css 拆分，默认 false
  sourceMap: false, // 默认 true
  // checkCode: true, // 默认 false。不压缩代码，并标注模块路径信息，方便检查编译代码是否有问题
  // bundleAnalyzer: true, // 打包分析，生成 report.html 文件，默认不生成
  // webpack: merge(commConf.webpack, conf)
})

// 命令行参数使用
// const argv = require('yargs').argv
// const isTest = argv['test'] === true

// 打包输出路径设置：
const outputPath = prodConf.output.path

const conf = {
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
        filterRemove(outputPath, /^js|\.(css)$/)
      }
    })
  ]
}

webpack(merge(prodConf, conf), require('../../build/msg-webpack'))
