const router = require('express').Router()
const auth = require('./auth_endpoints')
const users = require('./users_endpoints')
const clients = require('./clients_endpoints')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Auth Endpoints
router.post('/oauth/access_token', auth.getAccessToken)
router.post('/oauth/refresh_token', auth.getRefreshToken)
router.post('/oauth/revoke_token', auth.sendRevokeTokenRequest)

//Clients Endpoints
router.post('/clients_list', clients.getClientsList)
router.post('/client_info', clients.getClientInfo)
router.post('/clients_create', clients.createClient)

router.post('/client_note_add', clients.AddClientNote)
router.post('/client_note_delete', clients.DeleteClientNote)
router.post('/client_note_update', clients.UpdateClientNote)

// User Endpoints
router.post('/me', users.me)

module.exports = router
