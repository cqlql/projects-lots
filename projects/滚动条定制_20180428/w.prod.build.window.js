// const webpack = require('webpack')
// const webpackConfig = require('../../build/webpack.prod')(__dirname)
// webpack(webpackConfig, require('../../build/msg-webpack'))
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'production'

const getBaseConf = require('../../build/webpack.base')
const merge = require('webpack-merge')

function resolve (p) {
  return path.resolve(__dirname, p)
}

let baseConf = getBaseConf(__dirname)
// baseConf.plugins = []
baseConf.plugins.shift()
baseConf.entry = {}

let conf = {
  mode: 'production',
  // devtool: 'source-map',
  watch: true,
  entry: {
    customScroll: ['./src/customScroll.window.js']
  },
  output: {
    path: resolve('./dist'),
    // path: 'E:\\_work\\asp_net\\sd.plamclass.com.v2\\sd.plamclass.com\\SD.PalmClass.Web\\Content\\Scripts\\rule',
    filename: '[name].js',
    library: 'customScroll',
    libraryTarget: 'window'
  },
  externals: {'vue': 'Vue'},
  // 将所有css，包括异步包中的css，全部打包到一个文件
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    // 优化 css: http://cssnano.co/。
    // 会重写 z-index，造成不正确的现象。。。在弄清楚前暂时不用
    new OptimizeCssAssetsPlugin({
      safe: true
    }),

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
    })
  ]
}

webpack(merge(baseConf, conf), require('../../build/msg-webpack'))
