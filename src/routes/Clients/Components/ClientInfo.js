import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'
import { createClient, closeModalFunc, getClientInfo, showModalFunc } from '../Modules/module'
import ClientNotes from './ClientAttributes/Notes'
import ClientEmailAddresses from './ClientAttributes/EmailAddresses'
import ClientAddresses from './ClientAttributes/Addresses'
import ClientPhoneNumbers from './ClientAttributes/PhoneNumbers'

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
    }else if(JSON.stringify(this.state.client_info) !== JSON.stringify(newProps.client_info)){
      this.setState({
        client_info: newProps.client_info
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.client_id && (nextProps.client_id != nextProps.before_client_id) && !isNaN(nextProps.client_id)) || nextProps.showModalFlag || nextProps.loading_client
  }

  constructor(props) {
    super(props)

    this.state = {
      'readOnly': true,
      'client_info': {}
    }

    if (props.client_id && !isNaN(props.client_id)){
      this.props.getClientInfo(props.client_id)
    }

    this.addNewClient = this.addNewClient.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
    this.submitModal = this.submitModal.bind(this)
    this.editModeHandler = this.editModeHandler.bind(this)
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
    let clientId = null

    if (this.state.client_info.hasOwnProperty('id')){
      clientId = this.state.client_info.id
    }

    return (
      <div id='client_info_section'>
        <div className='top-right-section'>
          <div className='top-name-container'>
            <div className='client-name'>
              { this.state.client_info.name &&
              <div>
                <h3 className='name'>
                  {this.state.client_info.name} <span> ({this.state.readOnly ? 'ReadOnly Mode' : 'Edit Mode'}) </span>
                  <a href='' className='edit_check_icon' title={this.state.readOnly ? 'Edit Mode' : 'ReadOnly Mode'} onClick={e => this.editModeHandler(e)}>
                    { this.state.readOnly ? <i className='glyphicon glyphicon-edit' /> : <i className='glyphicon glyphicon-check' />}
                  </a>
                </h3>
              </div> }
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
            <ClientNotes notes={this.state.client_info.notes} readOnly={this.state.readOnly} client_id={clientId} />
            <ClientPhoneNumbers phones={this.state.client_info.phones} readOnly={this.state.readOnly} client_id={clientId} />
            <ClientEmailAddresses emails={this.state.client_info.emails} readOnly={this.state.readOnly} client_id={clientId} />
            <ClientAddresses addresses={this.state.client_info.addresses} readOnly={this.state.readOnly} client_id={clientId} />
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
