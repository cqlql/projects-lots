const merge = require('webpack-merge')
const webpackConfig = require('../../build/webpack.dev')(__dirname)

webpackConfig.entry.main = './src/demo.main.js'

// webpackConfig.entry.main = './src/input-autosuggest.window.js'
// const conf = {
//   output: {
//     library: 'InputAutosuggest',
//     libraryTarget: 'window',
//     libraryExport: 'default',
//   },
// }

module.exports = require('../../build/friendly-error')(webpackConfig)


