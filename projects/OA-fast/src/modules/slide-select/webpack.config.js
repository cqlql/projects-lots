let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
// let CleanWebpackPlugin = require('clean-webpack-plugin');

function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

module.exports = function (env, options) {

  let params = env ? env.split(',') : []
  let dev = params[0] !== 'p'

  let outputPath = path.resolve(__dirname, 'dist')

  return {
    entry: {
      '1': ['./src/example/1/main.js'],
      '2': ['./src/example/2/main.js']
    },

    output: {
      path: outputPath,
      filename: 'js/[name].js'
    },
    devtool: 'eval',
    plugins: [
      new HtmlWebpackPlugin({
        filename: './1.html',
        template: './src/example/1/index.html',
        chunks: ['1'],
        inlineSource: '.(js|css)$',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      }),
      new HtmlWebpackPlugin({
        filename: './2.html',
        template: './src/example/2/index.html',
        chunks: ['2'],
        inlineSource: '.(js|css)$',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyCSS: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
      }),
      new ExtractTextPlugin('css/[name].css'),
      new HtmlWebpackInlineSourcePlugin()
    ].concat(dev ? [] : [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.LoaderOptionsPlugin({ // 设置所有loader，压缩css等
        minimize: true
      })
    ]),

    module: {
      //加载器配置
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.resolve('src')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.js$/,
          // exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, "../../20170920_底部弹窗/src")
          ],
          loader: 'babel-loader',
          options: {
            'presets': ['env'],
            'plugins': ['transform-runtime', 'syntax-dynamic-import'],
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: {
                loader: 'babel-loader',
                include: [
                  path.resolve(__dirname, 'src'),
                ],
              }
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }
      ]
    },
    resolve: {

      // 寻找模块的目录
      modules: [
        path.resolve(__dirname, '../../../node_modules'),
        path.resolve(__dirname, "../../20170920_底部弹窗/src"),
        'E:\\_work\\sd.pi\\src\\sd.pi.wxweb\\ViewBuild\\src\\data'
      ],

      extensions: ['.js'],

      // 别名
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
      }
    },

    devServer: {
      contentBase: outputPath,
      compress: true,
      host: getIPAdress(),
      port: 1234,
      hot: false
    }
  }
}
