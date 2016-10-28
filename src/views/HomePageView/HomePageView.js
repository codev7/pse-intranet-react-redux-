import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/pse'
import { Link, IndexLink } from 'react-router'

import { logoutAndRedirect } from '../../redux/modules/auth'
import HomeHeader from '../../components/Header/headerComponent'

import $ from 'jquery'
window.jQuery = $

import menuAim from 'jquery-menu-aim'

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
  }

  componentDidMount () {

    const mainContent = $('.cd-main-content')
    const header = $('.cd-main-header')
    const sidebar = $('.cd-side-nav')
    const sidebarTrigger = $('.cd-nav-trigger')
    const topNavigation = $('.cd-top-nav')
    const searchForm = $('.cd-search')
    const accountInfo = $('.account')

    let resizing = false
    let scrolling = false

    // checkScrollbarPosition()
    // $(window).on('resize', function () {
    //   if (!resizing) {
    //     (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation)
    //     resizing = true
    //   }
    // })

    // $(window).on('scroll', function () {
    //   if (!scrolling) {
    //     (!window.requestAnimationFrame) ? setTimeout(checkScrollbarPosition, 300) : window.requestAnimationFrame(checkScrollbarPosition)
    //     scrolling = true
    //   }
    // })

    sidebarTrigger.on('click', function (event) {
      event.preventDefault()
      $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible')
    })

    $('.cd-side-nav li.tab-link a').on('click', function(){
      if (checkMQ() == 'mobile') {
        $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible')
      }
    })

    accountInfo.children('a').on('click', function (event) {
      event.preventDefault()
      accountInfo.toggleClass('selected')
    })

    // function detachElements () {
    //   topNavigation.detach()
    //   searchForm.detach()
    // }
/*
    function checkScrollbarPosition () {
      var mq = checkMQ()
      console.log(mq)

      if (mq !== 'mobile') {
        var sidebarHeight = sidebar.outerHeight(),
          windowHeight = $(window).height(),
          mainContentHeight = mainContent.outerHeight(),
          scrollTop = $(window).scrollTop()

        if ((scrollTop + windowHeight > sidebarHeight) && (mainContentHeight - sidebarHeight !== 0)) {
          sidebar.addClass('is-fixed').css('bottom', 0)
        }

      }
      scrolling = false
    }*/

    function checkMQ () {
      // check if mobile or desktop device
      if (window) {
        return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '')
      } else {
        return
      }
    }

  }

  handleLogOut () {
    this.props.logoutAndRedirect()
  }

  render () {
    return (
      <div>
        <HomeHeader logout={this.handleLogOut} />
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
                <a href='#0'>
                  Options
                </a>
                <ul>
                  <li><a href='#0' onClick={this.handleLogOut}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className='content-wrapper'>
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
