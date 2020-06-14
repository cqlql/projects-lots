/* eslint comma-dangle: "off" */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const getCommConf = require('./webpack.common')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = function (options) {
  const { indexTemplate, sourceMap, checkCode, bundleAnalyzer } = options

  // cache 更正为默认 false
  // 因为如果css未改变，将不会触发拆分css，也不会插入link标签到 html 模板中
  if (options.cache !== true) {
    options.cache = false
  }

  process.env.NODE_ENV = 'production'
  if (indexTemplate === undefined) {
    options.indexTemplate = function () {
      return new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        // chunks: ['app'], // 指定引入的js包，只有 app 情况可忽略
        // inlineSource: /(styles\.bundle\.js|app\.js)/, // 要包含的 js css，需结合 html-webpack-inline-source-plugin 插件
        // scripts: { 3: 'http://js/test.js', a1: 'http://js/test2.js' }, // 给此模板指定 script 链接，需配合 script-plugin
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          // 内嵌 css js 压缩, 结合 html-webpack-inline-source-plugin 可能会压缩2次，非必要还是不要设了
          // minifyCSS: true,
          // minifyJS: true

          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      })
    }
  }
  let prodConf = {
    mode: 'production',
    devtool: sourceMap === false ? 'none' : 'source-map',
    plugins: [
      // 使用模块路径作为模块id。(路径转为 hash)
      new webpack.HashedModuleIdsPlugin({
        // hashDigestLength: 7 // 默认 4
      }),
      // 使用模块路径作为模块id。(真实路径，测试用)
      // new webpack.NamedModulesPlugin(),

      // 将抽离的 css、js 包含进 html 文件。需 HtmlWebpackPlugin 中设置 inlineSource 选项
      // new HtmlWebpackInlineSourcePlugin(),
    ],
    optimization: {
      minimizer: [
        // js 压缩
        // https://webpack.docschina.org/plugins/terser-webpack-plugin/
        // https://github.com/terser-js/terser#minify-options
        new TerserPlugin({
          terserOptions: {
            output: {
              // 设置仅仅只有 ascii 十六进制写法被转义
              // 否则所有 Unicode 十六进制写法将被转义，比如ISO-8859-n控制字符 \u0085 被编码成真正的换行，部分环境报错
              // ascii 的换行 \x0a 会被转义成 \n，不会出现真正的换行
              // 但所有的非ascii的原义字符都将被转换成十六进制
              ascii_only: true
            }
          },
        }),
      ],
    },
  }

  // 检查编译代码是否有问题
  if (checkCode) {
    prodConf = merge(
      prodConf,
      {
        mode: 'none', // 不压缩代码
        output: {
          pathinfo: true // 模块标注路径信息
        }
      }
    )
  }

  // 打包分析
  if (bundleAnalyzer) {
    prodConf.plugins.push(
      new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
        analyzerMode: 'static',
        reportFilename: './report.html',
        openAnalyzer: false // 自动打开
      })
    )
  }

  return merge(
    getCommConf(options),
    prodConf,
    options.webpack
  )
}
