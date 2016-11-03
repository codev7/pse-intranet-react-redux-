import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'

import DataPagination from '../../../components/Pagination/pagination'
import { APIConstants } from '../../../components/Api/APIConstants'
import DataRow from './DataRow'

class ClientsList extends React.Component {

  static propTypes = {
    editClient: PropTypes.func
  };

  constructor () {
    super()
    this.state = {
      'current_page': 1,
      'total_items': 0,
      'items': 25,
      'client_list': [],
      'loading': 1,
      'page': 1
    }

    this.onPaging = this.onPaging.bind(this)
    this.clientInfo = this.clientInfo.bind(this)

    const that = this

    this.getClientsList(1, function(data) {
      that.setState({
        client_list: data.data,
        loading: 0,
        page: 1,
        ...data.paginator
      })
    })
  }

  onPaging(newPage) {

    newPage = newPage || 1
    const that = this

    that.setState({
      loading: 1
    })

    this.getClientsList(newPage, function(data) {
      that.setState({
        client_list: data.data,
        loading: 0,
        page: newPage,
        ...data.paginator
      })
    })

  }

  getClientsList(pageId, callback) {
    const accessToken = localStorage.accessToken

    request.post(`${APIConstants.API_SERVER_NAME}clients_list`)
      .send(JSON.stringify({ 'access_token': accessToken, 'page_id': pageId }))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)
        callback(data)

      }, function (err) {
        console.log(err)
      })
  }

  clientInfo(id){
    const clientList = this.state.client_list
    const currentClient = clientList.find(function(client){
      return client.id == id
    })
    this.props.editClient(currentClient)
  }

  render () {

    let count = this.state.last_page ? this.state.last_page : 1

    const classes = 'table data table-hover' + (this.state.loading ? ' table-blur-effect' : '')

    return (
      <div id='page-data' className='panel panel-default'>
        <div className='panel-heading'>Client Name</div>
        <div className='panel-body client-name-list'>
          <div className='list-group'>
            {
              this.state.client_list.map((item, index) => (
                <a href='#' key={index} className='list-group-item'>{item.name}</a>
              ))
            }

          </div>

        </div>
        { this.state.loading == 1 ? <div className='contacts-loading' > <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null }
        <div className='pagination-container'>
          <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
        </div>
      </div>
    )
  }
}

export default ClientsList
