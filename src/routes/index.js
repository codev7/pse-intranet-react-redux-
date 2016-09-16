import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { requireAuth, loggedIn } from 'redux/utils/authHelper.js'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import SignInPageView from 'views/SignInPageView/SignInPageView'
import HomePageView from 'views/HomePageView/HomePageView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='/sign-in' />
    <Route path='/intranet' component={HomePageView} onEnter={requireAuth} />
    <Route path='/sign-in' component={SignInPageView} onEnter={loggedIn} />
  </Route>
)
