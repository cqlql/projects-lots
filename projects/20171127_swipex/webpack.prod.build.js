let path = require('path')
let webpack = require('webpack')
let HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// let HtmlPlugin = require('./build/html-plugin')
let CleanPlugin = require('../../build/clean-plugin')
let baseConf = require('./webpack.base')
let merge = require('webpack-merge')

function dir (v) {
  // return path.join('E:\\__admin\\Desktop\\pi-train\\', v)
  // return path.join('E:\\__admin\\Desktop\\工作\\20171120_圆周率挑战\\html 页面\\pi-train', v)

  return resolve(path.join('./dist',v))
}

function resolve (p) {
  return path.resolve(__dirname, p)
}

baseConf.module.rules.shift(); // 去掉代码风格检查
baseConf.output.path = dir('')

baseConf.plugins[0] = new HtmlWebpackPlugin({
  filename: './index.html',
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
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true // 允许 map
    // }),
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
  ].concat([
    // new HtmlPlugin({options: ''}),
    new CleanPlugin({
      before: [dir('./imgs'),dir('./js'),dir('./index.html')],
      after: [dir('./main.css')]
    })
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
