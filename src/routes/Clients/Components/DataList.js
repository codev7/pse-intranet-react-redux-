import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'

// import DataPagination from '../../../components/Pagination/pagination'
import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'
// import DataRow from './DataRow'

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
      'loading': 0,
      'page': 1,
      'addNewModal': false,
      'newOrEdit': 'new',
      'formData': {}
    }

    this.onPaging = this.onPaging.bind(this)
    this.clientInfo = this.clientInfo.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
    this.editClient = this.editClient.bind(this)

    // const that = this

/*    this.getClientsList(1, function(data) {
      that.setState({
        client_list: data.data,
        loading: 0,
        page: 1,
        ...data.paginator
      })
    })*/
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

  clientInfo(id){
    const clientList = this.state.client_list
    const currentClient = clientList.find(function(client){
      return client.id == id
    })
    this.props.editClient(currentClient)
  }

  render () {

    let count = this.state.last_page ? this.state.last_page : 1

    return (
      <div className='clients-list-container'>
        <h3 className='text-center'>Results</h3>
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
          {/*<div className='pagination-container'>
           <DataPagination count={count} active={this.state.page} pagingFunc={this.onPaging} />
           </div>*/}
        </div>
        <AddNewClientForm show={this.state.addNewModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData} />
      </div>
    )
  }
}

export default ClientsList
