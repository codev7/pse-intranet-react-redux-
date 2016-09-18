const router = require('express').Router()
const auth = require('./auth_endpoints')
const users = require('./users_endpoints')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Auth Endpoints
router.post('/oauth/access_token', auth.getAccessToken)
router.post('/oauth/refresh_token', auth.getRefreshToken)
router.post('/oauth/revoke_token', auth.sendRevokeTokenRequest)

// User Endpoints
router.post('/me', users.me)

module.exports = router
