const CONFIG = require('./constants')
const request = require('superagent-bluebird-promise')

const clients = {
  getClientsList: function (req, res) {
    if (req.body.access_token) {
      const accessToken = req.body.access_token
      const pageId = req.body.page_id

      request.get(`${CONFIG.API_SERVER_NAME}${CONFIG.GET_LIST_CLIENTS}?access_token=${accessToken}&page=${pageId}`)
        .set('Content-Type', 'application/json')
        .then(function (response) {
          res.send(JSON.parse(response.text))
        }, function (err) {
          res.send(JSON.parse(err.res.text))
        })

    } else {
      res.status(403).send('Need access token parameter')
    }

  },
  createClient: function (req, res) {
    const formData = {
      'access_token': req.body.access_token,
      'name': req.body.name
    }
    request.post(`${CONFIG.API_SERVER_NAME}${CONFIG.CREATE_CLIENT}`)
      .send(JSON.stringify(formData))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        res.send(JSON.parse(response.text))
      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  }
}

module.exports = clients
