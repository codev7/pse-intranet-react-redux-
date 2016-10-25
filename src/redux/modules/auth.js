import * as AuthService from '../api/AuthService.js'
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const GET_REFRESH_TOKEN = 'GET_REFRESH_TOKEN'
export const LOGOUT_USER = 'LOGOUT_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const loginUserSuccess = (accessToken, refreshToken, user) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
  return {
    type: LOGIN_USER_SUCCESS,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user
  }
}

export const loginUserFailure = (error) => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  return {
    type: LOGIN_USER_FAILURE,
    errorText: error
  }
}

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('me')
  return {
    type: LOGOUT_USER
  }
}

export const logoutAndRedirect = () => {
  return (dispatch, getState) => {
    AuthService.sendRevokeTokenRequest(localStorage.accessToken, localStorage.refreshToken).then(
      () => {
        dispatch(logout())
        dispatch(push('/sign-in'))
      },
      (errorMsg) => {
        console.log(errorMsg)
        dispatch(logout())
        dispatch(push('/sign-in'))
      })
  }
}

export const loginUser = (email, password, redirect = '/') => {
  return (dispatch) => {
    dispatch(loginUserRequest())
    AuthService.sendSignInRequest(email, password).then(
      (responseAuth) => {
        if (responseAuth.status_code === 200) {
          const accessToken = responseAuth.data.access_token
          const refreshToken = responseAuth.data.refresh_token
          setTimeout(() => {
            dispatch(push('/dashboard'))
          }, 500)
          dispatch(loginUserSuccess(accessToken, refreshToken, {}))
        } else {
          dispatch(loginUserFailure(responseAuth.error[0].message))
        }
      }
    )
  }
}

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  errorText: '',
  authError: false,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

const ACTION_HANDLERS = {
  [LOGIN_USER_REQUEST]: (state, action) => {
    return ({
      ...state,
      'isAuthenticating': true,
      'authError': false,
      'statusText': null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, action) => {
    return ({
      ...state,
      'isAuthenticating': false,
      'isAuthenticated': true,
      'authError': false,
      'user': action.user,
      'accessToken': action.accessToken,
      'refreshToken': action.refreshToken,
      'statusText': 'You have been successfully logged in.'
    })
  },
  [LOGIN_USER_FAILURE]: (state, action) => {
    return ({
      ...state,
      'isAuthenticating': false,
      'isAuthenticated': false,
      'authError': true,
      'statusText': `Authentication Error: ${action.errorText}`,
      'errorText': action.errorText
    })
  },
  [LOGOUT_USER]: (state, payload) => {
    return ({
      ...state,
      'isAuthenticated': false,
      'token': null,
      'userName': null,
      'statusText': 'You have been successfully logged out.'
    })
  }
}

export default function AuthReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
