const webpack = require('webpack')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getBaseConf = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = function ({
  dirname,
  splitCss = false,
  env = d => d,
  indexTemplate
}) {
  process.env.NODE_ENV = 'production'

  let baseConf = getBaseConf({
    dirname,
    cssLoaderHandle(cssLoader) {
      if (splitCss) {
        // 拆分一般 css
        cssLoader.oneOf[1].oneOf[0].use[0] = MiniCssExtractPlugin.loader
        cssLoader.oneOf[1].oneOf[1].use[0] = MiniCssExtractPlugin.loader

        // 拆分 vue css
        // d.oneOf[0].oneOf[0].use[0] = MiniCssExtractPlugin.loader
        // d.oneOf[0].oneOf[1].use[0] = MiniCssExtractPlugin.loader
      }
      return cssLoader
    },
    indexTemplate: indexTemplate ? indexTemplate : () => {
      return new HtmlWebpackPlugin({
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
    }
  })
  let conf = {
    mode: 'production',
    // devtool: 'source-map',
    // externals: {'vue': 'Vue'},
    plugins: [
      // 优化 css: http://cssnano.co/。
      // 会重写 z-index，造成不正确的现象。。。在弄清楚前暂时不用
      // new OptimizeCssAssetsPlugin({
      //   safe: true
      // }),

      // 将抽离的 css、js 包含进 html 文件
      new HtmlWebpackInlineSourcePlugin(),

      // 环境变量
      env(
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ),
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
    ],
    // resolve: {
    //   alias: {
    //     'vue$': 'vue/dist/vue.min.js'
    //   }
    // },

    // 代码拆分
    optimization: {
      splitChunks: {
        // 此处的设置会影响 main.js
        // 如果 cacheGroups 没设置，也会影响

        // chunks: 'async',
        // minSize: 51200,
        // maxSize: 256000, // 如果main.js 满足条件，将会拆分成多个
        // minChunks: 1,
        // maxAsyncRequests: 5,
        // maxInitialRequests: 3,
        // automaticNameDelimiter: '~',
        // name: true,

        cacheGroups: {
          vux: {
            name: `vux.vendor`,
            test: /[\\/]node_modules[\\/]vux/,
            minSize: 64 * 1024,
            // maxSize: 256 * 1024,
            priority: -10,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          // common: {
          //   name: `chunk-common`,
          //   minChunks: 2,
          //   priority: -20,
          //   chunks: 'initial',
          //   reuseExistingChunk: true
          // }
        }
      }
    }
  }

  // css 拆分
  if (splitCss) {
    conf = merge(conf, {
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
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          // filename: '[name].[hash].css',
          // chunkFilename: '[id].[hash].css',
          // filename: '[name].css?_=[chunkhash:7]',
          // chunkFilename: '[id].css?_=[chunkhash:7]',
        }),
      ]
    })
  }

  return merge(baseConf, conf)
}
