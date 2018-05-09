const webpackConfig = require('./build/webpack.dev')(__dirname)
// proxy 文档：https://github.com/chimurai/http-proxy-middleware
// webpackConfig.devServer.proxy = [{
//   context: ["/Content"],
//   target: "http://192.168.1.222:3003",
//   // 会重写 host。以 target 重写
//   changeOrigin: true,
//   // 也可以自定义 host
//   // hostRewrite: 'parent.shendupeiban.com',
//   // 也可以通过这种方式设置 host
//   // onProxyReq: function(proxyReq, req, res){
//   //   proxyReq.setHeader('Host',`192.168.1.222:3002`)
//   //   proxyReq.setHeader('Cookie', `
//   //     .ASPXAUTH=47DB980C8F37CC95918231651123DC05B7DBD3B2082F17CE13FF8435836C6405550374B0C50CEEB3A7DFAE8D55323906CFBDEB8FA1DF40FAB9EC3D114EA3EB3DF69249FBD73B7EB9000AD2437399CD21B32F3BC99236DAF7C462C8216642F001; domain=192.168.1.194; expires=Wed, 08-Nov-2017 06:28:56 GMT; path=/; HttpOnly
//   //   `);
//   // },
//   onProxyRes: function(proxyRes, req, res){
//     proxyRes.headers['Access-Control-Allow-Origin'] = '*'
//   }
// }]
module.exports = require('./build/friendly-error')(webpackConfig)
