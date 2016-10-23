import React from 'react'
import { Route, IndexRedirect, IndexRoute } from 'react-router'
import { requireAuth, loggedIn } from 'redux/utils/authHelper.js'

import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import SignInPageView from 'views/SignInPageView/SignInPageView'
import HomePageView from 'views/HomePageView/HomePageView'

import MyPSETab from 'components/Tabcontents/mypseTab'
import ClientsTab from 'components/Tabcontents/clientsTab'
import DashboardTab from 'components/Tabcontents/dashboardTab'
import ProjectsTab from 'components/Tabcontents/projectsTab'
import GeotechsTab from 'components/Tabcontents/geotechsTab'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='sign-in' />
    <Route path='/intranet' component={HomePageView} onEnter={requireAuth} >
      <IndexRoute component={DashboardTab} />
      <Route path='dashboard' component={DashboardTab} />
      <Route path='clients' component={ClientsTab} />
      <Route path='projects' component={ProjectsTab} />
      <Route path='geotechs' component={GeotechsTab} />
      <Route path='mypse' component={MyPSETab} />
    </Route>
    <Route path='sign-in' component={SignInPageView} onEnter={loggedIn} />
  </Route>
)
