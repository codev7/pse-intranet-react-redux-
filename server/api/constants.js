const CONFIG = {
  API_SERVER_NAME: process.env.API_SERVER_NAME || 'https://Api-dev.pseglobal.com/',
  CLIENT_ID: process.env.CLIENT_ID || 'aW50cmFuZXQgcHJvZHVjdGlvbiBwc2Ugc2',
  CLIENT_SECRET: process.env.CLIENT_SECRET || 'QEAgcHJvZHVjdGlvbiAzMyBpbnRyYW5ldC',
  AUTH_GET_ACCESS_TOKEN: 'oauth/access_token',
  AUTH_GET_REFRESH_TOKEN: 'oauth/refresh_token',
  REVOKE_TOKEN: 'oauth/revoke_token',
  GET_CURRENT_USER: 'me',
  GET_LIST_CLIENTS: '/clients',
  CREATE_CLIENT: '/clients'
}

module.exports = CONFIG
