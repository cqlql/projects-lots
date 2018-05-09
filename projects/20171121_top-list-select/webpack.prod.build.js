let path = require('path')
let webpack = require('webpack')
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// let HtmlPlugin = require('./build/html-plugin')
let CleanPlugin = require('./build/clean-plugin')
let baseConf = require('./webpack.base')
let merge = require('webpack-merge')

function delDir (v) {
  return path.resolve(__dirname, '../Areas/AgentArea/Content/' + v)
}
function resolve (p) {
  return path.resolve(__dirname, p)
}

baseConf.module.rules.shift(); // 去掉代码风格检查

let isTemp = 1
if (!isTemp) {
  baseConf.output.path = path.resolve(__dirname, '../Areas/AgentArea/Content')
  baseConf.output.publicPath = '/AgentArea/Content/'
}

baseConf.plugins[0] = new HtmlWebpackPlugin({
  filename: isTemp ? './index.html' : '../Views/Home/Index.cshtml',
  template: './src/index.html',
  chunks: ['main'],
  inlineSource: '.(css)$',
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
let conf = {
  // devtool: 'source-map',
  // externals: {'vue': 'Vue'},
  plugins: [
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

    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 7
    })
  ].concat(isTemp ? [] : [
    // new HtmlPlugin({options: ''}),
    // new CleanPlugin({
    //   before: [resolve('./dist')],
    //   after: [resolve('./dist/main.css')]
    // })
  ]),
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  }
}

webpack(merge(baseConf, conf), function (err, stats) {

  // const info = stats.toJson();
  const info =stats.toString({
    // chunks: true,
    // Add console colors
    colors: true
  });

  console.log(info)

  // fs.removeSync(path.resolve(conf.output.path,'./css'))
  // fs.removeSync(path.resolve(conf.output.path,'./js'))
})
