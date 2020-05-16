/* eslint comma-dangle: "off" */
const path = require('path')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const merge = require('webpack-merge')
const getCssLoaders = require('./css-loaders')
const getCacheLoader = require('./cache-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function (options) {
  const { rootPath, indexTemplate, splitCss, cache } = options
  // const devMode = process.env.NODE_ENV !== 'production'
  // 项目根路径
  const _resolve = p => path.resolve(__dirname, '../', p)
  // 子项目路径
  const resolve = rootPath && (p => path.resolve(rootPath, p))

  let conf = {
    entry: {
      app: './src/main.ts'
    },
    output: {
      path: (resolve || _resolve)('./dist'),

      // filename: 'js/[name].[chunkhash:7].js',
      // chunkFilename: 'js/[name].bundle.[chunkhash:7].js',
      filename: 'js/[name].js?_=[chunkhash:7]',
      chunkFilename: 'js/[name].bundle.js?_=[chunkhash:7]'
    },
    module: {
      // 加载器配置
      rules: [
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   include: [_resolve('src')].concat(resolve ? resolve('src') : []),
        //   options: {
        //     formatter: require('eslint-friendly-formatter')
        //   }
        // },
        {
          test: /\.vue$/,
          use: [
            ...getCacheLoader('vue-loader', cache),
            'vue-loader'
          ]
        },
        {
          test: /\.(js|tsx?)$/,
          include: [_resolve('src')].concat(resolve ? resolve('src') : []),
          use: [
            ...getCacheLoader('babel-loader', cache),
            {
              loader: 'babel-loader',
              options: require('../babel.config'),
              // exclude: ['node_modules'],
            }
          ]
        },
        {
          test: /\.(c|le|sc|postc)ss$/,
          // 一起处理
          // oneOf: getCssLoaders(options)

          // 分开处理 vue css
          oneOf: [
            {
              test: /\.vue/,
              oneOf: getCssLoaders(options)
            },
            {
              oneOf: getCssLoaders(options)
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000, // 单位 字节，1千字节(kb)=1024字节(b)
            // publicPath: '../',
            name: 'imgs/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            // publicPath: '../',
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      // copy custom static assets
      // 在开启 devServer 情况，将 copy 到内存中
      // new CopyWebpackPlugin([
      //   {
      //     from: _resolve('static'),
      //     to: _resolve('dist/static'),
      //     ignore: ['.*'] // 排除
      //   }
      // ])
      new ForkTsCheckerWebpackPlugin(
        {
          vue: true,
          tslint: false,
          formatter: 'codeframe',
          checkSyntacticErrors: false,
          tsconfig: path.resolve(__dirname, '../tsconfig.json')
          // async: false
        }
      )
    ].concat(
      function () {
        if (indexTemplate === undefined) { // 默认模板
          return new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
            // chunks: ['main'] // 默认所有入口
          })
        }
        if (indexTemplate === null) return [] // 为 null 则不要模板
        return indexTemplate()
      }()
    ),
    resolve: {
      modules: [
        'node_modules'
      ],
      extensions: ['.ts', '.tsx', '.vue', '.js'],
      alias: {
        './@': _resolve('src'), // css url 别名
        '@': _resolve('src'),
        // 'vue$': 'vue/dist/vue.min.js' // 弃用-目前使用运行时版本(没有模板解析)
      }
    },
    /* // 代码拆分
    optimization: {
      splitChunks: {
        // 此处的设置会影响 app.js
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
    } */
  }
  // css 拆分
  if (splitCss) {
    conf = merge(conf, {
      /*
      css 拆分到一个文件。将所有css，包括异步包中的css，全部打包到一个文件

      问题1：无法合并异步 vue 单文件中的 style css。
      问题2：同步的 vue 单文件也不以设置的 name 命名

      方案1，不理想：与mian 同名，但不能包含异步vue中的css
      方案2，临时可行：test 中包括 vue 相关css。但会多出一个空的 styles.bundle.js，再把这个空js包含进 template.html 中。
        看看能不能在事件中排除这个空js？经测试，此js不能删除
        有时间可以写个插件，将小于 200 字节的js包含进 template.html 中
      */
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              // test (module) {
              //   console.log('-------------------------------------')
              //   console.log(
              //     module.nameForCondition && module.nameForCondition(),
              //     module.type, // css/mini-extract
              //     module.constructor.name
              //   )
              // },
              // test: /\.css$/,
              test: m => m.constructor.name === 'CssModule', // 能匹配到 vue 中的 style
              chunks: 'all',
              enforce: true,
            },
          }
        }
      },
      plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          // filename: 'styles.css',

          // filename: '[name].[hash].css',
          // chunkFilename: '[id].[hash].css',
          // filename: '[name].css?_=[chunkhash:7]',
          // chunkFilename: '[id].css?_=[chunkhash:7]',
        })
      ]
    })
  }
  return conf
}
