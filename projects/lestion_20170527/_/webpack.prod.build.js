let path = require('path')
let webpack = require('webpack')
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// let HtmlPlugin = require('./build/html-plugin')
const CompileEventsPlugin = require('../../build/compile-events-plugin')
const filterRemove = require('../../build/filter-remove')
let baseConf = require('./webpack.base')
let merge = require('webpack-merge')

let outputPath = path.resolve(__dirname, './dist')

baseConf.output.path = outputPath

baseConf.plugins[0] = new HtmlWebpackPlugin({
  filename: './record.html',
  template: './src/index.html',
  chunks: ['main'],
  inlineSource: '.(css|js)$',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    minifyCSS: true,
    minifyJS: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  }
})
baseConf.module.rules[baseConf.module.rules.length - 1].use = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'postcss-loader']
});

let conf = {
  // devtool: 'source-map',
  // externals: {'vue': 'Vue'},
  plugins: [
    new HtmlWebpackPlugin({
      filename: './record-ios.html',
      template: './src/index-ios.html',
      chunks: ['main'],
      inlineSource: '.(css|js)$',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: function (module) {
        return (/.css$/).test(module.resource)
      }
    }),
    new HtmlWebpackInlineSourcePlugin(),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true // 允许 map
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({ // 设置所有loader，压缩css等
      minimize: true
    }),
    // new webpack.HashedModuleIdsPlugin({
    //   hashDigestLength: 7
    // }),
    new ExtractTextPlugin('[name].css'),
      // 编译事件
      new CompileEventsPlugin({
        compile () {
          // 编译前删除
          // filterRemove(outputPath, /^js$/)
        },
        done () {
          // 编译后删除
          filterRemove(outputPath, /^(css|js)$/)
        }
      }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  }
}

webpack(merge(baseConf, conf), function (err, stats) {

  // const info = stats.toJson();
  const info = stats.toString({
    // chunks: true,
    // Add console colors
    colors: true
  });

  console.log(info)

  // fs.removeSync(path.resolve(conf.output.path,'./css'))
  // fs.removeSync(path.resolve(conf.output.path,'./js'))
})
