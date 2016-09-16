import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router } from 'react-router'

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired
  };

  componentDidMount () {
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941
    injectTapEventPlugin()
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
