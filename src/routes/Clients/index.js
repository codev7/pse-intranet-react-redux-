import React, { PropTypes } from 'react'
import ClientsList from './Components/DataList'
import SearchForm from './Components/SearchForm'

class ClientsTab extends React.Component {

  constructor() {
    super()
    this.state = {
      clients_list: []
    }

    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(parameters){
    this.refs.clients_list.getClientsList(parameters)
  }

  render () {
    return (
      <div className='clients-page'>
        <div className='container-fluid'>
          <div className='panel panel-default'>
            <div className='panel-body'>

              <div className='col-md-3 left-column'>

                <SearchForm searchSubmitFunc={this.submitSearch} />
                <ClientsList ref='clients_list' />

              </div>

              <div className='col-md-9 right-column'>
                <div className='top-right-section row'>
                  <div className='client-name col-sm-6'>
                    <h3 className='name'>Client Name...</h3>
                  </div>
                  <div className='add-new-client-btn col-sm-6'>
                    <a href='#' onClick={this.addNewClient}>
                      <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ClientsTab
