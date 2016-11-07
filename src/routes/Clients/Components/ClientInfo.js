import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'
import { APIConstants } from '../../../components/Api/APIConstants'
import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'

class ClientInfo extends React.Component {

  constructor() {
    super()
    this.state = {
      client_info: {},
      'addNewModal': false,
      'newOrEdit': 'new',
      'formData': {}
    }

    this.getClientInfo = this.getClientInfo.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
    this.editClient = this.editClient.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
  }

  editClient(data) {
    this.setState({
      addNewModal: true,
      newOrEdit: 'edit',
      formData: data
    })
  }

  closeModalHandler(){
    this.setState({
      addNewModal: false,
      formData: {}
    })
  }

  getClientInfo(id){
    const accessToken = localStorage.accessToken, that = this

    that.setState({
      'loading': 1
    })

    request.post(`${APIConstants.API_SERVER_NAME}client_info`)
      .send(JSON.stringify({'access_token': accessToken, 'id': id}))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)
        console.log(data.data)
        that.setState({
          'client_info': data.data,
          'loading': 0
        })

      }, function (err) {
        console.log(err)
      })
  }

  addNewClient(e) {
    e.preventDefault()
    this.setState({
      addNewModal: true,
      newOrEdit: 'new'
    })

  }

  render () {
    const loading = this.state.loading == 1 ? <div className='contacts-loading' > <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null
    return (
      <div className='top-right-section row'>
        <div className='client-name col-sm-6'>
          <h3 className='name'>{this.state.client_info.name}</h3>
        </div>
        <div className='add-new-client-btn col-sm-6'>
          <a href='' onClick={e => this.addNewClient(e)}>
            <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
          </a>
        </div>
        { loading }
        <AddNewClientForm show={this.state.addNewModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData} closeFunc={this.closeModalHandler} />
      </div>
    )
  }
}

export default ClientInfo
