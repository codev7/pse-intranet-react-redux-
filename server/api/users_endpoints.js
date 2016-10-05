const CONFIG = require('./constants')
const request = require('superagent-bluebird-promise')

const users = {
  me: function (req, res) {
    if (req.body.access_token) {
      const accessToken = req.body.access_token

      request.get(`${CONFIG.API_SERVER_NAME}${CONFIG.GET_CURRENT_USER}?access_token=${accessToken}`)
        .then(function (response) {
          res.send(response.text)
        }, function (err) {
          res.send(JSON.parse(err.res.text))
        })
    } else {
      res.status(403).send('Need access token parameter')
    }
  }
}

module.exports = users
