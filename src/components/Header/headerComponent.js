import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

class HomeHeader extends React.Component {
  static propTypes = {
    logout: PropTypes.func,
    toggleOptionFunc: PropTypes.func
  };

  constructor() {
    super()
    this.handleLogOut = this.handleLogOut.bind(this)
    this.triggerMobileMenu = this.triggerMobileMenu.bind(this)
  }

  handleLogOut () {
    this.props.logout()
  }

  triggerMobileMenu (e) {
    e.preventDefault()
    const sidebar = $('.cd-side-nav')
    const sidebarTrigger = $('.cd-nav-trigger')
    $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible')
  }

  componentDidMount () {
    // require('jquery-script.js')
  }

  render () {
    return (
      <div>
        <header className='cd-main-header'>
          <a href='https://pseglobal.com/' className='cd-logo'>PSE</a>
          <div className='cd-search is-hidden'>
            <form action='#'>
              <input type='search' name='search' placeholder='Search...' />
            </form>
          </div>

          <a href='#0' className='cd-nav-trigger' onClick={this.triggerMobileMenu}><span /></a>

          <nav className='cd-nav'>
            <ul className='cd-top-nav'>
              <li className='has-children account'>
                <a href='#0' onClick={this.props.toggleOptionFunc}>
                  Options
                </a>
                <ul>
                  <li onClick={this.handleLogOut}><a href='#0'>Logout</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})
export default connect((mapStateToProps), {})(HomeHeader)

