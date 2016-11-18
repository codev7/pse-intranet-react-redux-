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

    if (Object.keys(this.props.client_info).length > 0){
      phoneNumbers = this.props.client_info.phones && (<div className='phone-number-container info-container'>
        <h4>Client Phone Numbers</h4>
        {this.props.client_info.phones.map((one, index) => (
          <div key={index} id={one.id}>{one.number} - {one.type.type}</div>
        ))}
      </div>)
      emailAddresses = this.props.client_info.emails && (<div className='email-addresses-container info-container'>
        <h4>Client Email Addresses</h4>
        {this.props.client_info.emails.map((one, index) => (
          <div key={index} id={one.id}>{one.email} - {one.type.type}</div>
        ))}
      </div>)
      addresses = this.props.client_info.addresses && (<div className='addresses-container info-container'>
        <h4>Client Addresses</h4>
        {this.props.client_info.addresses.map((one, index) => (
          <div key={index} id={one.id}>{one.address_line0} {one.address_line1} {one.city}, {one.state} {one.zip_code} - {one.type.type}</div>
        ))}
      </div>)
      notes = this.props.client_info.notes && (<div className='notes-container info-container'>
        <h4>Client Notes</h4> {!this.state.readOnly && <a href='' onClick={e => this.addNote(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
        {this.props.client_info.notes.map((one, index) => (
          <div key={index} id={one.id}>
            <div className='row'>
              <div className=''>
                <textarea type='text' className='' placeholder='Note' defaultValue={one.note} readOnly={this.state.readOnly} />
              </div>
              <div className=''>
                <input type='text' className='' placeholder='Type' defaultValue={one.type.type} readOnly={this.state.readOnly} />
              </div>
              { !this.state.readOnly && <div>
                <a href='' onClick={e => this.addNote(e)}><i className='glyphicon glyphicon-minus-sign' /></a>
              </div> }
            </div>
          </div>
        ))}
      </div>)
    }

    return (
      <div id='client_info_section'>
        <div className='top-right-section'>
          <div className='top-name-container'>
            <div className='client-name'>
              { this.props.client_info.name &&
              <h3 className='name'>
                {this.props.client_info.name}
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
        { Object.keys(this.props.client_info).length > 0 &&
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
