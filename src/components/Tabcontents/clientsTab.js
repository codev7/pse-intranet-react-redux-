import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'

import DataPagination from '../Pagination/pagination'
import { APIConstants } from '../../redux/api/APIConstants'
import AddNewClientForm from '../../components/ModalForm/addNewClientForm'

class ClientsTab extends React.Component {

  static propTypes = {

  };

  constructor() {
    super()

    this.state = {
      'addNewModal': false,
      'newOrEdit': 'new',
      'formData': {}
    }

    this.addNewClient = this.addNewClient.bind(this)
    this.editClient = this.editClient.bind(this)
  }

  addNewClient(e) {
    e.preventDefault()

    this.setState({
      addNewModal: true,
      newOrEdit: 'new'
    })
  }

  editClient(data) {

    this.setState({
      addNewModal: true,
      newOrEdit: 'edit',
      formData: data
    })

  }

  render () {
    return (
      <div id='page-data'>
        <div className='wraper container-fluid clients-page'>
          <div className='row'>
            <div className='page-title'>
              <h3 className='title'>Clients</h3>
            </div>
            <div className='add-new-client-btn'>
              <a href='#' onClick={this.addNewClient}><h3><span>+</span><span className='add-new-client-text'>Add New</span></h3></a>
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

          <ClientsList editClient={this.editClient} />
          <AddNewClientForm show={this.state.addNewModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData} />

        </div>
      </div>
    )
  }

}

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

        console.log(data)

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
        <div className='panel-body'>
          <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
          <div className='table-responsive'>
            <table className={classes}>
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
                      status={item.status}
                      editClient={this.clientInfo} />
                  ))
                }
              </tbody>
            </table>
          </div>
          <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
        </div>
        { this.state.loading == 1 ? <div className='contacts-loading' > <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null }
      </div>
    )
  }
}

class DataRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    editClient: PropTypes.func
  };

  constructor() {
    super()

    this.editClient = this.editClient.bind(this)
  }

  editClient(e, id){
    e.preventDefault()
    this.props.editClient(id)
  }

  render () {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.status}</td>
        <td><a href='#' onClick={(e) => this.editClient(e, this.props.id)}><i className='glyphicon glyphicon-edit' /></a></td>
      </tr>
    )
  }
}

export default ClientsTab
