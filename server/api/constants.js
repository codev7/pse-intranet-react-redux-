const CONFIG = {
  API_SERVER_NAME: process.env.API_SERVER_NAME || 'https://api-dev.pseglobal.com/',
  CLIENT_ID: process.env.CLIENT_ID || 'cHNlIGludHJhbmV0IGxvY2FsaG9zdCBkZX',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'cGFzc3dvcmQgZm9yIGxvY2FsaG9zdCBpbn',
  AUTH_GET_ACCESS_TOKEN: 'oauth/access_token',
  AUTH_GET_REFRESH_TOKEN: 'oauth/refresh_token',
  REVOKE_TOKEN: 'oauth/revoke_token',
  GET_CURRENT_USER: 'me',
  GET_LIST_CLIENTS: '/clients',
  CREATE_CLIENT: '/clients'
}

module.exports = CONFIG
