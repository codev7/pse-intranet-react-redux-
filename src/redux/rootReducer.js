import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import pse from './modules/pse.js'
import auth from './modules/auth.js'

export default combineReducers({
  pse,
  auth,
  router
})
