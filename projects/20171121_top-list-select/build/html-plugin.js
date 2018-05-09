const fs = require('fs')
const path = require('path')
function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    // 编译开始
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      console.log(htmlPluginData.html)
      var date = fs.readFileSync(path.resolve(__dirname, './clientjs-adaptive.js'), 'utf-8')
      htmlPluginData.html = htmlPluginData.html.replace(/<\/head>/, `<script>${date}</script>$&`)
      callback(null, htmlPluginData)
    })
    // compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
    //   var date = fs.readFileSync(path.resolve(__dirname, './clientjs-adaptive.js'), 'utf-8')
    //   htmlPluginData.html = htmlPluginData.html.replace(/<\/head>/, `<script>${date}</script>$&`)
    //   callback(null, htmlPluginData)
    // });
  });
};

module.exports = MyPlugin;
