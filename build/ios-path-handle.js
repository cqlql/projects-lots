module.exports = function (webpackConfig) {
  webpackConfig.output.filename = webpackConfig.output.filename.replace(/^js\//, '')
  webpackConfig.output.chunkFilename = webpackConfig.output.chunkFilename.replace(/^js\//, '')
  webpackConfig.module.rules.forEach(function (rule) {
    if (rule.options && rule.options.name) {
      rule.options.name = rule.options.name.replace(/^imgs\/|^fonts\//, '')
    }
  })
}
