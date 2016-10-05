import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class HomeHeader extends React.Component {
  static propTypes = {
    logout: PropTypes.func
  };

  constructor() {
    super()
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  handleLogOut () {
    this.props.logout()
  }

  componentDidMount () {
    // require('jquery-script.js')
  }

  render () {
    return (
      <div>
        <header className='cd-main-header'>
          <a href='#0' className='cd-logo'>PSE</a>
          <div className='cd-search is-hidden'>
            <form action='#0'>
              <input type='search' name='search' placeholder='Search...' />
            </form>
          </div>

          <a href='#0' className='cd-nav-trigger'><span /></a>

          <nav className='cd-nav'>
            <ul className='cd-top-nav'>
              <li className='has-children account'>
                <a href='#0'>
                  User
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

