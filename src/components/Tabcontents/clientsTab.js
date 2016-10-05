import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'
import DataPagination from '../pagination/pagination'
import { APIConstants } from '../../redux/api/APIConstants'

class ClientsTab extends React.Component {

  static propTypes = {

  };

  render () {
    return (
      <div id='page-data'>
        <div className='wraper container-fluid clients-page'>
          <div className='row'>
            <div className='page-title'>
              <h3 className='title'>Clients</h3>
            </div>
            <div className='add-new-client-btn'>
              <a href=''><h3><span>+</span><span className='add-new-client-text'>Add New</span></h3></a>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='panel panel-default'>
                <div className='panel-body'>

                  <div className='input-group'>
                    <span className='input-group-btn'>
                      <button type='button' className='btn btn-effect-ripple btn-primary'>
                        <i className='fa fa-search' />
                      </button>
                    </span>
                    <input type='text' id='example-input1-group2' name='example-input1-group2' className='form-control' placeholder='Search' />
                  </div>

                </div>
              </div>
            </div>
          </div>

          <ClientsList />

        </div>
      </div>
    )
  }

}

class ClientsList extends React.Component {

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

    this.getClients = this.getClients.bind(this)
    this.onPaging = this.onPaging.bind(this)

    this.getClients(1)

  }

  getClients(pageId = 1) {
    const that = this
    const accessToken = localStorage.accessToken

    // that.setState({
    //   loading: 1
    // })

    request.post(`${APIConstants.API_SERVER_NAME}/clients_list`)
      .send(JSON.stringify({ 'access_token': accessToken, 'page_id': pageId }))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)

        console.log(data)

        that.setState({
          client_list: data.data,
          loading: 0,
          ...data.paginator
        })

      }, function (err) {
        console.log(err)
      })

  }

  onPaging(newPage) {
    this.getClients(newPage)
  }

  render () {

    let count = this.state.last_page ? this.state.last_page : 1

    return (
      <div id='page-data' className='panel panel-default'>
        <div className='panel-body'>
          <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
          <div className='table-responsive'>
            <table className='table data table-hover'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
              {
                this.state.client_list.map((item, index) => (
                  <DataRow key={index}
                    id={item.id}
                    name={item.name}
                    status={item.status} />
                ))
              }
              </tbody>

              {/*<tfoot>
               <tr>
               <td colSpan='6'>
               <DataPagination count={pageCount} active={this.state.page} pagingFunc={this.onPaging} />
               </td>
               </tr>
               </tfoot>*/}
            </table>
            { this.state.loading === 1 ? <div className='contacts-loading' ><i className='ion-loading-a' /></div> : null}
          </div>
        </div>
      </div>
    )
  }
}

class DataRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  }

  render () {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.status}</td>
        <td><a href=''><i className='glyphicon glyphicon-edit' /></a></td>
      </tr>
    )
  }
}

export default ClientsTab
