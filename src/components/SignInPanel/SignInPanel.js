import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/modules/auth.js'

class SignInPanel extends React.Component {

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    authError: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired
  };

  handleSignIn = (e) => {
    e.preventDefault()
    const email = this.refs.email.value
    const password = this.refs.password.value
    this.props.loginUser(email, password)
  }

  constructor () {
    super()
    this.handleSignIn = this.handleSignIn.bind(this)
  }

  render () {
    return (
      <div className='auth_wrapper'>
        <form className='sign_in_form' role='form'>
          <p className='sign_in_form_title'>
            <i className='ion-social-buffer' />
          PSE
          </p>
          <input type='text' className='sign_in_form_input'
            ref='email' placeholder='Email' autoFocus required />
          <i className='fa fa-user' />
          <input type='password' className='sign_in_form_input'
            ref='password' placeholder='Password' required />
          <i className='fa fa-key' />
            {this.props.authError && <h5 className='sign_in_form_auth_error'>
            <i className='fa fa-ban' aria-hidden />
            {this.props.errorText}.</h5>}
          <button className='sign_in_form_btn' onClick={this.handleSignIn}>
            Log in
            {this.props.isAuthenticating && <i className='fa fa-spinner fa-spin fa-fw' />}
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  authError: state.auth.authError,
  errorText: state.auth.errorText
})
export default connect((mapStateToProps), {
  loginUser
})(SignInPanel)
