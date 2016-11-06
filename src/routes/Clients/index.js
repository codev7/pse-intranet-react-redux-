import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'
import ClientsList from './Components/DataList'
import SearchForm from './Components/SearchForm'
import { APIConstants } from '../../components/Api/APIConstants'

class ClientsTab extends React.Component {

  constructor() {
    super()
    this.state = {

    }

    this.submitSearch = this.submitSearch.bind(this)
    this.getClientsList = this.getClientsList.bind(this)
  }

  getClientsList(parameters) {
    const accessToken = localStorage.accessToken

    if (!parameters.page){
      parameters['page'] = 1
    }

    console.log(Object.assign({}, parameters, {'access_token': accessToken}))

    request.post(`${APIConstants.API_SERVER_NAME}clients_list`)
      .send(JSON.stringify(Object.assign({}, parameters, {'access_token': accessToken})))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)
        console.log(data)

      }, function (err) {
        console.log(err)
      })
  }

  submitSearch(parameters){
    console.log(parameters)
    let params = {}
    parameters.map(function(parameter){
      if (parameter.value != '') {
        params[parameter.key] = parameter.value
      }
    })
    this.getClientsList(params)
  }

  render () {
    return (
      <div className='clients-page'>
        <div className='container-fluid'>
          <div className='panel panel-default'>
            <div className='panel-body'>

              <div className='col-md-3 left-column'>

                <SearchForm searchParameters={this.state.searchParameters} searchSubmitFunc={this.submitSearch} />
                <ClientsList />

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
