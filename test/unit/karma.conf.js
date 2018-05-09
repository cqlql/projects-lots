let getWebpackConfig = require('../../build/webpack.base')

module.exports = function(config) {
  // webpack 处理
  let webpackConfig = getWebpackConfig(__dirname)
  webpackConfig.plugins.shift()
  delete webpackConfig.entry
  delete webpackConfig.output
  webpackConfig.mode = 'development'
  webpackConfig.devtool = 'inline-source-map'
  // 将 js loader 包含进来
  webpackConfig.module.rules.forEach(d => {
    if (/^(eslint|babel)/.test(d.loader)) {
      d.include.push(__dirname)
    }
    // if (/^vue/.test(d.loader)) {
    //   d.options.loaders.js.include.push(__dirname)
    // }
  })

  config.set({
    frameworks: ['jasmine'],
    files: ['./index.js'],
    preprocessors: {
      './index.js':['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ["spec"],
    // browsers: ['Chrome'],
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-jasmine',
      "karma-webpack",
      "karma-spec-reporter",
      "karma-sourcemap-loader",
      "karma-chrome-launcher",
    ],
  })
}
