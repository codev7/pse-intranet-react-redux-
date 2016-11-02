import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import SignInPanel from './SignInPanel/SignInPanel'

export class SignInPageView extends React.Component {
  static propTypes = {
    page: PropTypes.string
  };

  render () {
    return (
      <div>
        <SignInPanel />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})
export default connect((mapStateToProps), {
})(SignInPageView)
