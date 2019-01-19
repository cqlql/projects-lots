/* eslint comma-dangle: "off" */
const getDevConf = require('../../build/webpack.dev')
const merge = require('webpack-merge')

module.exports = require('../../build/friendly-error')(merge(
  getDevConf({
    dirname: __dirname
    // splitCss: true,
  }),
  {
    entry: {
      main: './src/input-autosuggest.window.js'
    },
    output: {
      library: 'InputAutosuggest',
      libraryTarget: 'window',
      libraryExport: 'default',
    }
  }
))
