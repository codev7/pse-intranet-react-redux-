import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import locationReducer from './location'
import authReducer from '../routes/SignIn/Auth/Auth'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authReducer,
    ...asyncReducers,
    routing: routerReducer
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
