/* eslint comma-dangle: "off" */
const path = require('path')
module.exports = function (name, cache = true) {
  if (cache) {
    return [{
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve(__dirname, '../', 'node_modules/.cache/' + name),
        // cacheIdentifier: '51f779c4'
      }
    }]
  }
  return []
}
