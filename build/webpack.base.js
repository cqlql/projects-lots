const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

module.exports = function ({ dirname, cssLoaderHandle = p => p, indexTemplate = p => p }) {
  const devMode = process.env.NODE_ENV !== 'production'
  // 项目根路径
  function _resolve (p) {
    return path.resolve(__dirname, '../', p)
  }
  // 子项目路径
  function resolve (p) {
    return path.resolve(dirname, p)
  }

  const cssAlias = {
    "./@": _resolve('src')
  }

  function getCssLoaders () {
    let options = [
      {
        resourceQuery: /module/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              alias: cssAlias,
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          }
        ]
      },
      {
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode,
              alias: cssAlias
            }
          },
        ]
      }
    ]
    options.forEach(op => {
      op.use.push('postcss-loader?sourceMap=true')
      // op.use.push('sass-loader?sourceMap=true') // 增加 sass 支持，还需安装 sass-loader 、 node-sass
    })

    return options
  }

  let conf = {
    entry: {
      main: ['./src/main.js']
    },
    output: {
      path: resolve('./dist'),

      // filename: 'js/[name].[chunkhash:7].js',
      // chunkFilename: 'js/[name].bundle.[chunkhash:7].js',
      filename: 'js/[name].js?_=[chunkhash:7]',
      chunkFilename: 'js/[name].bundle.js?_=[chunkhash:7]',
    },
    module: {
      //加载器配置
      rules: [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [_resolve('src'), resolve('src')],
        options: {
          fix: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [_resolve('src'), resolve('src')],
        // exclude: ['node_modules'],
      },
      cssLoaderHandle({
        test: /\.css$/,
        // test: /\.(css|scss)$/,

        // 一起处理
        // oneOf: getCssLoaders()
        // 分开处理 vue css
        oneOf: [{
          test: /\.vue/,
          oneOf: getCssLoaders()
        },
        {
          oneOf: getCssLoaders()
        }
        ],
      }),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, //单位 字节，1千字节(kb)=1024字节(b)
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
      indexTemplate(
        new HtmlWebpackPlugin({
          filename: './index.html',
          template: './src/index.html',
          // chunks: ['main'] // 默认所有入口
        })
      ),
      new VueLoaderPlugin()
      // copy custom static assets
      // 在开启 devServer 情况，将 copy 到内存中
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(dirname, 'static'),
      //     to: path.resolve(dirname, 'dist/static'),
      //     ignore: ['.*'] // 排除
      //   }
      // ])
    ],
    resolve: {
      modules: [
        'node_modules',
        // _resolve("../node_modules")
      ],
      extensions: ['.js', '.vue'],
      alias: {
        // 'vue$': 'vue/dist/vue.esm.js',
        '@': _resolve('src'),
      }
    }
  }
  return conf
}
