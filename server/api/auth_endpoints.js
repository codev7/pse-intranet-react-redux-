const CONFIG = require('./constants')
const request = require('superagent-bluebird-promise')

const auth = {
  getAccessToken: function (req, res) {
    const formData = {
      'username': req.body.username,
      'password': req.body.password,
      'client_id': CONFIG.CLIENT_ID,
      'client_secret': CONFIG.CLIENT_SECRET
    }
    request.post(`${CONFIG.API_SERVER_NAME}${CONFIG.AUTH_GET_ACCESS_TOKEN}`)
      .send(JSON.stringify(formData))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        res.send(JSON.parse(response.text))
      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  },
  getRefreshToken: function (req, res) {
    const formData = {
      'refresh_token': req.body.refresh_token,
      'client_id': CONFIG.CLIENT_ID,
      'client_secret': CONFIG.CLIENT_SECRET
    }
    request.post(`${CONFIG.API_SERVER_NAME}${CONFIG.AUTH_GET_REFRESH_TOKEN}`)
      .send(JSON.stringify(formData))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        res.send(JSON.parse(response.text))
      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  },
  sendRevokeTokenRequest: function (req, res) {
    const formData = {
      'access_token': req.body.access_token
    }
    request.post(`${CONFIG.API_SERVER_NAME}${CONFIG.REVOKE_TOKEN}`)
      .send(JSON.stringify(formData))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        res.send(JSON.parse(response.text))
      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  }
}

module.exports = auth
