module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": "3.2.1",
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    ['@vue/babel-preset-jsx'],
    // ts 转换核心
    ['@babel/preset-typescript', {
      'isTSX': true,
      'allExtensions': true
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    // ts 类属性支持
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ts 装饰器支持
    ['@babel/plugin-proposal-class-properties', { 'loose': true }]
  ]
}
