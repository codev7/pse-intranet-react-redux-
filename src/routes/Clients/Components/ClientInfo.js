import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'
import { createClient, closeModalFunc, getClientInfo, showModalFunc } from '../Modules/module'

class ClientInfo extends React.Component {

  static propTypes = {
    'client_id': PropTypes.number,
    'before_client_id': PropTypes.number,
    'client_info': PropTypes.object,
    'loading_client': PropTypes.bool,
    'showModalFlag': PropTypes.bool,
    'formData': PropTypes.object,
    'showModalFunc': PropTypes.func.isRequired,
    'createClient': PropTypes.func.isRequired,
    'closeModalFunc': PropTypes.func.isRequired,
    'getClientInfo': PropTypes.func.isRequired
  };

  componentWillReceiveProps(newProps){
    if (newProps.client_id && (newProps.client_id != newProps.before_client_id) && !isNaN(newProps.client_id)){
      newProps.getClientInfo(newProps.client_id)
    }

    if(JSON.stringify(this.state.client_info) !== JSON.stringify(newProps.client_info)){
      console.log(newProps.client_info)
      this.setState({
        client_info: newProps.client_info
      })
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      'readOnly': true,
      'client_info': this.props.client_info
    }

    this.addNewClient = this.addNewClient.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.editModeHandler = this.editModeHandler.bind(this)
    this.addNote = this.addNote.bind(this)
    this.updateNote = this.updateNote.bind(this)

    if (props.client_id && ((Object.keys(props.client_info).length === 0) || (props.before_client_id != props.client_id)) && !isNaN(props.client_id)){
      this.props.getClientInfo(props.client_id)
    }
  }

  editModeHandler(e){
    if (e){
      e.preventDefault()
    }

    this.setState({
      readOnly: this.state.readOnly !== true
    })
  }

  closeModalHandler(){
    this.props.closeModalFunc()
  }

  addNote(e){
    if (e){
      e.preventDefault()
    }

    const notes = this.state.client_info.notes
    notes.push({note: '', type: {type: 'general'}})
    console.log(notes)
    this.setState({
      client_info: Object.assign({}, this.state.client_info, {notes: notes})
    })
  }

  addEmail(e){
    if (e){
      e.preventDefault()
    }

    const emails = this.state.client_info.emails
    emails.push({emails: '', type: {type: ''}})
    console.log(emails)
    this.setState({
      client_info: Object.assign({}, this.state.client_info, {emails: emails})
    })
  }

  addPhoneNumber(e){
    if (e){
      e.preventDefault()
    }

    const phones = this.state.client_info.phones
    phones.push({number: '', type: {type: ''}})
    console.log(phones)
    this.setState({
      client_info: Object.assign({}, this.state.client_info, {phones: phones})
    })
  }

  addAddress(e){
    if (e){
      e.preventDefault()
    }

    const addresses = this.state.client_info.addresses
    addresses.push({address_line0: null, address_line1: null, city: null, state: null, zip_code: null})
    console.log(addresses)
    this.setState({
      client_info: Object.assign({}, this.state.client_info, {addresses: addresses})
    })
  }

  updateNote(e, command){
    if (e){
      e.preventDefault()
    }

    switch(command){
      case 'delete':
        break
      case 'update':
        break
    }
  }

  addNewClient(e) {
    if (e){
      e.preventDefault()
    }
    this.props.showModalFunc('new')
  }

  submitModal(name) {
    this.props.createClient(name)
  }

  render () {
    const loading = this.props.loading_client && <div className='contacts-loading loading-container' >
      <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div>
    let phoneNumbers, emailAddresses, addresses, notes

    if (Object.keys(this.state.client_info).length > 0){
      phoneNumbers = this.state.client_info.phones && (<div className='phone-number-container info-container'>
          <div className='title-container'>
            <h4>Client Phone Numbers</h4>{!this.state.readOnly && <a href='' onClick={e => this.addPhoneNumber(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
          </div>
          {this.state.client_info.phones.map((one, index) => (
            <div key={index} className='info-row'>
              <div className='pull-left first-container'>
                <input type='text' className='' placeholder='Phone number' defaultValue={one.number} readOnly={this.state.readOnly} />
              </div>
              <div className='pull-left second-container'>
                <input type='text' className='' placeholder='Type' defaultValue={one.type.type} readOnly={this.state.readOnly} />
              </div>
              { !this.state.readOnly && <div className='pull-left third-container'>
                <a href='' onClick={e => this.updateNote(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
                <a href='' onClick={e => this.updateNote(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
              </div> }
            </div>
          ))}
        </div>)

      emailAddresses = this.state.client_info.emails && (<div className='email-addresses-container info-container'>
          <div className='title-container'>
            <h4>Client Email Addresses</h4>{!this.state.readOnly && <a href='' onClick={e => this.addEmail(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
          </div>
          {this.state.client_info.emails.map((one, index) => (
            <div key={index} className='info-row'>
              <div className='pull-left first-container'>
                <input type='text' className='' placeholder='Email' defaultValue={one.email} readOnly={this.state.readOnly} />
              </div>
              <div className='pull-left second-container'>
                <input type='text' className='' placeholder='Type' defaultValue={one.type.type} readOnly={this.state.readOnly} />
              </div>
              { !this.state.readOnly && <div className='pull-left third-container'>
                <a href='' onClick={e => this.updateNote(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
                <a href='' onClick={e => this.updateNote(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
              </div> }
            </div>
          ))}
        </div>)

      addresses = this.state.client_info.addresses && (<div className='address-container info-container'>
          <div className='title-container'>
            <h4>Client Addresses</h4>{!this.state.readOnly && <a href='' onClick={e => this.addAddress(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
          </div>
          {this.state.client_info.addresses.map((one, index) => (
            <div key={index} className='info-row'>
              <div className='pull-left first-container'>
                <input type='text' className='' defaultValue={one.address_line0} readOnly={this.state.readOnly} />
                <input type='text' className='' defaultValue={one.address_line1} readOnly={this.state.readOnly} />
                <input type='text' className='' defaultValue={one.city} readOnly={this.state.readOnly} />
              </div>
              <div className='pull-left second-container'>
                <input type='text' className='' defaultValue={one.state} readOnly={this.state.readOnly} />
                <input type='text' className='' defaultValue={one.zip_code} readOnly={this.state.readOnly} />
              </div>
              { !this.state.readOnly && <div className='pull-left third-container'>
                <a href='' onClick={e => this.updateNote(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
                <a href='' onClick={e => this.updateNote(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
              </div> }
            </div>
          ))}
        </div>)

      notes = this.state.client_info.notes && (<div className='notes-container info-container'>
        <div className='title-container'>
          <h4>Client Notes</h4>{!this.state.readOnly && <a href='' onClick={e => this.addNote(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
        </div>
        {this.state.client_info.notes.map((one, index) => (
          <div key={index} className='info-row'>
            <div className='pull-left first-container'>
              <textarea type='text' className='' placeholder='Note' defaultValue={one.note} readOnly={this.state.readOnly} />
            </div>
            <div className='pull-left second-container'>
              <input type='text' className='' placeholder='Type' defaultValue={one.type.type} readOnly={this.state.readOnly} />
            </div>
            { !this.state.readOnly && <div className='pull-left third-container'>
              <a href='' onClick={e => this.updateNote(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
              <a href='' onClick={e => this.updateNote(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
            </div> }
          </div>
        ))}
      </div>)
    }

    return (
      <div id='client_info_section'>
        <div className='top-right-section'>
          <div className='top-name-container'>
            <div className='client-name'>
              { this.state.client_info.name &&
              <h3 className='name'>
                {this.state.client_info.name}
                <a href='' className='edit_check_icon' onClick={e => this.editModeHandler(e)}>
                  { this.state.readOnly ? <i className='glyphicon glyphicon-edit' /> : <i className='glyphicon glyphicon-check' />}
                </a>
              </h3> }
            </div>
            <div className='add-new-client-btn hidden-sm hidden-xs'>
              <a href='' onClick={e => this.addNewClient(e)}>
                <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
              </a>
            </div>
          </div>
        </div>
        <AddNewClientForm show={this.props.showModalFlag} formData={this.props.formData}
                          submitFunc={this.submitModal} closeFunc={this.closeModalHandler} />
        { loading }
        { Object.keys(this.state.client_info).length > 0 &&
        <div className='right-middle-section'>
          <div>
            { notes }
            { phoneNumbers }
            { emailAddresses }
            { addresses }
          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  'client_info': state.clients.client_info,
  'showModalFlag': state.clients.showModalFlag,
  'formData': state.clients.formData,
  'loading_client': state.clients.loading_client,
  'before_client_id': state.clients.client_id
})

export default connect((mapStateToProps), {
  showModalFunc,
  createClient,
  closeModalFunc,
  getClientInfo
})(ClientInfo)
