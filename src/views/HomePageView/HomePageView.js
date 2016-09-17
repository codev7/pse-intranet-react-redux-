/* eslint-disable */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/pse'
import $ from 'jquery'
window.jQuery = $
import menuAim from 'jquery-menu-aim'

import { logoutAndRedirect } from 'redux/modules/auth.js'

export class HomePageView extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    logoutAndRedirect: PropTypes.func
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
    moveNavigation()
    $(window).on('resize', function () {
      if (!resizing) {
        (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation)
        resizing = true
      }
    })

    // on window scrolling - fix sidebar nav
    let scrolling = false
    checkScrollbarPosition()
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

    // click on item and show submenu
    $('.has-children > a').on('click', function (event) {
      const mq = checkMQ()
      const selectedItem = $(this)
      if (mq === 'mobile'|| mq === 'tablet') {
        event.preventDefault()
        if (selectedItem.parent('li').hasClass('selected')) {
          selectedItem.parent('li').removeClass('selected')
        } else {
          sidebar.find('.has-children.selected').removeClass('selected')
          accountInfo.removeClass('selected')
          selectedItem.parent('li').addClass('selected')
        }
      }
    })

    // Click on account and show submenu - desktop version only
    accountInfo.children('a').on('click', function (event) {
      const mq = checkMQ()
      if (mq === 'desktop') {
        event.preventDefault()
        accountInfo.toggleClass('selected')
        sidebar.find('.has-children.selected').removeClass('selected')
      }
    })

    $(document).on('click', function (event) {
      if (!$(event.target).is('.has-children a')) {
        sidebar.find('.has-children.selected').removeClass('selected')
        accountInfo.removeClass('selected')
      }
    })

    // on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
    sidebar.children('ul').menuAim({
      activate: function (row) {
        $(row).addClass('hover')
      },
      deactivate: function (row) {
        $(row).removeClass('hover')
      },
      exitMenu: function () {
        sidebar.find('.hover').removeClass('hover')
        return true
      },
      submenuSelector: '.has-children'
    })

    function checkMQ () {
      // check if mobile or desktop device
      return window.getComputedStyle(document.querySelector('.cd-main-content'), '::before').getPropertyValue('content').replace(/'/g, '').replace(/"/g, '')
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
      checkSelected(mq)
      resizing = false
    }

    function detachElements () {
      topNavigation.detach()
      searchForm.detach()
    }

    function checkSelected (mq) {
      // on desktop, remove selected class from items selected on mobile/tablet version
      if (mq === 'desktop') $('.has-children.selected').removeClass('selected')
    }

    function checkScrollbarPosition () {
      var mq = checkMQ()

      if (mq !== 'mobile') {
        var sidebarHeight = sidebar.outerHeight(),
          windowHeight = $(window).height(),
          mainContentHeight = mainContent.outerHeight(),
          scrollTop = $(window).scrollTop();
        ((scrollTop + windowHeight > sidebarHeight) && (mainContentHeight - sidebarHeight !== 0)) ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '')
      }
      scrolling = false
    }
  }

  handleLogOut () {
    this.props.logoutAndRedirect()
  }

  handleDashboardTabClick (e) {
    this.setState({
      tab: 'Dashboard tab'
    })
  }
  handleClientsTabClick (e) {
    this.setState({
      tab: 'Clients tab'
    })
  }
  handleProjectsTabClick (e) {
    this.setState({
      tab: 'Projects tab'
    })
  }
  handleGeotechsTabClick (e) {
    this.setState({
      tab: 'Geotechs tab'
    })
  }
  handleMyPSETabClick (e) {
    this.setState({
      tab: 'My PSE tab'
    })
  }

  render () {
    return (
      <div>
        <header className="cd-main-header">
          <a href="#0" className="cd-logo">PSE</a>
          <div className="cd-search is-hidden">
            <form action="#0">
              <input type="search" placeholder="Search..." />
            </form>
          </div>

          <a href="#0" className="cd-nav-trigger"><span /></a>

          <nav className="cd-nav">
            <ul className="cd-top-nav">
              <li className="has-children account">
                <a href="#0">
                  User
                </a>

                <ul>
                  <li onClick={::this.handleLogOut}><a href="#0">Logout</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>

        <main className="cd-main-content">
          <nav className="cd-side-nav">
            <ul>
              <li className={this.state.tab === 'Dashboard tab' ? 'has-children overview active' : 'has-children overview'}>
                <a href="#0" onClick={::this.handleDashboardTabClick} >Dashboard</a>
              </li>
              <li className={this.state.tab === 'Clients tab' ? 'has-children users active' : 'has-children users'}>
                <a href="#0" onClick={::this.handleClientsTabClick}>Clients</a>
              </li>
              <li className={this.state.tab === 'Projects tab' ? 'has-children comments active' : 'has-children comments'}>
                <a href="#0" onClick={::this.handleProjectsTabClick}>Projects</a>
              </li>
              <li className={this.state.tab === 'Geotechs tab' ? 'has-children comments active' : 'has-children comments'}>
                <a href="#0" onClick={::this.handleGeotechsTabClick}>Geotechs</a>
              </li>
              <li className={this.state.tab === 'MyPSE tab' ? 'has-children users active' : 'has-children users'}>
                <a href="#0" onClick={::this.handleMyPSETabClick}>My PSE</a>
              </li>
            </ul>
          </nav>

          <div className="content-wrapper">
            <h1>{this.state.tab}</h1>
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
