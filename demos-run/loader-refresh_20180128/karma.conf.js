let getWebpackBaseConf = require('../../build/webpack.base')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha','chai-dom','chai'],
    files: [
      './test/**/*.js'
    ],
    preprocessors: {
      './test/**/*.js':['webpack', 'sourcemap']
    },
    webpack:{
      module: getWebpackBaseConf(__dirname).module,
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ["spec"],
    // browsers: ['Chrome', 'PhantomJS'],
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],
    plugins: [
      "karma-webpack",
      "karma-chai",
      "karma-chai-dom",
      "karma-spec-reporter",
      "karma-sourcemap-loader",
      "karma-mocha",
      // "karma-chrome-launcher",
      'karma-phantomjs-launcher',
    ],
  })
}
