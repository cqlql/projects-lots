
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getCacheLoader = require('./cache-loader')
module.exports = function ({ sourceMap = true, splitCss, cache, postcss }) {
  function getCssLoaderComm ({ css = {}, scss, less } = {}) {
    const loaders = [
      ...getCacheLoader('css-loader', cache),
      splitCss ? MiniCssExtractPlugin.loader : 'vue-style-loader',
      {
        loader: 'css-loader',
        options: Object.assign({ sourceMap }, css)
      },
      {
        loader: 'postcss-loader',
        options: {
          ...postcss,
          sourceMap
        }
      }
    ]
    if (less) {
      loaders.push(
        'less-loader?sourceMap=' + sourceMap // 增加 less 支持，还需安装 less-loader
      )
    }
    if (scss) {
      loaders.push(
        'sass-loader?sourceMap=' + sourceMap // 增加 sass 支持，还需安装 sass-loader 、 node-sass
      )
    }
    return loaders
  }

  const options = [
    {
      resourceQuery: /module/,
      use: getCssLoaderComm({
        css: {
          modules: {
            localIdentName: '[local]_[hash:base64:5]'
          }
        }
      })
    },
    {
      resourceQuery: /scss/,
      use: getCssLoaderComm({
        scss: true
      })
    },
    {
      test: /\.scss/,
      use: getCssLoaderComm({
        scss: true
      })
    },
    {
      use: getCssLoaderComm()
    }
  ]

  return options
}
