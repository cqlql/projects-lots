const karma = require('karma')
const cfg = karma.config
const path = require('path')

const karmaConfig = cfg.parseConfig(path.resolve(__dirname, './karma.conf.js'))

var Server = karma.Server
var server = new Server(karmaConfig, function (exitCode) {
  console.log('Karma has exited with ' + exitCode)
  process.exit(exitCode)
})

server.start()
