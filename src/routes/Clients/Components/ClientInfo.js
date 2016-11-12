import React, { PropTypes } from 'react'
import request from 'superagent-bluebird-promise'
import { APIConstants } from '../../../components/Api/APIConstants'
import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'

class ClientInfo extends React.Component {

  constructor() {
    super()
    this.state = {
      'client_info': {},
      'showModal': false,
      'newOrEdit': 'new',
      'formData': {},
      'errorMessage': ''
    }

    this.getClientInfo = this.getClientInfo.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
    // this.editClient = this.editClient.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
    this.submitModal = this.submitModal.bind(this)
  }
  //
  // editClient(data) {
  //   this.setState({
  //     showModal: true,
  //     newOrEdit: 'edit',
  //     formData: data
  //   })
  // }

  closeModalHandler(){
    this.setState({
      showModal: false,
      formData: {}
    })
  }

  submitModal(name) {

    this.createClient(name)

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
        console.log(data)

        if(data.hasOwnProperty('data')) {
          that.setState({
            'client_info': data.data,
            'loading': 0
          })
        }

        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if(width < 992){
          setTimeout(function() {
            const scrollContent = document.getElementById('scroll-content')
            scrollContent.scrollTop = parseInt(document.getElementById('client_info_section').getBoundingClientRect().top)
          }, 10)
        }

      }, function (err) {
        console.log(err)
      })
  }

  createClient(data) {
    const accessToken = localStorage.accessToken, that = this

    that.setState({
      formData: { loading: 1 }
    })

    request.post(`${APIConstants.API_SERVER_NAME}clients_create`)
      .send(JSON.stringify({ 'access_token': accessToken, 'name': data }))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)

        console.log(data)

        if ((data.status_code == 201) || (data.status_code == 200)){
          that.setState({
            client_info: data.data,
            formData: {loading: 0},
            showModal: false
          })
        } else {
          let message = ''
          if (data.error){
            message = data.error[0].message
          }
          that.setState({
            formData: { errorMessage: message, loading: 0 },
            client_info: {}
          })
        }

      }, function (err) {
        console.log(err)
      })
  }

  addNewClient(e) {
    if (e){
      e.preventDefault()
    }

    this.setState({
      showModal: true,
      newOrEdit: 'new'
    })
  }

  render () {
    const loading = this.state.loading == 1 ? <div className='contacts-loading loading-container' >
      <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null
    let phoneNumbers, emailAddresses, addresses, notes

    if (Object.keys(this.state.client_info).length > 0){

      phoneNumbers = this.state.client_info.phones ? this.state.client_info.phones.map((one, index) => (
        <div key={index} id={one.id}>{one.number} - {one.type.type}</div>
      )) : null
      emailAddresses = this.state.client_info.emails ? this.state.client_info.emails.map((one, index) => (
        <div key={index} id={one.id}>{one.email} - {one.type.type}</div>
      )) : null

      addresses = this.state.client_info.addresses ? this.state.client_info.addresses.map((one, index) => (
        <div key={index} id={one.id}>{one.address_line0} {one.address_line1} {one.city}, {one.state} {one.zip_code} - {one.type.type}</div>
      )) : null

      notes = this.state.client_info.notes ? this.state.client_info.notes.map((one, index) => (
        <div key={index} id={one.id}>{one.note} - {one.type.type}</div>
      )) : null

    }

    return (
      <div id='client_info_section'>
        <div className='top-right-section row'>
          <div className='client-name col-sm-6'>
            { this.state.client_info.name &&
            <h3 className='name'>{this.state.client_info.name}</h3>
            }
          </div>
          <div className='add-new-client-btn col-sm-6 hidden-sm hidden-xs'>
            <a href='' onClick={e => this.addNewClient(e)}>
              <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
            </a>
          </div>
          <AddNewClientForm show={this.state.showModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData}
                            submitFunc={this.submitModal} closeFunc={this.closeModalHandler} />
        </div>

        { loading }
        { Object.keys(this.state.client_info).length > 0 &&
        <div className='right-middle-section'>
          <div>
            <div className='phone-number-container info-container'>
              <h4>Client Phone Numbers</h4>
              { phoneNumbers }
            </div>
            <div className='addresses-container info-container'>
              <h4>Client Addresses</h4>
              {addresses}
            </div>
            <div className='email-addresses-container info-container'>
              <h4>Client Email Addresses</h4>
              {emailAddresses}
            </div>
            <div className='notes-container info-container'>
              <h4>Client Notes</h4>
              {notes}
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default ClientInfo
