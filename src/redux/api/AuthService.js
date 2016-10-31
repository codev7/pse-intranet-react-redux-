import { APIConstants } from './APIConstants.js'
import request from 'superagent-bluebird-promise'

export function sendSignInRequest (username, password) {
  return new Promise((resolve, reject) => {

    request.post(`${APIConstants.API_SERVER_NAME}${APIConstants.AUTH_GET_ACCESS_TOKEN}`)
      .send(JSON.stringify({ 'username': username, 'password': password }))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        resolve(JSON.parse(response.text))
      }, function (err) {
        console.log(err)
        resolve(JSON.parse(err.res.text))
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

    request.post(`${APIConstants.API_SERVER_NAME}${APIConstants.AUTH_GET_REFRESH_TOKEN}`)
      .send(JSON.stringify({ 'refresh_token': refreshToken }))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        const res = JSON.parse(response.text)

        if (res.error) {
          console.log('Refresh Token Failed!')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')

          reject(res.error)
        } else {
          console.log('Token Refreshed!')
          resolve(res)
        }

      })

  })
}

export function sendRevokeTokenRequest (accessToken) {

  return new Promise((resolve, reject) => {

    request.post(`${APIConstants.API_SERVER_NAME}${APIConstants.REVOKE_TOKEN}`)
      .send(JSON.stringify({ 'access_token': accessToken }))
      .set('Content-Type', 'application/json')
      .then(function (response) {
        resolve(JSON.parse(response.text))
      })

  })
}
