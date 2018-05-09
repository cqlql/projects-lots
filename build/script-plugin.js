
function MyPlugin(links) {
  this.links = links
}

MyPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', compilation => {
    // 编译开始
    compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
      htmlPluginData.assets.js = this.links.concat(htmlPluginData.assets.js)
    });
  });
};

module.exports = MyPlugin;
