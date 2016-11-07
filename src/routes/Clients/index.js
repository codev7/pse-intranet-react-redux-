import React, { PropTypes } from 'react'
import ClientsList from './Components/DataList'
import SearchForm from './Components/SearchForm'
import ClientInfo from './Components/ClientInfo'

class ClientsTab extends React.Component {

  constructor() {
    super()

    this.submitSearch = this.submitSearch.bind(this)
    this.submitClient = this.submitClient.bind(this)
  }

  submitSearch(parameters){
    this.refs.clients_list.getClientsList(parameters)
  }

  submitClient(id){
    this.refs.client_info.getClientInfo(id)
  }

  render () {
    return (
      <div className='clients-page'>
        <div className='container-fluid'>
          <div className='panel panel-default'>
            <div className='panel-body'>

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
