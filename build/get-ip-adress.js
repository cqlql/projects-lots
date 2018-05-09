
let ipAdress
module.exports = function getIPAdress () {
  if (ipAdress) return ipAdress
  var interfaces = require('os').networkInterfaces()
  for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        ipAdress = alias.address
        return ipAdress
      }
    }
  }
}
