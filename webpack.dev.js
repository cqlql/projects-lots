
/* eslint comma-dangle: "off" */
const merge = require('webpack-merge')
const getDevConf = require('./build/webpack.dev')
const commConf = require('./webpack.common')

const conf = {
  devServer: {
    // 相关 文档：
    // https://github.com/chimurai/http-proxy-middleware
    // https://webpack.js.org/configuration/dev-server/#devserverproxy
    proxy: {
      '/mock': {
        target: `http://${require('ip').address()}:3003`,
        pathRewrite: {
          '^/mock': ''
        },
        followRedirects: true, // 允许服务端重定向
        changeOrigin: true,
        hostRewrite: true,
      }
    }
  }
}
module.exports = getDevConf({
  // indexTemplate: null, // 不要默认的 index.html 模板
  // rootPath: __dirname, // 当前运行的项目路径，默认当前，子项目情况需要传
  // splitCss: true,
  // friendlyError: false, // 开启定制的控制台消息，默认true。某些配置错误可能看不到，这种情况需关闭
  // cache: false, // 关闭缓存 loader。如果css未改变，将不会触发拆分css，也不会插入link标签到 html 模板中，但开发环境很少去拆分css
  mergeConf: merge(commConf, conf)
})
