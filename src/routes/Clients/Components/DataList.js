import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'

import { APIConstants } from '../../../components/Api/APIConstants'
import DataPagination from '../../../components/Pagination/pagination'
// import DataRow from './DataRow'

class ClientsList extends React.Component {

  static propTypes = {
    submitClient: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'page': 1,
      'last_page': 1,
      'total_items': 0,
      'items': 25,
      'clients_list': [],
      'loading': 0,
      'prev_search': ''
    }

    this.onPaging = this.onPaging.bind(this)
    this.clientInfo = this.clientInfo.bind(this)
    this.getClientsList = this.getClientsList.bind(this)

  }

  getClientsList(param) {
    const accessToken = localStorage.accessToken, that = this
    let parameters = {}

    that.setState({
      'loading': 1
    })

    param.map(function(p){
      parameters[p.key] = p.value
    })

    if (!parameters.page){
      parameters['page'] = 1
    }

    console.log(Object.assign({}, parameters, {'access_token': accessToken}))

    request.post(`${APIConstants.API_SERVER_NAME}clients_list`)
      .send(JSON.stringify(Object.assign({}, parameters, {'access_token': accessToken, 'minimal': 1})))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)
        console.log(data)
        that.setState({
          'clients_list': data.data,
          'loading': 0,
          'total_items': data.paginator.total_items,
          'page': data.paginator.current_page,
          'last_page': data.paginator.last_page,
          'prev_search': parameters
        })

      }, function (err) {
        console.log(err)
      })
  }

  onPaging(newPage) {

    const currentPage = newPage || 1

    let prevParameters = this.state.prev_search
    prevParameters['page'] = currentPage

    this.getClientsList(prevParameters)

  }

  clientInfo(e, id){
    e.preventDefault()
    this.props.submitClient(id)
  }

  render () {

    const count = this.state.last_page ? this.state.last_page : 1,
      list = this.state.clients_list.map((item, index) => (
        <a href='' onClick={e => this.clientInfo(e, item.id)} key={index} className='list-group-item'>{item.name}</a>
      )),
      pagination = this.state.total_items > this.state.items ? <div className='pagination-container'>
        <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
      </div> : null,
      loading = this.state.loading == 1 ? <div className='contacts-loading' > <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null

    return (
      <div className='clients-list-container'>
        <h3 className='text-center'>Results</h3>
        <div id='page-data' className='panel panel-default'>
          <div className='panel-heading'>Client Name</div>
          <div className='panel-body client-name-list'>
            <div className='list-group'>
              {list}
            </div>
          </div>
          { loading }
          { pagination }
        </div>
      </div>
    )
  }
}

export default ClientsList
