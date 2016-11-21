const CONFIG = require('./constants')
const request = require('superagent-bluebird-promise')
const queryString = require('query-string')

const clients = {
  getClientsList: function (req, res) {
    if (req.body.access_token) {
      const params = queryString.stringify(req.body)

      request.get(`${CONFIG.API_SERVER_NAME}${CONFIG.GET_LIST_CLIENTS}?${params}`)
        .then(function (response) {
          res.send(JSON.parse(response.text))
        }, function (err) {
          res.send(JSON.parse(err.res.text))
        })

    } else {
      res.status(403).send('Need access token parameter')
    }

  },

  getClientInfo: function (req, res) {
    if (req.body.access_token) {
      const token = req.body.access_token, id = req.body.id

      request.get(`${CONFIG.API_SERVER_NAME}${CONFIG.GET_LIST_CLIENTS}/${id}?access_token=${token}&include[]=all`)
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
  },

  DeleteClientNote: function (req, res) {
    const clientId = req.body.client_id, noteId = req.body.note_id, accessToken = req.body.access_token
    console.log(`${CONFIG.API_SERVER_NAME}clients/${clientId}/notes/${noteId}`, accessToken)
    request.del(`${CONFIG.API_SERVER_NAME}clients/${clientId}/notes/${noteId}`)
      .send(JSON.stringify({'access_token': accessToken}))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        console.log(response)
        if(response.status_code == 204){
          res.status(204).send({'result': 'success'})
        }else{
          res.send(response)
        }

      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  },

  AddClientNote: function (req, res) {
    const clientId = req.body.client_id,
      formData = {
        'access_token': req.body.access_token,
        'note': req.body.note,
        'type_id': req.body.type['id']
      }
    console.log(formData)

    request.post(`${CONFIG.API_SERVER_NAME}clients/${clientId}/notes`)
      .send(JSON.stringify(formData))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        res.send(JSON.parse(response.text))
      }, function (err) {
        res.send(JSON.parse(err.res.text))
      })
  },

  UpdateClientNote: function (req, res) {
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
