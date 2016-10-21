import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/pse'
import { Link, IndexLink } from 'react-router'

import { logoutAndRedirect } from 'redux/modules/auth'
import HomeHeader from 'components/Header/headerComponent'

import $ from 'jquery'
window.jQuery = $

import menuAim from 'jquery-menu-aim'

export class HomePageView extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    logoutAndRedirect: PropTypes.func,
    children: PropTypes.element
  };

  constructor () {
    super()
    this.state = {
      'tab': 'Dashboard tab'
    }
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

    moveNavigation()
    checkScrollbarPosition()
    $(window).on('resize', function () {
      if (!resizing) {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation)
        resizing = true
      }
    })

    $(window).on('scroll', function () {
      if (!scrolling) {
        (!window.requestAnimationFrame) ? setTimeout(checkScrollbarPosition, 300) : window.requestAnimationFrame(checkScrollbarPosition)
        scrolling = true
      }
    })

// mobile only - open sidebar when user clicks the hamburger menu
    sidebarTrigger.on('click', function (event) {
      event.preventDefault()
      $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible')
    })

// Click on account and show submenu - desktop version only
    accountInfo.children('a').on('click', function (event) {
      const mq = checkMQ()
      console.log(mq)
      if ((mq === 'desktop') || (mq === 'tablet')) {
        event.preventDefault()
        accountInfo.toggleClass('selected')
      }
    })

    function checkMQ () {
      // check if mobile or desktop device
      if (window) {
        return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '')
      } else {
        return
      }
    }

    function moveNavigation () {
      const mq = checkMQ()

      if (mq === 'mobile' && topNavigation.parents('.cd-side-nav').length === 0) {
        detachElements()
        topNavigation.appendTo(sidebar)
        searchForm.removeClass('is-hidden').prependTo(sidebar)
      } else if ((mq === 'tablet' || mq === 'desktop') && topNavigation.parents('.cd-side-nav').length > 0) {
        detachElements()
        searchForm.insertAfter(header.find('.cd-logo'))
        topNavigation.appendTo(header.find('.cd-nav'))
      }
      // checkSelected(mq)
      resizing = false
    }

    function detachElements () {
      topNavigation.detach()
      searchForm.detach()
    }

    function checkScrollbarPosition () {
      var mq = checkMQ()

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
    }

  }

  handleLogOut () {
    this.props.logoutAndRedirect()
  }

  render () {
    return (
      <div>
        <HomeHeader logout={::this.handleLogOut} />
        <main className='cd-main-content'>
          <nav className='cd-side-nav'>
            <ul>
              <li className='has-children overview'>
                <IndexLink to='/intranet/dashboard' activeClassName='active'>Dashboard</IndexLink>
              </li>
              <li className='has-children users'>
                <IndexLink to='/intranet/clients' activeClassName='active'>Clients</IndexLink>
              </li>
              <li className='has-children comments'>
                <IndexLink to='/intranet/projects' activeClassName='active'>Projects</IndexLink>
              </li>
              <li className='has-children comments'>
                <IndexLink to='/intranet/geotechs' activeClassName='active'>Geotechs</IndexLink>
              </li>
              <li className='has-children users'>
                <IndexLink to='/intranet/pse' activeClassName='active'>My PSE</IndexLink>
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
