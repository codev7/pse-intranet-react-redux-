const router = require('express').Router()
const CONFIG = require('./constants')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.post('/oauth/access_token', function (req, res, next) {
  const formData = {
    'username': req.body.username,
    'password': req.body.password,
    'client_id': CONFIG.CLIENT_ID,
    'client_secret': CONFIG.CLIENT_SECRET
  }

  res.send(formData)
})

module.exports = router
