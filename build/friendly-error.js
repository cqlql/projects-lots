// 友好的 webpack 编译信息
const chalk = require('chalk')
const CompileEventsPlugin = require('./compile-events-plugin')

// 自动获取端口
const portfinder = require('portfinder')

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
module.exports = function (webpackConfig) {
  return new Promise(function (resolve) {
    const { devServer } = webpackConfig
    portfinder.basePort = devServer.port || 8080
    portfinder.getPort((err, port) => {
      if (err) console.error(err)
      devServer.port = port
      devServer.quiet = true // 取消自带的编译信息。 necessary for FriendlyErrorsPlugin
      const protocol = devServer.https ? 'https' : 'http'
      webpackConfig.plugins.unshift(new FriendlyErrorsWebpackPlugin({
        // compilationSuccessInfo: {
        //   messages: ['App running at:',
        //     `  Local: ${protocol}://localhost:${port}`,
        //     `  Network: ${protocol}://${require('internal-ip').v4.sync()}:${port} \n`
        //   ]
        // }
      }))
      webpackConfig.plugins.push(
        // 编译事件
        new CompileEventsPlugin({
          done () {
            console.log('  App running at:')
            console.log(`  - Local:   ${chalk.cyan(`${protocol}://localhost:${port}`)}`)
            console.log(`  - Network: ${chalk.cyan(`${protocol}://${require('internal-ip').v4.sync()}:${port}`)}`)
          }
        })
      )
      resolve(webpackConfig)
    })
  })
}
