import React, { PropTypes } from 'react'
import ClientsList from './Components/DataList'
import SearchForm from './Components/SearchForm'
import ClientInfo from './Components/ClientInfo'

class ClientsTab extends React.Component {

  constructor() {
    super()

    this.submitSearch = this.submitSearch.bind(this)
    this.submitClient = this.submitClient.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
  }

  submitSearch(param){
    let parameters = {}
    param.map(function(p){
      if(p.value != '') {
        parameters[p.key] = p.value
      }
    })
    this.refs.clients_list.getClientsList(parameters)
  }

  submitClient(id){
    this.refs.client_info.getClientInfo(id)
  }

  addNewClient(e){
    this.refs.client_info.addNewClient(e)
  }

  render () {
    return (
      <div className='clients-page'>
        <div className='container-fluid'>
          <div className='panel panel-default'>
            <div className='panel-body'>

              <div className='add-new-client-btn visible-xs visible-sm'>
                <a href='' onClick={e => this.addNewClient(e)} className='pull-right text-right'>
                  <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
                </a>
              </div>

              <div className='col-md-3 left-column'>
                <SearchForm searchSubmitFunc={this.submitSearch} />
                <ClientsList ref='clients_list' submitClient={this.submitClient} />
              </div>

              <div className='col-md-9 right-column'>
                <ClientInfo ref='client_info' />
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ClientsTab
