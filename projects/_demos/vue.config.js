/*

@vue/cli-plugin 的加载由 package.json 中的依赖决定

*/
const path = require('path')

const conf = require('../../vue.config')

const prevChainWebpack = conf.chainWebpack
conf.chainWebpack = config => {
  prevChainWebpack(config)

  let srcDir = path.resolve(__dirname, '../../', 'src')
  config.resolve
    .alias
    .set('@', srcDir)
    // .set('./@', srcDir)
}

module.exports = conf
