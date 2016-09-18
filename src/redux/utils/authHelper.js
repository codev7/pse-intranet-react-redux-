import { getCurrentUser, getRefreshToken } from '../api/AuthService.js'

export function requireAuth (nextState, replace) {
  const loggedIn = !!localStorage.accessToken && !!localStorage.refreshToken

  if (!loggedIn) {
    replace({
      pathname: '/sign-in',
      state: { nextPathname: nextState.location.pathname }
    })
  } else {
    const accessToken = localStorage.accessToken
    const refreshToken = localStorage.refreshToken
    getCurrentUser(accessToken).then(
      (response) => {
        if (response.status_code === 403) {
          getRefreshToken(refreshToken).then(
            (responseRefreshToken) => {
              localStorage.setItem('accessToken', responseRefreshToken.data.access_token)
              localStorage.setItem('refreshToken', responseRefreshToken.data.refresh_token)
            }
          ).catch((err) => console.log(err))
          localStorage.removeItem('me')
        } else if (response.status_code === 200) {
          localStorage.setItem('me', JSON.stringify(response.data))
        }
      }
    )
  }
}

export function loggedIn (nextState, replace) {
  const loggedIn = !!localStorage.accessToken
  if (loggedIn) {
    replace({
      pathname: '/intranet',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
