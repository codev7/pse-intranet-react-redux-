import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/pse'

import { logoutAndRedirect } from 'redux/modules/auth'

import HomeHeader from 'components/Header/headerComponent'
import PSETab from 'components/Tabcontents/pseTab'
import ClientsTab from 'components/Tabcontents/clientsTab'
import DashboardTab from 'components/Tabcontents/dashboardTab'
import ProjectsTab from 'components/Tabcontents/projectsTab'
import GeotechsTab from 'components/Tabcontents/geotechsTab'

export class HomePageView extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    logoutAndRedirect: PropTypes.func
  };

  constructor () {
    super()
    this.state = {
      'tab': 'Dashboard tab',
      'content': <DashboardTab />
    }
  }

  componentDidMount () {
    require('jquery-script.js')
  }

  handleLogOut () {
    this.props.logoutAndRedirect()
  }

  handleDashboardTabClick (e) {
    this.setState({
      tab: 'Dashboard tab',
      content: <DashboardTab />
    })
  }
  handleClientsTabClick (e) {
    this.setState({
      tab: 'Clients tab',
      content: <ClientsTab />
    })
  }
  handleProjectsTabClick (e) {
    this.setState({
      tab: 'Projects tab',
      content: <ProjectsTab />
    })
  }
  handleGeotechsTabClick (e) {
    this.setState({
      tab: 'Geotechs tab',
      content: <GeotechsTab />
    })
  }
  handleMyPSETabClick (e) {
    this.setState({
      tab: 'My PSE tab',
      content: <PSETab />
    })
  }

  render () {
    return (
      <div>
        <HomeHeader logout={::this.handleLogOut} />
        <main className='cd-main-content'>
          <nav className='cd-side-nav'>
            <ul>
              <li className={this.state.tab === 'Dashboard tab' ? 'has-children overview active' : 'has-children overview'}>
                <a href='#0' onClick={::this.handleDashboardTabClick}>Dashboard</a>
              </li>
              <li className={this.state.tab === 'Clients tab' ? 'has-children users active' : 'has-children users'}>
                <a href='#0' onClick={::this.handleClientsTabClick}>Clients</a>
              </li>
              <li className={this.state.tab === 'Projects tab' ? 'has-children comments active' : 'has-children comments'}>
                <a href='#0' onClick={::this.handleProjectsTabClick}>Projects</a>
              </li>
              <li className={this.state.tab === 'Geotechs tab' ? 'has-children comments active' : 'has-children comments'}>
                <a href='#0' onClick={::this.handleGeotechsTabClick}>Geotechs</a>
              </li>
              <li className={this.state.tab === 'My PSE tab' ? 'has-children overview  active' : 'has-children users'}>
                <a href='#0' onClick={::this.handleMyPSETabClick}>My PSE</a>
              </li>
            </ul>
          </nav>

          <div className='content-wrapper'>
            {this.state.content}
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
