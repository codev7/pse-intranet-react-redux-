import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import { logoutAndRedirect } from '../SignIn/Auth/Auth'
import HomeHeader from '../../components/Header/headerComponent'

import $ from 'jquery'

export class HomePageView extends React.Component {
  static propTypes = {
    logoutAndRedirect: PropTypes.func,
    children: PropTypes.element
  };

  constructor () {
    super()
    this.state = {
      'tab': 'Dashboard tab'
    }

    this.handleLogOut = this.handleLogOut.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
  }

  componentDidMount () {

    const sidebar = $('.cd-side-nav')
    const sidebarTrigger = $('.cd-nav-trigger')

    $('.cd-side-nav li.tab-link a').on('click', function(){
      if (window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '') == 'mobile') {
        $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible')
      }
    })

  }

  handleLogOut () {
    this.props.logoutAndRedirect()
  }

  toggleOptions(e){
    e.preventDefault()
    $('.account').toggleClass('selected')
  }

  render () {
    return (
      <div>
        <HomeHeader logout={this.handleLogOut} toggleOptionFunc={this.toggleOptions} />
        <main className='cd-main-content'>
          <nav className='cd-side-nav'>
            <ul>
              <li className='tab-link overview'>
                <IndexLink to='dashboard' activeClassName='active'>Dashboard</IndexLink>
              </li>
              <li className='tab-link clients'>
                <IndexLink to='clients' activeClassName='active'>Clients</IndexLink>
              </li>
              <li className='tab-link comments'>
                <IndexLink to='projects' activeClassName='active'>Projects</IndexLink>
              </li>
              <li className='tab-link comments'>
                <IndexLink to='geotechs' activeClassName='active'>Geotechs</IndexLink>
              </li>
              <li className='tab-link users'>
                <IndexLink to='mypse' activeClassName='active'>My PSE</IndexLink>
              </li>
              <li className='has-children account visible-xs'>
                <a href='#0' onClick={this.toggleOptions}>
                  Options
                </a>
                <ul>
                  <li><a href='#0' onClick={this.handleLogOut}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className='content-wrapper' id='scroll-content'>
            {this.props.children}
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect((mapStateToProps), {
  logoutAndRedirect
})(HomePageView)
