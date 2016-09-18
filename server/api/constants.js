const CONFIG = {
  CLIENT_ID: process.env.CLIENT_ID || '123',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '456',
  AUTH_GET_ACCESS_TOKEN: 'oauth/access_token',
  AUTH_GET_REFRESH_TOKEN: 'oauth/refresh_token',
  REVOKE_TOKEN: 'oauth/revoke_token',
  API_SERVER_NAME: 'https://api.pseglobal.com/',
  GET_CURRENT_USER: 'me'
}

module.exports = CONFIG
