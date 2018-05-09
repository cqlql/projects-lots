module.exports = function (webpackConfig) {
  webpackConfig.output.filename = webpackConfig.output.filename.replace(/^js\//, '')
  webpackConfig.output.chunkFilename = webpackConfig.output.chunkFilename.replace(/^js\//, '')
  webpackConfig.module.rules.forEach(function (rule) {
    if (rule.query) {
      rule.query.name = rule.query.name.replace(/^imgs\/|^fonts\//, '')
    }
  })
}
