import Home from './HomePageView'
import Dashboard from './Tabcontents/dashboardTab'

export const createRoutes = (store) => ({
  path        : 'home',
  component   : Home,
  indexRoute  : Dashboard
})

export default createRoutes
