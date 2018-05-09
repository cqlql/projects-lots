function CompileEventsPlugin(options) {
  this.options = options
}

CompileEventsPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compile', params => {
    this.options.compile()
  });
  compiler.plugin('done', params => {
    this.options.done()
  });
};

module.exports = CompileEventsPlugin;
