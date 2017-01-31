const config = require('../config')
const app = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = config.server_port

app.listen(port)
debug(`Server is now running at http://localhost:${port}.`)
