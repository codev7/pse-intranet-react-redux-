import { APIConstants } from './APIConstants.js'
import fetch from 'isomorphic-fetch'

export function sendSignInRequest (username, password) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.AUTH_GET_ACCESS_TOKEN}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': username,
        'password': password
      })
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
      resolve(jsonUser)
      // if (jsonUser.status_code === 403) {
      //   getRefreshToken(localStorage.refreshToken).then(
      //     (responseRefreshToken) => {
      //       fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.GET_CURRENT_USER}?access_token=${accessToken}`)
      //           .then((responseUser) => responseUser.json())
      //           .then((jsonUser) => resolve(jsonUser.data))
      //     },
      //     (responseError) => {
      //       reject()
      //     })
      // } else {
      //   resolve(jsonUser.data)
      // }
    })
  })
}

export function getRefreshToken (refreshToken) {
  // const data = new FormData()
  // data.append('refresh_token', refreshToken)
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.AUTH_GET_REFRESH_TOKEN}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'refresh_token': refreshToken,
        'client_id': APIConstants.CLIENT_ID,
        'client_secret': APIConstants.CLIENT_SECRET
      })
    }).then((responseTokens) => responseTokens.json())
    .then((jsonTokens) => {
      if (jsonTokens.error) {
        console.log('Refresh Token Failed!')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/sign-in'
      } else {
        console.log('Token Refreshed!')
        resolve(jsonTokens)
      }
    })
  })
}

export function sendRevokeTokenRequest (accessToken, refreshToken) {
  // const data = new FormData()
  // data.append('access_token', accessToken)
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.REVOKE_TOKEN}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'access_token': accessToken
      })
    }).then((res) => res.json())
    .then((jsonRes) => {
      // if (jsonRes.error) {
      //   getRefreshToken(refreshToken).then(
      //     (responseRefreshToken) => {
      //       fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.REVOKE_TOKEN}`, {
      //         method: 'post',
      //         headers: {
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           'access_token': accessToken,
      //         }),
      //       }).then((_res) => resolve())
      //     },
      //     (responseError) => {
      //       reject()
      //     })
      // } else {
      //   resolve()
      // }

      resolve(jsonRes)
    })
  })
}
