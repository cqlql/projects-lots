const webpackConfig = require('../build/webpack.dev')(__dirname)
webpackConfig.entry.main = ['@/components/debug-msg/w.js'].concat(webpackConfig.entry.main)
module.exports = require('../build/friendly-error')(webpackConfig)
