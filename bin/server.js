const https = require('https')
const http = require('http')
const fs = require('fs')
const config = require('../config')
const app = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port

/*
if (config.env == 'localhost'){
  http.createServer(app).listen(port, function() {
    debug(`Server is now running at http://localhost:${port}.`)
  })
} else {
  https.createServer({
    key: fs.readFileSync('keys/server.key'),
    cert: fs.readFileSync('keys/server.crt')
  }, app)
    .listen(port, function () {
      debug(`Secure Server is now running at https://${config.server_host}:${port}.`)
    })
}
*/

app.listen(port)
debug(`Server is now running at http://localhost:${port}.`)
