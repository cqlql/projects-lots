/* eslint comma-dangle: "off" */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getCommConf = require('./webpack.base')
const merge = require('webpack-merge')
process.env.NODE_ENV = 'production'
module.exports = function (options) {
  if (options.indexTemplate === undefined) {
    options.indexTemplate = function () {
      return new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        // chunks: ['main'], // 指定引入的js包，只有main情况可忽略
        // inlineSource: /main\.js/,
        // inlineSource: /styles\.bundle\.js/,
        // inlineSource: /(styles\.bundle\.js|main\.js)/,
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
      })
    }
  }
  let conf = {
    mode: 'production',
    devtool: options.sourceMap ? 'source-map' : 'none',
    plugins: [
      // 使用模块路径作为模块id。(路径为 hash)
      new webpack.HashedModuleIdsPlugin({
        // hashDigestLength: 7 // 默认 4
      }),
      // 将抽离的 css、js 包含进 html 文件
      // new HtmlWebpackInlineSourcePlugin(),

      // 使用模块路径作为模块id。(物理路径，测试用) // 目前 develoment 模式默认
      // new webpack.NamedModulesPlugin(),
    ]
  }

  return merge(
    getCommConf(options),
    conf
  )
}
