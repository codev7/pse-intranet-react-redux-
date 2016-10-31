import { APIConstants } from './APIConstants.js'
import request from 'superagent-bluebird-promise'

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
    request.post(`${APIConstants.API_SERVER_NAME}${APIConstants.GET_CURRENT_USER}`)
        .send(JSON.stringify({ 'access_token': accessToken }))
        .set('Content-Type', 'application/json')
        .then(function (response) {
          resolve(JSON.parse(response.text))
        }, function (err) {
          console.log(err)
          resolve(JSON.parse(err.res.text))
        })
  })
}

export function getRefreshToken (refreshToken) {
  return new Promise((resolve, reject) => {
    fetch(`${APIConstants.API_SERVER_NAME}${APIConstants.AUTH_GET_REFRESH_TOKEN}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'refresh_token': refreshToken
      })
    }).then((responseTokens) => responseTokens.json())
    .then((jsonTokens) => {
      if (jsonTokens.error) {
        console.log('Refresh Token Failed!')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        reject(jsonTokens.error)
      } else {
        console.log('Token Refreshed!')
        resolve(jsonTokens)
      }
    })
  })
}

export function sendRevokeTokenRequest (accessToken) {

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
      resolve(jsonRes)
    })
  })
}
