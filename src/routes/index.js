import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { requireAuth, loggedIn, requireAuthOnChange } from '../components/AuthHelper/authHelper'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import SignInPageView from './SignIn/SignInPageView'
import HomePageView from './Home/HomePageView'

import MyPSETab from './Home/Tabs/mypseTab'
import ClientsTab from './Home/Tabs/clientsTab'
import DashboardTab from './Home/Tabs/dashboardTab'
import ProjectsTab from './Home/Tabs/projectsTab'
import GeotechsTab from './Home/Tabs/geotechsTab'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRedirect to='sign-in' />
    <Route path='/' component={HomePageView} onEnter={requireAuth} onChange={requireAuthOnChange}>
      <Route path='dashboard' component={DashboardTab} />
      <Route path='clients' component={ClientsTab} />
      <Route path='projects' component={ProjectsTab} />
      <Route path='geotechs' component={GeotechsTab} />
      <Route path='mypse' component={MyPSETab} />
    </Route>
    <Route path='sign-in' component={SignInPageView} onEnter={loggedIn} />
  </Route>
)
