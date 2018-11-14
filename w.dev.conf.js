const webpackConfig = require('./build/webpack.dev')(__dirname)

webpackConfig.entry.main = ['@/components/debug-msg/w.js'].concat(webpackConfig.entry.main)

// proxy 文档：https://github.com/chimurai/http-proxy-middleware
webpackConfig.devServer.proxy = [{
  context: ["/mock"],
  target: "http://192.168.1.222:3003",
  pathRewrite: {
    '^/mock': ''
  },

  // 1 会重写 host。以 target 重写
  changeOrigin: true,
  // 2 也可以自定义 host
  // hostRewrite: 'parent.shendupeiban.com',
  // 3 也可以通过这种方式设置 host
  // onProxyReq: function(proxyReq, req, res){
  //   proxyReq.setHeader('Host',`192.168.1.222:3002`)
  //   proxyReq.setHeader('Cookie', `
  //     .ASPXAUTH=47DB; domain=192.168.1.194; expires=Wed, 08-Nov-2017 06:28:56 GMT; path=/; HttpOnly
  //   `);
  // },

  // 定制响应 headers
  // onProxyRes: function(proxyRes, req, res){
  //   proxyRes.headers['Access-Control-Allow-Origin'] = '*'
  // }
}]

module.exports = require('./build/friendly-error')(webpackConfig)
