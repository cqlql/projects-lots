function CompileEventsPlugin (options) {
  this.options = options
}

CompileEventsPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compile', params => {
    const { compile } = this.options
    compile && compile()
  })
  compiler.plugin('done', params => {
    const { done } = this.options
    done && done()
  })
}

module.exports = CompileEventsPlugin
