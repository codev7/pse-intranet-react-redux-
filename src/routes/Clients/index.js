import { injectReducer } from '../../store/reducers'

import { initialState, ACTION_HANDLERS } from './Modules/module'

export default (store) => {
  return (nextState, cb) => {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {

      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const ClientsTabContainer = require('./Clients').default

      const ClientsReducer = (state = initialState, action) => {

        const handler = ACTION_HANDLERS[action.type]

        return handler ? handler(state, action) : state
      }

      /*  Add the reducer to the store on key 'clients'  */
      injectReducer(store, {key: 'clients', reducer: ClientsReducer})

      /*  Return getComponent   */
      cb(null, ClientsTabContainer)

      /* Webpack named bundle   */
    }, 'clients')
  }
}
