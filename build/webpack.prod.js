const webpack = require('webpack')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getBaseConf = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = function (dirname) {
  process.env.NODE_ENV = 'production'

  let baseConf = getBaseConf(dirname)
  // baseConf.module.rules.forEach(d => {
  //   // css 处理
  //   if (d.test.toString().indexOf('css') > -1) {
  //     // 拆分 css
  //     d.oneOf[0].use[0] = MiniCssExtractPlugin.loader
  //     d.oneOf[1].use[0] = MiniCssExtractPlugin.loader
  //   }
  // })

  // vue css 单独处理
  baseConf.module.rules.forEach(d => {
    // css 处理
    if (d.test.toString().indexOf('css') > -1) {
      // 拆分一般 css
      d.oneOf[1].oneOf[0].use[0] = MiniCssExtractPlugin.loader
      d.oneOf[1].oneOf[1].use[0] = MiniCssExtractPlugin.loader

      // 拆分 vue css
      // d.oneOf[0].oneOf[0].use[0] = MiniCssExtractPlugin.loader
      // d.oneOf[0].oneOf[1].use[0] = MiniCssExtractPlugin.loader
    }
  })

  baseConf.plugins[0] = new HtmlWebpackPlugin({
    filename: './index.html',
    template: './src/index.html',
    // chunks: ['main'],
    inlineSource: /\.(css)$/,
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
  let conf = {
    mode: 'production',
    // devtool: 'source-map',
    // externals: {'vue': 'Vue'},

    // css 拆分到一个文件。将所有css，包括异步包中的css，全部打包到一个文件
    // 问题1：
    // 无法处理 vue 单文件中的 style css。(注：会处理 vue 单文件中直接 `import 's.css'` 的 css)
    // 解决：目前没有好的办法，可以 vue 单独处理不拆分
    // 问题2：会多出一个空的 styles.bundle.js
    // 解决：与入口 mian 同名
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'main',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    plugins: [
      // css 拆分
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        // filename: '[name].[hash].css',
        // chunkFilename: '[id].[hash].css',
        // filename: '[name].css?_=[chunkhash:7]',
        // chunkFilename: '[id].css?_=[chunkhash:7]',
      }),

      // 优化 css: http://cssnano.co/。
      // 会重写 z-index，造成不正确的现象。。。在弄清楚前暂时不用
      // new OptimizeCssAssetsPlugin({
      //   safe: true
      // }),

      // 将抽离的 css、js 包含进 html 文件
      new HtmlWebpackInlineSourcePlugin(),

      // 环境变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // 设置所有loader，此处实现压缩css等
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      // 使用模块路径作为模块id。(路径为 hash)
      new webpack.HashedModuleIdsPlugin({
        // hashDigestLength: 7 // 默认 4
      }),
      // 使用模块路径作为模块id。(物理路径，测试用) // 目前 develoment 模式默认
      // new webpack.NamedModulesPlugin(),

      // ** 以下插件已废弃
      // 压缩js，目前默认就有
      // new webpack.optimize.UglifyJsPlugin({
      //   sourceMap: true // 允许 map
      // }),
      // 减少打包的闭包嵌套？？ // 目前 production 模式默认
      // new webpack.optimize.ModuleConcatenationPlugin(),
      // 公共异步包抽离。将异步包中的公共块抽离成公共异步包
      // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'main', // 指定要处理的入口块名。多入口情况，不给是否会处理所有的入口父块？待测
      //   async: 'comm-async', // 异步包名。为 true 将以 id 命名
      //   children: true,
      //   minChunks: 3
      // }),
      // 将异步包中 import css 抽离至入口父块。即 main.js
      // new webpack.optimize.CommonsChunkPlugin({
      //   // name: 'main', // 指定要处理的入口块名
      //   children: true,
      //   minChunks: function (module) {
      //     return (/\.(css)$/).test(module.resource)
      //   }
      // }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.min.js'
      }
    }
  }

  return merge(baseConf, conf)
}
