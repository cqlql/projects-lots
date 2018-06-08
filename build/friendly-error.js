// 友好的 webpack 编译信息

// 自动获取端口
const portfinder = require('portfinder')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = function (webpackConfig) {
  return new Promise(function(resolve, reject) {
    portfinder.basePort = webpackConfig.devServer.port || 8080
    portfinder.getPort((err, port) => {
      webpackConfig.devServer.port = port
      webpackConfig.devServer.quiet = true // 取消自带的编译信息。 necessary for FriendlyErrorsPlugin
      webpackConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`start: http://${webpackConfig.devServer.host}:${port}`],
        },
      }))
      resolve(webpackConfig)
    });
  })
}
