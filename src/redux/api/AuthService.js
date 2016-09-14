import { APIConstants } from './APIConstants.js'
import fetch from 'isomorphic-fetch'

// export function sendSignInRequest (username, password) {
//   return new Promise((resolve, reject) => {
//     const data = new FormData()
//     data.append('username', username)
//     data.append('password', password)
//     fetch(`${APIConstants.AUTH_ENDPOINT}${APIConstants.AUTH_GET_ACCESS_TOKEN}`, {
//       method: 'post',
//       body: data,
//     }).then((responseAuth) => responseAuth.json())
//     .then((jsonResponseAuth) => {
//       resolve(jsonResponseAuth)
//     })
//   })
// }

export function sendSignInRequest (username, password) {
  return new Promise((resolve, reject) => {

    fetch(`${APIConstants.AUTH_ENDPOINT}${APIConstants.AUTH_GET_ACCESS_TOKEN}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username': username, 'password': password, 'client_id': '123', 'client_secret': '456'})
    }).then((responseAuth) => responseAuth.json())
    .then((jsonResponseAuth) => {
      resolve(jsonResponseAuth)
    })
  })
}

export function getCurrentUser (accessToken, refreshToken) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.GET_CURRENT_USER}?access_token=${accessToken}`)
    .then((responseUser) => responseUser.json())
    .then((jsonUser) => {
      if (jsonUser.status_code === 403) {
        getRefreshToken(localStorage.refreshToken).then(
          (responseRefreshToken) => {
            fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.GET_CURRENT_USER}?access_token=${accessToken}`)
                .then((responseUser) => responseUser.json())
                .then((jsonUser) => resolve(jsonUser.data))
          },
          (responseError) => {
            reject()
          })
      } else {
        resolve(jsonUser.data)
      }
    })
  })
}

export function getRefreshToken (refreshToken) {
  const data = new FormData()
  data.append('refresh_token', refreshToken)
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.AUTH_ENDPOINT}${APIConstants.AUTH_GET_REFRESH_TOKEN}`, {
      method: 'post',
      body: data,
    }).then((responseTokens) => responseTokens.json())
    .then((jsonTokens) => {
      if (jsonTokens.error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/sign-in'
      } else {
        localStorage.setItem('accessToken', jsonTokens.access_token)
        localStorage.setItem('refreshToken', jsonTokens.refresh_token)
        resolve(jsonTokens)
      }
    })
  })
}

export function sendRevokeTokenRequest (accessToken, refreshToken) {
  const data = new FormData()
  data.append('access_token', accessToken)
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.REVOKE_TOKEN}`, {
      method: 'post',
      body: data,
    }).then((res) => res.json())
    .then((jsonRes) => {
      if (jsonRes.error) {
        getRefreshToken(refreshToken).then(
          (responseRefreshToken) => {
            fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.REVOKE_TOKEN}`, {
              method: 'post',
              body: data,
            }).then((_res) => resolve())
          },
          (responseError) => {
            reject()
          })
      } else {
        resolve()
      }
    })
  })
}
